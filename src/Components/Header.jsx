import React from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { AiFillCaretDown } from "react-icons/ai";
import "./Header.scss";

const Header = () => {
  return (
    <nav className="header">
      <img src={logo} alt="logo" />
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/popular">Popular</Link>
      </div>

      <ImSearch />
    </nav>
  );
};

export default Header;
