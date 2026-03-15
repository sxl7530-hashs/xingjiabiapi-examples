#!/usr/bin/env node
/**
 * 统一发布工具 - 支持掘金/CSDN/知乎/头条
 * 用法: node publish.js <platform> <article.md>
 * 示例: node publish.js juejin articles/test.md
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PLATFORMS = {
  juejin: {
    url: 'https://juejin.cn/editor/drafts/new',
    profile: '~/.openclaw/playwright-profile',
    publish: async (page, title, content) => {
      await page.waitForSelector('.CodeMirror', { timeout: 10000 });
      await page.evaluate((md) => {
        const cm = document.querySelector('.CodeMirror').CodeMirror;
        cm.setValue(md);
      }, `# ${title}\n\n${content}`);
      
      await page.click('button:has-text("发布")');
      await page.waitForSelector('input[placeholder="请输入文章标题"]', { timeout: 5000 });
      await page.fill('input[placeholder="请输入文章标题"]', title);
      await page.click('button:has-text("确定并发布")');
      await page.waitForURL('**/post/**', { timeout: 30000 });
      return page.url();
    }
  },
  
  csdn: {
    url: 'https://mp.csdn.net/mp_blog/creation/editor',
    profile: '~/.openclaw/playwright-profile',
    publish: async (page, title, html) => {
      await page.waitForSelector('textarea[placeholder*="文章标题"]', { timeout: 10000 });
      await page.fill('textarea[placeholder*="文章标题"]', title);
      
      await page.evaluate((htmlContent) => {
        const editor = Object.keys(CKEDITOR.instances)[0];
        CKEDITOR.instances[editor].setData(htmlContent);
      }, html);
      
      const summary = html.replace(/<[^>]+>/g, '').slice(0, 100);
      await page.fill('textarea[placeholder*="摘要"]', summary);
      
      await page.click('button:has-text("发布博客")');
      await page.waitForURL('**/success/**', { timeout: 30000 });
      
      const articleId = page.url().match(/success\/(\d+)/)?.[1];
      return `https://blog.csdn.net/qq_43958374/article/details/${articleId}`;
    }
  },
  
  zhihu: {
    url: 'https://www.zhihu.com/creator/featured-question/knowledge',
    profile: '~/.openclaw/zhihu-profile',
    publish: async (page, title, content) => {
      // 知乎发布逻辑（待实现）
      throw new Error('知乎发布暂未实现，请使用 publish_zhihu_safe.js');
    }
  },
  
  toutiao: {
    url: 'https://mp.toutiao.com/profile_v4/graphic/publish',
    profile: '~/.openclaw/playwright-profile',
    publish: async (page, title, content) => {
      await page.waitForSelector('input[placeholder="请输入标题"]', { timeout: 10000 });
      await page.fill('input[placeholder="请输入标题"]', title);
      
      await page.click('.ProseMirror', { force: true });
      await page.keyboard.type(content);
      
      await page.click('button:has-text("发布")');
      await page.waitForTimeout(3000);
      return 'toutiao-published';
    }
  }
};

async function main() {
  const [platform, articlePath] = process.argv.slice(2);
  
  if (!platform || !articlePath) {
    console.error('用法: node publish.js <platform> <article.md>');
    console.error('平台: juejin, csdn, zhihu, toutiao');
    process.exit(1);
  }
  
  const config = PLATFORMS[platform];
  if (!config) {
    console.error(`不支持的平台: ${platform}`);
    process.exit(1);
  }
  
  const content = fs.readFileSync(articlePath, 'utf-8');
  const lines = content.split('\n');
  const title = lines[0].replace(/^#\s*/, '');
  const body = lines.slice(1).join('\n').trim();
  
  let finalContent = body;
  if (platform === 'csdn') {
    const md2html = require('./md2html');
    finalContent = md2html(content);
  }
  
  console.log(`[${platform}] 开始发布: ${title}`);
  
  const browser = await chromium.launchPersistentContext(
    config.profile.replace('~', process.env.HOME),
    { headless: false }
  );
  
  const page = await browser.newPage();
  await page.goto(config.url);
  
  try {
    const url = await config.publish(page, title, finalContent);
    console.log(`[${platform}] 发布成功: ${url}`);
  } catch (error) {
    console.error(`[${platform}] 发布失败:`, error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
