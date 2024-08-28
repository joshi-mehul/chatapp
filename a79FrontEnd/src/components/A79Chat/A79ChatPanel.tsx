import { FC, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { A79Chat } from "./A79Chat";

import "./A79ChatPanel.css";
import { Conversations } from "../A79Table/A79Table";

function detectURL(message: string) {
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, function (urlMatch) {
    return '<a href="' + urlMatch + '">' + urlMatch + "</a>";
  });
}

export type MessageContextPayload = {
  tabular_data?: string;
};

export type MessagePublic = {
  created_at?: string;
  updated_at?: string;
  content: string;
  role?: string;
  conversation_id?: number;
  id: number;
  message_context: MessageContextPayload;
};

const messagesInit: MessagePublic[] = [];

const isTypingInit: Record<string, boolean> = {};

export type A79ChatPanelProps = {
  conver: Conversations;
};

const ENDPOINT = "localhost:5001/conversation";
let socket: Socket;

export const A79ChatPanel: FC<A79ChatPanelProps> = ({ conver }) => {
  const [messages, setMessages] = useState(messagesInit);
  const [isTyping, setIsTyping] = useState(isTypingInit);

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("join", conver, (error: Error) => {
      if (error) {
        console.log("error", error);
        // alert(error);
      }
    });
  }, [conver]);

  useEffect(() => {
    socket.on("message", (messageFromChat) => {
      console.log(messageFromChat);
      setMessages((messages) => [...messages, ...messageFromChat]);
    });
  }, []);

  /* adds a new message to the chatroom */
  const sendContent = (sender: string, content: string) => {
    setTimeout(() => {
      const contentFormat = detectURL(content);

      socket.emit(
        "sendMessage",
        { ...conver, content: contentFormat },
        (error: Error) => {
          if (error) {
            console.log(error);
            alert(error);
          }
        }
      );

      resetTyping(sender);
    }, 400);
  };
  /* updates the writing indicator if not already displayed */
  const typing = (writer: string) => {
    if (!isTyping[writer]) {
      const stateTyping = { ...isTyping };
      stateTyping[writer] = true;
      setIsTyping(stateTyping);
    }
  };
  /* hide the writing indicator */
  const resetTyping = (writer: string) => {
    const stateTyping = { ...isTyping };
    stateTyping[writer] = false;
    setIsTyping(stateTyping);
  };

  const user: { name: string } = {
    name: "user",
  };

  /* creation of a chatbox for each user present in the chatroom */

  return (
    <div className={"chatApp__room"}>
      <A79Chat
        role={user.name}
        sendContent={sendContent}
        typing={typing}
        resetTyping={resetTyping}
        messages={messages}
        isTyping={isTyping}
      />
    </div>
  );
};
