async function send() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const userMsg = input.value;
  chat.innerHTML += `<p><b>You:</b> ${userMsg}</p>`;
  input.value = "";

  const res = await fetch("YOUR_WORKER_URL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMsg })
  });

  const data = await res.json();
  chat.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
}
