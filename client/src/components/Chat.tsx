import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const socket = io("http://localhost:3000");

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("receiveMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      text: input,
      sender: "user",
    };

    socket.emit("sendMessage", newMessage);
    setInput("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md flex flex-col h-96">
      <ScrollArea className="flex-1 p-2 border rounded-lg overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 my-1 rounded-lg max-w-[75%] whitespace-pre-line ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </ScrollArea>

      <div className="mt-2 flex gap-2">
        <Input
          value={input}
          data-testid="chat-input"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Write your message here..."
          className="flex-1"
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
