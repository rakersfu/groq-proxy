// 设置目标主机
const OPENAI_API_HOST = "api.openai.com";

// 启动 Deno 服务
Deno.serve(async (request) => {
  // 解析原始请求 URL
  const url = new URL(request.url);
  url.host = OPENAI_API_HOST;

  // 复制原始请求头
  const headers = new Headers(request.headers);

  // 在服务端注入 API Key（从环境变量读取）
  headers.set("Authorization", `Bearer ${Deno.env.get("OPENAI_API_KEY")}`);

  // 构造新的请求
  const newRequest = new Request(url.toString(), {
    headers,
    method: request.method,
    body: request.body,
    redirect: "follow",
  });

  // 转发到 OpenAI 并返回响应
  return await fetch(newRequest);
});
