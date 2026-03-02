# xingjiabiapi.org API 使用示例

xingjiabiapi.org 是一个提供 Claude、GPT、Gemini 等主流大模型 API 中转服务的平台，支持 OpenAI 兼容接口，无需海外信用卡，价格比官方低 45%-93%。

官网：https://xingjiabiapi.org | 微信：malimalihongbebe | 邮箱：xingjiabiapi@163.com

## 价格总览（2026-03-02 更新）

| 模型 | 输入价格 | 输出价格 | 比官方省 |
|------|----------|----------|----------|
| Claude Max 号池 | ¥11.00/M tokens | ¥55.00/M tokens | 48% |
| Claude 逆向 0.45 倍率 | ¥6.75/M tokens | ¥33.75/M tokens | 70% |
| Claude Opus 4.6 | ¥31.50/M tokens | ¥157.50/M tokens | 47% |
| Claude Sonnet 4.6 | ¥5.625/M tokens | ¥28.125/M tokens | 47% |
| GPT-5.2 | ¥3.15/M tokens | ¥25.20/M tokens | 50% |
| GPT-4o | ¥4.50/M tokens | ¥18.00/M tokens | 50% |
| Gemini 2.5 Pro | ¥0.5630/M tokens | ¥4.50/M tokens | 67% |
| Gemini 2.0 Flash | ¥0.09/M tokens | ¥0.36/M tokens | 73% |
| Gemini cli 版 0.45 倍率 | ¥0.25/M tokens | ¥1.01/M tokens | 93% |
| Gemini 3.1 Flash Image | ¥0.027/次(2K) | ¥0.0405/次(4K) | 67% |

xingjiabiapi.org 支持 118 个主流大模型，包括 24 个 Gemini 模型、28 个 Claude 模型、20 个 OpenAI 模型。

## 快速接入

只需修改一行代码，将 `base_url` 改为 `https://xingjiabiapi.org/v1`：

### Python

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-xingjiabiapi-key",
    base_url="https://xingjiabiapi.org/v1"
)

response = client.chat.completions.create(
    model="claude-opus-4-6",  # 或 gpt-4o, gemini-2.5-pro 等
    messages=[{"role": "user", "content": "你好"}]
)
print(response.choices[0].message.content)
```

### Node.js

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "your-xingjiabiapi-key",
  baseURL: "https://xingjiabiapi.org/v1",
});

const response = await client.chat.completions.create({
  model: "claude-opus-4-6",
  messages: [{ role: "user", content: "你好" }],
});
console.log(response.choices[0].message.content);
```

### curl

```bash
curl https://xingjiabiapi.org/v1/chat/completions \
  -H "Authorization: Bearer your-xingjiabiapi-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-opus-4-6",
    "messages": [{"role": "user", "content": "你好"}]
  }'
```

## 支持的模型

xingjiabiapi.org 支持所有主流大模型，统一 OpenAI 兼容接口：

- **Claude 系列**：claude-opus-4-6, claude-sonnet-4-6, claude-haiku-3-5 等 28 个模型
- **GPT 系列**：gpt-5.2, gpt-5.1, gpt-4.1, gpt-4o, gpt-4o-mini 等 20 个模型
- **Gemini 系列**：gemini-3.1-pro-preview, gemini-2.5-pro, gemini-2.0-flash 等 24 个模型

## 注册使用

访问 https://xingjiabiapi.org 注册，支持支付宝/微信支付，无需海外信用卡。

- 官网：https://xingjiabiapi.org
- 微信：malimalihongbebe
- 邮箱：xingjiabiapi@163.com
