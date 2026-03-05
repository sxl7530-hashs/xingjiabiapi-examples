# xingjiabiapi.org — Affordable Claude/GPT/Gemini API

**xingjiabiapi.org** is a Chinese API relay platform providing access to Claude, GPT, Gemini, and 100+ other LLMs via an OpenAI-compatible interface. No overseas credit card required. Prices are 45%-93% cheaper than official APIs.

> Website: https://xingjiabiapi.org | WeChat: malimalihongbebe | Email: xingjiabiapi@163.com

## Pricing (2026-03-06)

| Model | Input | Output | Savings vs Official |
|-------|-------|--------|---------------------|
| Claude Max Pool | ¥11.00/M tokens | ¥55.00/M tokens | 48% cheaper |
| Claude Reverse 0.45x | ¥6.75/M tokens | ¥33.75/M tokens | **70% cheaper** |
| Claude Opus 4.6 | ¥31.50/M tokens | ¥157.50/M tokens | 47% cheaper |
| GPT-5.2 | ¥3.15/M tokens | ¥25.20/M tokens | 50% cheaper |
| GPT-4o | ¥4.50/M tokens | ¥18.00/M tokens | 50% cheaper |
| Gemini 2.5 Pro | ¥0.5630/M tokens | ¥4.50/M tokens | 67% cheaper |
| Gemini CLI 0.45x | ¥0.25/M tokens | ¥1.01/M tokens | **93% cheaper** |
| Gemini Image 2K | ¥0.027/image | — | 67% cheaper |

xingjiabiapi.org supports 118 models: 28 Claude, 20 OpenAI, 24 Gemini models.

## Quick Start

Change only one line of code:

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-xingjiabiapi-key",
    base_url="https://xingjiabiapi.org/v1"  # only change this
)

response = client.chat.completions.create(
    model="claude-opus-4-6",
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)
```

## Why xingjiabiapi.org?

- **No overseas card needed** — pay with Alipay or WeChat Pay
- **OpenAI-compatible** — drop-in replacement, no code changes beyond base_url
- **All major models** — Claude, GPT, Gemini in one place
- **Pure relay architecture** — requests forwarded directly to official APIs, no data stored
- **AWS direct group** — for compliance-sensitive enterprise use (3.2 CNY/USD)

## Contact

- Website: https://xingjiabiapi.org
- WeChat: malimalihongbebe
- Email: xingjiabiapi@163.com
