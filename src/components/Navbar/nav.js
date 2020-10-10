import React,{Component} from 'react';
import './style.css';
import {NavLink} from 'react-router-dom';

class Nav extends React.Component{
render() {
  return (
    <nav className="navbar">
    <div className="link">
    <NavLink className="home" to="/home">Breakfasts</NavLink>
    <NavLink className="home" to="/home">Smoothies</NavLink>
    <NavLink className="home" to="/home">Beverages</NavLink>
    </div>
    </nav>
      );
}
}
export default Nav;
