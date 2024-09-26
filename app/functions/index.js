const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); // Import node-fetch for use in Node.js
const { TextDecoder } = require("util"); // Import TextDecoder for decoding streamed chunks
const { pipeline } = require("stream");
const { promisify } = require("util");
const pipelineAsync = promisify(pipeline);

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post("/prompt", async (req, res) => {
  try {
    const { model, messages, ...restOfApiParams } = req.body;

    // Construct the payload for OpenAI API
    const constructor = {
      model: model || "gpt-4",
      messages: messages || [],
      stream: true, // Enable streaming
      ...restOfApiParams,
    };

    // Make the OpenAI API call using node-fetch
    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Ensure you have the API key
        },
        body: JSON.stringify(constructor),
      }
    );

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.statusText}`);
    }

    // Set headers to keep the connection alive for streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Stream response data
    await pipelineAsync(
      openaiResponse.body, // Node.js readable stream from fetch
      async (source) => {
        let buffer = "";
        for await (const chunk of source) {
          buffer += chunk.toString();
          const lines = buffer.split("\n").filter((line) => line.trim() !== "");

          for (const line of lines) {
            const message = line.replace(/^data: /, "").trim();

            if (message === "[DONE]") {
              res.write("data: [DONE]\n\n");
              res.end();
              return;
            }

            try {
              const parsed = JSON.parse(message);
              const content = parsed.choices?.[0]?.delta?.content ?? "";

              if (content) {
                // Send each chunk of content to the client
                res.write(`data: ${JSON.stringify({ content })}\n\n`);
              }
            } catch (err) {
              console.error("Could not parse message:", message, err);
              res.write("data: [ERROR] Invalid message format.\n\n");
            }
          }

          // Reset buffer to handle the next chunk
          buffer = "";
        }
      }
    );

    // Close the response when done
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Error generating completion:", error);
    res.status(500).send({ error: error.message });
  }
});

exports.app = functions.https.onRequest(app);
