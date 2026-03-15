const { chromium } = require('playwright');
const fs = require('fs');

async function publishCSDNComplete(htmlFile) {
  const ctx = await chromium.launchPersistentContext(
    process.env.HOME + '/.openclaw/playwright-profile',
    { headless: false }
  );
  
  const page = await ctx.newPage();
  await page.goto('https://mp.csdn.net/mp_blog/creation/editor', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);
  
  const html = fs.readFileSync(htmlFile, 'utf8');
  const title = html.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, '').trim();
  
  console.log('📝 填写标题和内容...');
  await page.fill('textarea[placeholder*="文章标题"]', title);
  await page.evaluate((h) => {
    CKEDITOR.instances[Object.keys(CKEDITOR.instances)[0]].setData(h);
  }, html);
  await page.waitForTimeout(3000);
  
  // 填写摘要（如果有）
  try {
    const summaryField = page.locator('textarea[placeholder*="摘要"]');
    if (await summaryField.isVisible({ timeout: 2000 })) {
      console.log('📄 填写摘要...');
      await summaryField.fill('本文介绍如何用 Claude API 实现递归自我改进 Agent，包含完整代码和详细教程。');
    }
  } catch {}
  
  // 选择文章类型/分类（如果需要）
  try {
    const categoryBtn = page.locator('text=选择分类, button:has-text("分类")').first();
    if (await categoryBtn.isVisible({ timeout: 2000 })) {
      console.log('📂 选择分类...');
      await categoryBtn.click();
      await page.waitForTimeout(1000);
      // 选择"人工智能"分类
      await page.click('text=人工智能, li:has-text("人工智能")').catch(() => {});
      await page.waitForTimeout(1000);
    }
  } catch {}
  
  console.log('🔘 点击发布博客...');
  
  // 尝试多种方式点击发布按钮
  const publishBtn = page.locator('button').filter({ hasText: '发布博客' });
  
  // 检查按钮是否可点击
  const isEnabled = await publishBtn.isEnabled().catch(() => false);
  console.log('按钮状态:', isEnabled ? '可点击' : '禁用');
  
  if (isEnabled) {
    await publishBtn.click();
    await page.waitForTimeout(5000);
    
    // 检查是否有弹窗
    const dialog = page.locator('.el-dialog, .modal, [role="dialog"]');
    if (await dialog.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('✅ 发现弹窗，点击确认...');
      await page.click('button:has-text("确定"), button:has-text("确认"), button:has-text("发布")');
      await page.waitForTimeout(5000);
    }
  }
  
  const finalUrl = page.url();
  console.log('📍 最终URL:', finalUrl);
  
  if (finalUrl.includes('blog.csdn.net/') && finalUrl.includes('/article/details/')) {
    console.log('✅ 发布成功:', finalUrl);
  } else {
    console.log('❌ 发布失败，URL未跳转');
  }
  
  await page.waitForTimeout(3000);
  await ctx.close();
}

const htmlFile = process.argv[2];
if (!htmlFile) {
  console.error('用法: node csdn_publish_v3.js <html文件>');
  process.exit(1);
}

publishCSDNComplete(htmlFile).catch(console.error);
