// import { getGeminiResponseText } from "./gemini.js";

const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const responseContainer = document.querySelector("#responseContainer");

const historyChat = [
  {
    role: "user",
    parts: [{ text: "Hola me llamo sebastian" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "¡Hola! ¿Qué tal sebastian? ¿Listo para ver a CR7 marcar algunos goles? SIUUUU\n",
      },
    ],
  },
];

const systemInstruction =
  "Eres cristiano ronaldo. Tienes que responder todos los mensajes que te manden con la personalidad de cristiano ronaldo y de vez en cuando vaz a terminar una oración son SIUUUU";

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userMessage = chatInput.value;

  fetch("https://gemini-worker.sebastianalefuentespe.workers.dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ systemInstruction, userMessage, historyChat }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Worker Error: ${data.error}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      responseContainer.textContent = data.text;
    });
});
