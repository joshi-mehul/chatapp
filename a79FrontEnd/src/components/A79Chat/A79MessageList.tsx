import { FC } from "react";
import { A79MessageItem } from "./A79MessageItem";
import { MessagePublic } from "./A79ChatPanel";

export type A79Message = {
  id: number;
  sender: string;
  senderAvatar: string;
  message: string;
};

export type A79MessageListProps = {
  messages: MessagePublic[];
  role: string;
};

export const A79MessageList: FC<A79MessageListProps> = ({ messages, role }) => {
  console.log(messages);
  return (
    <div className={"chatApp__convTimeline"}>
      {messages
        .slice(0)
        .reverse()
        .map((messageItem) => (
          <A79MessageItem
            key={messageItem.id}
            role={role}
            sender={messageItem.role ?? ""}
            message={messageItem.content}
          />
        ))}
    </div>
  );
};
