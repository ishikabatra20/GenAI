import { GoogleGenAI } from "@google/genai";
import { API_Key } from "./constants.js";
import readline from "readline-sync";
const ai = new GoogleGenAI({ apiKey: API_Key });

const chat = ai.chats.create({
  model: "gemini-2.0-flash",
  history: [],
  config: {
    systemInstruction:
      "You are a Data Structure and algorithm instructor. You have to strictly behave like that and you have to answer only questions orqueries related to it other than that you can say Ask only DSA questions or this kind of reply in your way.",
  },
});

async function main() {
  const userQueries = readline.question("Ask me questions related to DSA..");
  const response = await chat.sendMessage({
    message: userQueries,
  });

  console.log(response.text);

  main();
}

main();
