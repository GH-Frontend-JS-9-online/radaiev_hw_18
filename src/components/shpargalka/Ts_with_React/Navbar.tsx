import * as React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
 return (
 	<nav>
 	  <div className="nav-wrapper purple darcen-2 px1">
 	    <a href="/" className="brand-logo">React + Typescript</a>
 	    <ul id="nav-mobile" className="right hide-on-med-and-down">
 	      <li><NavLink to="/">list works</NavLink></li>
 	      <li><NavLink to="/about">About</NavLink></li>
 	    </ul>
 	  </div>
 	</nav>
 );
}