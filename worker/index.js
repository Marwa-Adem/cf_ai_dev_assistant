let memory = [];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1️⃣ Serve frontend HTML for GET /
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>AI Chat</title>
          </head>
          <body>
            <div id="chat">
              <div id="messages"></div>
              <input type="text" id="userInput" placeholder="Type your message..." />
              <button id="sendBtn">Send</button>
            </div>

            <script>
              const sendBtn = document.getElementById("sendBtn");
              const userInput = document.getElementById("userInput");
              const messagesDiv = document.getElementById("messages");

              sendBtn.addEventListener("click", async () => {
                const message = userInput.value;
                if (!message) return;
                messagesDiv.innerHTML += '<div><b>You:</b> ' + message + '</div>';

                const response = await fetch("/api/chat", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ message })
                });

                const data = await response.json();
                messagesDiv.innerHTML += '<div><b>AI:</b> ' + data.reply + '</div>';
                userInput.value = "";
              });
            </script>
          </body>
        </html>
      `, { headers: { "Content-Type": "text/html" }});
    }

    // Handles POST /api/chat (your existing AI logic)
    if (request.method === "POST" && url.pathname === "/api/chat") {
      const { message } = await request.json();

      memory.push(message);
      if (memory.length > 5) memory.shift(); 

      const prompt = `
You are a helpful developer assistant.
Conversation history: ${memory.join("\n")}
User: ${message}
      `;

      const response = await env.AI.run(
        "@cf/meta/llama-3.1-8b-instruct-fp8",
        { prompt }
      );

      return new Response(JSON.stringify({ reply: response.response }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // Handles favicon or other GET requests
    if (request.method === "GET" && url.pathname === "/favicon.ico") {
      return new Response("Not found", { status: 404 });
    }

    //  Default: everything else
    return new Response("Method Not Allowed", { status: 405 });
  }
};
