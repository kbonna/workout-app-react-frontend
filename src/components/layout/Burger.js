import React, { useState } from "react";
import "./Burger.scss";

function Burger({ setIsSidebarOpened }) {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  const onClick = () => {
    setIsBurgerOpened((prevIsBurgerOpened) => !prevIsBurgerOpened);
    setIsSidebarOpened((prevIsSidebarOpened) => !prevIsSidebarOpened);
  };

  return (
    <div className="burger-wrapper" onClick={onClick}>
      <div
        className={`burger burger--${isBurgerOpened ? "opened" : "closed"}`}
      ></div>
    </div>
  );
}

export default Burger;
