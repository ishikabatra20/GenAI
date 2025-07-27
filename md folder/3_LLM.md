import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
const ai = new GoogleGenAI({
  apiKey: "AIzaSyCoYvMrqt7A9O78Wvhbo1qaRhAJP0SIGhg",
});
// Create a chat session using Gemini's chat API
// This automatically handles and stores message history
const chat = ai.chats.create({
  model: "gemini-2.0-flash", // Use the Gemini 2.0 Flash model for fast responses
  history: [] // Initialize empty chat history (it gets filled automatically)
});


// Main function to run the chatbot in a loop
async function main() {
  // Prompt user to ask a question
  const userProblems = readlineSync.question("Ask me any question... ");

  // Send the user's message to the chat model
  const response = await chat.sendMessage({
    message: userProblems,
  });

  // Print the model's response to the terminal
  console.log(response.text);

  // Recursively call main() to keep the chat going
  main();
}

// Start the chatbot
main();

o/p screenshot- CE_7