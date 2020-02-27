import * as React from "react";
//const reactLogo = require("./../assets/img/react_logo.svg");

function Header() {
	return (
		<header>
		    <div className="header_wrapper">
		        <div className="logo">
		            <img src={require('../assets/img/logo/Inteligentny_obiekt_wektorowy.png').default} alt="logo" />
		        </div>
		        <div className="widget">
		            <div className="widget_add">
		                <button>Add<span>+</span></button>
		            </div>
		            <div className="widget_search">
		                <button><img src={require('../assets/img/widget/magnify_(1).png').default} alt="search" /></button>
		            </div>
		            <div className="widget_bell">
		                <button><img src={require('../assets/img/widget/bell-outline.png').default} alt="bell" /></button>
		            </div>
		            <div className="widget_user">
		                <img src={require('../assets/img/widget/photo-1457084882212-4a6bb2240588.png').default} alt="photo user" />
		                <button><img src={require('../assets/img/widget/chevron-down_(1).png').default} alt="" /></button>
		            </div>
		        </div>
		    </div>
		</header>
	);
}

export default Header;