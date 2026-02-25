"""
基础 API 调用示例
Basic API call example
"""
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://xingjiabiapi.org/v1"
)

# 调用 GPT-4o
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手"},
        {"role": "user", "content": "用 Python 写一个快速排序"}
    ],
    temperature=0.7
)

print(response.choices[0].message.content)
print(f"Token 用量: {response.usage.total_tokens}")
