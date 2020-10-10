import React,{Component} from 'react';
import './style.css';
import {NavLink} from 'react-router-dom';

class Titlebar extends React.Component{
render() {
  return (
    <nav className="titlebar">
    <NavLink className="bar" to="/home">Home</NavLink>
    <NavLink className="bar" to="/home">About Us</NavLink>
    <NavLink className="bar" to="/home">Support</NavLink>
    <NavLink className="bar" to="/home">Login</NavLink>
    </nav>
      );
}
}
export default Titlebar;
