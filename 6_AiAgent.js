import { GoogleGenAI } from "@google/genai";
import readline from "readline-sync";
import { API_Key } from "./constants.js";

const ai = new GoogleGenAI({ apiKey: API_Key });
const History = [];
function sum({ num1, num2 }) {
  return num1 + num2;
}

function prime({ num }) {
  if (num < 2) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) if (num % i == 0) return false;

  return true;
}

async function getCryptoPrice({ coin }) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}`
  );
  const data = await response.json();

  return data;
}


const sumDeclaration={
    name: 'sum',
    description: "Get the sum of two numbers.",
    parameter:{
        type: 'OBJECT',
        properties:{
            num1:{
                type: "NUMBER",
                description: "It will be first number for addition. example- 10"
            },
            num2:{
                type: "NUMBER",
                description:"It will be second number for addition. example- 13"
            }
        },
        required : ["num1", "num2"]
    },

}


const primeDeclaration={
    name : 'prime',
    description:"Get if number is prime or not.",
    parameter:{
        type: "OBJECT",
        properties:{
            num:{
                type:"NUMBER",
                description:"It will be number to find whether it's prime or not. ex-13",
            }
        },
        required: ['num']
    }
}

const cryptoDeclaration = {
    name:'getCryptoPrice',
    description:"Get the current price of any crypto Currency like bitcoin",
    parameters:{
        type:'OBJECT',
        properties:{
            coin:{
                type:'STRING',
                description: 'It will be the crypto currency name, like bitcoin'
            },
        },
        required: ['coin']   
    }
}

async function runAgent(userProblems) {
  History.push({
    role: "user",
    parts: { text: userProblems },
  });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: History,
    config:{
      tools:[{
        functionDeclarations: [sumDeclaration,cryptoDeclaration,primeDeclaration]
      }]
    }
  });






  
  console.log(response);

  History.push({
    role: "model",
    parts: [{ text: response.text }],
  });
}

async function main() {
  const userProblems = readline.question("Ask me anything..");
  await runAgent(userProblems);
  main();
}

main();
