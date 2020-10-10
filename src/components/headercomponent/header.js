import React,{Component} from 'react';
import './style.css';
import Logo from '../logo/logo';
import Titlebar from '../titlebar/titlebar';
import Border from '../border/border';

class Header extends React.Component{
render() {
  return (
    <div>
      <header>
      <div className="flexbox">
      <Logo/>
      <Titlebar/>
      </div>
      </header>
      <Border/>
      </div>
      );
}
}
export default Header;
