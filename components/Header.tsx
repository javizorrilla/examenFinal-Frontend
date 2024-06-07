import { FunctionComponent } from "preact";
import Logout from "../islands/Logout.tsx";

type Username = {
    name: string;
}

const Header: FunctionComponent<Username> = ({name}) => {
  return (
    <header class="header-container">
      <div class="header-content">
        <span class="user-name">{name}</span>
        <Logout />
      </div>
    </header>
  );
};

export default Header;