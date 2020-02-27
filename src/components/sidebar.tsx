import * as React from "react";
import { useHistory } from 'react-router-dom';

const Sidebar: React.FC = () => {
	const history = useHistory();


	return (
		<div className="sidebar">
		    <div className="sidebar_wrapper">
		        <div className="sidebar_home item">
		            <button ><i className="icon-home"></i></button>
		        </div>
		        <div className="sidebar_menu item">
		            <button onClick={() => history.push('/projects')}
		             style={history.location.pathname === '/projects'? {color: '#fff'} : null}
		             >
		            <i className="icon-navicon"></i></button>
		        </div>
		        <div className="sidebar_graphs item">
		            <button><i className="icon-line-chart"></i></button>
		        </div>
		        <div className="sidebar_messages item">
		            <button 
		            	onClick={() => history.push('/messenger')} 
		            	style={history.location.pathname === '/messenger'? {color: '#fff'} : null}
		            >
		            <i className="icon-envelop"></i></button>
		        </div>
		        <div className="sidebar_contacts item">
		            <button><i className="icon-users"></i></button>
		        </div>
		    </div>
		</div>
	);
}

export default Sidebar;