import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
import { API_Key } from "./constants";
const ai = new GoogleGenAI({apiKey: API_Key});

const chat = ai.chats.create({
     model: "gemini-2.0-flash",
     history:[]
})


async function main() {
  const userProblems = readlineSync.question("Ask me any question...");
  const response = await chat.sendMessage({
    message: userProblems,
  })

  console.log(response.text);
  
  main();
}

main();
