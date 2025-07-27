import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
const ai = new GoogleGenAI({
  apiKey: "AIzaSyCoYvMrqt7A9O78Wvhbo1qaRhAJP0SIGhg",
});

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
