# Cloudflare AI Developer Assistant

An AI-powered web application built as part of the Cloudflare AI app assignment, allowing users to chat with a developer-focused AI assistant. The app uses Cloudflare Workers and LLaMA to provide real-time responses and maintains short-term conversation memory.


## Tech Stack
- Cloudflare Workers  
- Cloudflare Workers AI (LLaMA 3.1 – 8B Instruct)  
- Cloudflare Pages  
- JavaScript / HTML / CSS  

## Features
- Chat-based user interface
- AI responses powered by Llama 3.3
- Basic conversation memory (last 5 messages)
- Deployed on Cloudflare


## AI Chat Demo
<img width="3420" height="856" alt="image" src="https://github.com/user-attachments/assets/3e6d8764-ea86-48a8-b51a-d61a06717d24" />

_Screenshot of the AI developer assistant responding to user input._


## How It Works

1. The user sends a message through the chat interface.
2. The message is sent as a POST request to a Cloudflare Worker.
3. The Worker stores recent messages in memory to maintain short-term context.
4. The message and conversation history are sent to the LLaMA 3.1 model using Workers AI.
5. The AI response is returned and displayed in the chat interface.



## Running Locally
1. Install Wrangler: `npm install -g wrangler`
2. Clone the repo
3. cd cf_ai_dev_assistant
Install dependencies `npm install`
4. Run `npx wrangler dev`
