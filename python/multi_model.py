"""
多模型切换示例 - 同一个 base_url，切换 model 参数即可
Multi-model switching - same base_url, just change the model parameter
"""
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://xingjiabiapi.org/v1"
)

models = [
    "gpt-4o",
    "claude-sonnet-4-6-20250514",
    "gemini-3.1-pro-preview",
]

question = "什么是 RAG？用一句话解释"

for model in models:
    resp = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": question}],
        max_tokens=100
    )
    print(f"[{model}]: {resp.choices[0].message.content}\n")
