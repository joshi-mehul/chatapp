import logo from "../../assets/logo.svg";
import "./Header.css";
export const Header = () => {
  return (
    <div className="headerContainer">
      <img className="logo" src={logo} />
      <div></div>
      <img className="profile" src="/test.jpeg" />
    </div>
  );
};
