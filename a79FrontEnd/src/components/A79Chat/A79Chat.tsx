import { FC, useState } from "react";

import { A79MessageList } from "./A79MessageList";
import { A79TypingIndicator } from "./A79TypingIndicator";
import { A79ChatInput } from "./A79ChatInput";
import { MessagePublic } from "./A79ChatPanel";

export type A79ChatProps = {
  sendContent: (sender: string, content: string) => void;
  role: string;
  messages: MessagePublic[];
  isTyping: Record<string, boolean>;
  typing: (writer: string) => void;
  resetTyping: (writer: string) => void;
};

const CONTENT_LOADING_TIME = 400;

export const A79Chat: FC<A79ChatProps> = ({
  sendContent,
  role,
  messages,
  isTyping,
  typing,
  resetTyping,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  /* catch the sendMessage signal and update the loading state then continues the sending instruction */
  const sendContentLoading = (sender: string, message: string) => {
    setIsLoading(true);
    sendContent(sender, message);
    setTimeout(() => {
      setIsLoading(false);
    }, CONTENT_LOADING_TIME);
  };

  return (
    <div className={"chatApp__conv"}>
      <A79MessageList role={role} messages={messages} />
      <div className={"chatApp__convSendMessage clearfix"}>
        <A79TypingIndicator owner={role} isTyping={isTyping} />
        <A79ChatInput
          isLoading={isLoading}
          owner={role}
          sendMessageLoading={sendContentLoading}
          typing={typing}
          resetTyping={resetTyping}
        />
      </div>
    </div>
  );
};
