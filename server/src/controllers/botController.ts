import { Server, Socket } from "socket.io";
import { evaluateExpression } from "../services/CalculatorService";
import saveCalculation from "../services/saveCalculations";
import getCalc from "../services/getCalculations";

interface Message {
  text: string;
}

export const handleBotCommands = (io: Server, socket: Socket): void => {
  console.log(`A user connected ${socket.id}`);
  socket.on("sendMessage", (msg: Message) => {
    console.log(`message: ${msg.text}`);
    io.emit("receiveMessage", msg);
    if (msg.text === "history") {
      console.log("History command received");
      getCalc().then((calc) => {
        const results: string[] = [];
        calc.forEach((calculation) => {
          results.push(`${calculation.expression} = ${calculation.result}`);
        });
        const botReply = {
          text: results.join("\n"),
        };
        io.emit("receiveMessage", botReply);
      });
    } else {
      try {
        const result = evaluateExpression(msg.text);
        saveCalculation(msg.text, result.toString());
        const botReply = {
          text: `${msg.text} = ${result}`,
        };
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