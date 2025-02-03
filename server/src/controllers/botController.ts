import { Server, Socket } from "socket.io";
import calculateExpression from "../services/CalculatorService";
import saveCalculation from "../services/saveCalculations";
import getCalc from "../services/getCalculations";

interface Message {
  text: string;
  sender: "user" | "bot";
}

export const handleBotCommands = (io: Server, socket: Socket): void => {
  console.log(`A user connected ${socket.id}`);
  socket.on("sendMessage", (msg: Message) => {
    console.log(`message: ${msg.text}`);
    io.emit("receiveMessage", msg);
    let botReply: Message;
    const text: string = msg.text.trim();
    if (text.toLowerCase() === "history") {
      console.log("History command received");
      getCalc().then((calc) => {
        const results: string[] = [];
        calc.forEach((calculation) => {
          results.push(`${calculation.expression} = ${calculation.result}`);
        });
        botReply = {
          sender: "bot",
          text: results.join("\n"),
        };
        io.emit("receiveMessage", botReply);
      });
    } else {
      try {
        const result = calculateExpression(text);
        if (typeof result === 'number' && !isNaN(result)) {
            saveCalculation(text, result.toString());
            botReply = {
            sender: "bot",
            text: `${text} = ${result}`,
            };
        } else {
            botReply = {
                sender: "bot",
                text: result.toString(),
            };
        }
        io.emit("receiveMessage", botReply);
      } catch (error) {
        console.error("Error evaluating expression:", error);
        const botReply = {
          text: "Error evaluating expression",
        };
        io.emit("receiveMessage", botReply);
      }
    }
  });
};