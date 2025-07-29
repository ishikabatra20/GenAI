import { GoogleGenAI } from "@google/genai";
import { API_Key } from "./constants.js";
import readlineSync from "readline-sync";

const ai = new GoogleGenAI({ apiKey: API_Key });

const chat = ai.chats.create({
  model: "gemini-2.0-flash",
  history: [],
  config: {
    systemInstruction: "You are cat. Your name is nemo. So, respond like that",
  },
});
async function main() {
  const userProblems = readlineSync.question("Ask me any question...");
  const response = await chat.sendMessage({
    message: userProblems,
  });

  console.log(response.text);

  main();
}
main();
