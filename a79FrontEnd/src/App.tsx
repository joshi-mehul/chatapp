import { Resizable, Size, NumberSize } from "re-resizable";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { A79ChatPanel } from "./components/A79Chat";
import { A79Table } from "./components/A79Table";
import { Header } from "./components/Header/Header";

import "./App.css";
import { Conversations } from "./components/A79Table/A79Table";

export declare type Direction =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "topRight"
  | "bottomRight"
  | "bottomLeft"
  | "topLeft";

function App() {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRight: "1px solid #fff",
    background: "#16161E",
    width: "100%",
  };

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [size, setSize] = useState<Size>({ width: "100%", height: "100%" });
  const [conver, onRowSelection] = useState<Conversations>({});

  const handleResize = (
    _event: MouseEvent | TouchEvent,
    _direction: Direction,
    elementRef: HTMLElement
  ) => {
    setSize({ width: elementRef.style.width, height: elementRef.style.height });
  };

  const handleOnOpenChat = (isOpen: boolean) => {
    setIsChatOpen(isOpen);
    if (size.width === "100%") {
      setSize({ ...size, width: "70%" });
    } else {
      setSize({ ...size, width: "100%" });
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="mainContainer">
        <Resizable
          style={style}
          defaultSize={{
            width: "100%",
            height: "100%",
          }}
          size={size}
          onResize={handleResize}
          minHeight="100%"
        >
          <A79Table
            onOpenChat={handleOnOpenChat}
            onRowSelection={onRowSelection}
          />
        </Resizable>

        {isChatOpen && <A79ChatPanel conver={conver} />}
      </div>
    </>
  );
}

export default App;
