import React, { useState } from "react";
import "./Navbar.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
function NavBar() {
  const [burger, setBurger] = useState("hamburger");
  return (
    <nav>
      <Logo />
      <ul className="ses">
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/signin">SignIn</Link>
        </li>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
      </ul>
      {/* for media query */}
      {burger === "hamburger" ? (
        <button className={burger} onClick={() => setBurger("cross-bun")}>
          <span className="line "></span>
          <span className="line "></span>
          <span className="line"></span>
        </button>
      ) : (
        <button className={burger} onClick={() => setBurger("hamburger")}>
          <span>X</span>
        </button>
      )}
      {burger === "cross-bun" ? (
        <ul className="bses">
          <li>
            <Link onClick={() => setBurger("hamburger")} to="/products">
              Products
            </Link>
          </li>
          <li>
            <Link onClick={() => setBurger("hamburger")} to="/signin">
              SignIn
            </Link>
          </li>
          <li>
            <Link onClick={() => setBurger("hamburger")} to="/signup">
              SignUp
            </Link>
          </li>
        </ul>
      ) : null}
    </nav>
  );
}

export default NavBar;
