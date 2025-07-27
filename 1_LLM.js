import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
import { API_Key } from "./constants";
const ai = new GoogleGenAI({apiKey: API_Key});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    //This will not have context
    //contents: "What is my name?",

    //to work like chatgpt
    contents:[
        {
            "role": "user",
            "parts": [{text: "Hi, My name is Rach"}]
        },
        {
            "role": "model",
            "parts" : [{text: "Hi Rach! It's nice to meet you. How can I help you today?"}]
        },
        {
            "role": "user",
            "parts": [{text: "What is my name?"}]
        }
    ]
  });
  console.log(response.text);
}




 main();