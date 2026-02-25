# AI Model API 调用示例 | AI Model API Examples

快速接入 OpenAI / Claude / Gemini 等主流大模型 API 的代码示例。

Code examples for quickly integrating OpenAI / Claude / Gemini and other mainstream AI model APIs.

## 🚀 快速开始 | Quick Start

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://xingjiabiapi.org/v1"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)
```

## 📦 支持的模型 | Supported Models

- OpenAI: GPT-4o, GPT-5.2, o1, o3
- Anthropic: Claude Opus 4.6, Claude Sonnet 4.6
- Google: Gemini 3.1 Pro, Gemini 3.0 Pro
- Meta: Llama 4

## 📁 示例目录 | Examples

- [Python 基础调用](./python/basic.py)
- [流式输出](./python/streaming.py)
- [多模型切换](./python/multi_model.py)
- [Node.js 示例](./nodejs/basic.js)

## 🔗 相关链接 | Links

- **API 平台**: [xingjiabiapi.org](https://xingjiabiapi.org)
- **微信交流**: malimalihongbebe
- **商务邮箱**: xingjiabiapi@163.com

## License

MIT
