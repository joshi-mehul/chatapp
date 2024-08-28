import { FC, FormEvent, useRef } from "react";
import SendButtonIcon from "../../assets/sendButton.svg";

export type A79ChatInputProps = {
  isLoading: boolean;
  owner: string;
  resetTyping: (text: string) => void;
  typing: (text: string) => void;
  sendMessageLoading: (owner: string, content: string) => void;
};

export const A79ChatInput: FC<A79ChatInputProps> = ({
  isLoading,
  owner,
  resetTyping,
  typing,
  sendMessageLoading,
}) => {
  const ownerInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLInputElement>(null);

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();
    /* Disable sendMessage if the message is empty */
    if ((contentInput?.current?.value?.length ?? 0) > 0) {
      sendMessageLoading(
        ownerInput?.current?.value ?? "",
        contentInput?.current?.value ?? ""
      );
      /* Reset input after send*/
      if (contentInput.current) {
        contentInput.current.value = "";
      }
    }
  };
  const handleTyping = () => {
    /* Tell users when another user has at least started to write */
    if ((contentInput?.current?.value?.length ?? 0) > 0) {
      typing(ownerInput?.current?.value ?? "");
    } else {
      /* When there is no more character, the user no longer writes */
      resetTyping(ownerInput?.current?.value ?? "");
    }
  };

  /* If the chatbox state is loading, loading class for display */
  const loadingClass = isLoading ? "chatApp__convButton--loading" : "";

  return (
    <form onSubmit={handleSendMessage}>
      <input type="hidden" ref={ownerInput} value={owner} />
      <input type="hidden" />
      <input
        type="text"
        ref={contentInput}
        className={"chatApp__convInput"}
        placeholder="Text message"
        onKeyDown={handleTyping}
        onKeyUp={handleTyping}
        tabIndex={0}
      />
      <div
        className={"chatApp__convButton " + loadingClass}
        onClick={handleSendMessage}
      >
        <img src={SendButtonIcon} />
      </div>
    </form>
  );
};
