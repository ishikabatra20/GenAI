import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
const ai = new GoogleGenAI({
  apiKey: "AIzaSyCoYvMrqt7A9O78Wvhbo1qaRhAJP0SIGhg",
});

const History = [];
async function Chatting(userProblems) {
  History.push({
    role: "user",
    parts: [{ text: userProblems }],
  });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",

    contents: History,
  });
  History.push({
    role: "model",
    parts: [{ text: response.text }],
  });
  console.log("\n");
  
  console.log(response.text);
}

async function main() {
  const userProblems = readlineSync.question("Ask me any question...");

  await Chatting(userProblems);

  main();
}

main();
