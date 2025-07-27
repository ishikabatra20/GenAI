// Import the GoogleGenAI SDK from the @google/genai package
import { GoogleGenAI } from "@google/genai";

// Import readline-sync to allow input from the user in the terminal
import readlineSync from "readline-sync";

// Initialize the GoogleGenAI instance with your API key
const ai = new GoogleGenAI({
  apiKey: "AIzaSyCoYvMrqt7A9O78Wvhbo1qaRhAJP0SIGhg",
});

// This array will store the entire chat history (user + model messages)
// It helps the model maintain context across messages
const History = [];

// The Chatting function takes the user's question/input and processes it
async function Chatting(userProblems) {
  // Add the user's message to the conversation history
  History.push({
    role: "user",
    parts: [{ text: userProblems }],
  });

  // Send the full chat history to the Gemini model
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash", // Specify the model to use
    contents: History,         // Pass the conversation history
  });

  // Get the actual response text from the model
  const responseText = await response.response.text();

  // Add the model's reply to the conversation history
  History.push({
    role: "model",
    parts: [{ text: responseText }],
  });

  // Print the model's response to the console
  console.log(responseText);
}

// The main function handles repeated user input and model interaction
async function main() {
  // Ask the user for input via terminal prompt
  const userProblems = readlineSync.question("Ask me any question... ");

  // Use 'await' to make sure we wait for the model's response before continuing
  await Chatting(userProblems);

  // Recursively call main() to keep the conversation going
  // Without this call, the program would exit after one question
  main();
}

// Start the conversation when the script runs
main();

Image in 
 screenshots/CE_4 file

 if i comment main() in main function then -> screenshots/CE_5 file

 if i comment await in main function then -> screenshots/CE_6 file
