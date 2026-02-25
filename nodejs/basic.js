/**
 * Node.js 基础调用示例
 * Basic Node.js API call example
 */
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: 'your-api-key',
    baseURL: 'https://xingjiabiapi.org/v1'
});

const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: 'Hello from Node.js!' }]
});

console.log(response.choices[0].message.content);
