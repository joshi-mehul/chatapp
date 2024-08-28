import { FC, useState } from "react";
import moveArrow from "../../assets/moveArrow.svg";
import "./A79TableHeader.css";

export type A79TableHeaderProps = {
  name: string;
  onOpenChat: (isChatOpen: boolean) => void;
};
export const A79TableHeader: FC<A79TableHeaderProps> = ({
  name,
  onOpenChat,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
    onOpenChat(!isOpen);
  };
  return (
    <div className="A79TableHeaderContainer">
      <div>Table Name {name}</div>
      <img src={moveArrow} alt="" onClick={handleIsOpen} />
    </div>
  );
};
