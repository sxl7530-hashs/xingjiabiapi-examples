"""
流式输出示例
Streaming output example
"""
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://xingjiabiapi.org/v1"
)

stream = client.chat.completions.create(
    model="claude-sonnet-4-6-20250514",
    messages=[{"role": "user", "content": "写一首关于编程的诗"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
print()
