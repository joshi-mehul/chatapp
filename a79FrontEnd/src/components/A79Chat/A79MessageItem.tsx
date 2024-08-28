import { FC } from "react";
import { toast, Bounce } from "react-toastify";
import copy from "../../assets/copy.svg";
import "react-toastify/dist/ReactToastify.css";

export type A79MessageItem = {
  role: string;
  sender: string;
  message: string;
};
export const A79MessageItem: FC<A79MessageItem> = ({
  role,
  sender,
  message,
}) => {
  /* message position formatting - right if I'm the author */
  const messagePosition =
    role == sender
      ? "chatApp__convMessageItem--right"
      : "chatApp__convMessageItem--left";

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    toast("Text copied successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <div
      className={"chatApp__convMessageItem " + messagePosition + " clearfix"}
    >
      <div className="chatApp__convMessageValue">{message}</div>
      {role !== sender && (
        <div className="chatApp__convMessageItem_copyButton">
          <img onClick={handleCopy} src={copy} />
        </div>
      )}
    </div>
  );
};
