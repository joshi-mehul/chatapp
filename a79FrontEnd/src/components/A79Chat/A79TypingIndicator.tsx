import { FC } from "react";

export type TypingIndicatorProps = {
  isTyping: Record<string, unknown>;
  owner: string;
};
export const A79TypingIndicator: FC<TypingIndicatorProps> = ({
  isTyping,
  owner,
}) => {
  let typersDisplay = "";
  let countTypers = 0;
  /* for each user writing messages in chatroom */
  for (const key in isTyping) {
    /* retrieve the name if it isn't the owner of the chatbox */
    if (key !== owner && isTyping[key]) {
      typersDisplay += ", " + key;
      countTypers++;
    }
  }
  /* formatting text */
  typersDisplay = typersDisplay.substring(1);
  typersDisplay += countTypers > 1 ? " are " : " is ";
  /* if at least one other person writes */
  if (countTypers > 0) {
    return (
      <div className={"chatApp__convTyping"}>
        {typersDisplay} writing
        <span className={"chatApp__convTypingDot"}></span>
      </div>
    );
  }
  return <div className={"chatApp__convTyping"}></div>;
};
