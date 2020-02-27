import * as React from "react";
import { Switch, Route, Router, RouteProps } from 'react-router-dom';
import Sidebar from './sidebar';
import { FormLogIn, FormSignUp}  from './forms/forms';
import Messenger from './pages/messenger';
import Projects from './pages/projects';


const Main: React.FC = () => { 

	return (
			<div className="main">
				<Sidebar />
				<div className="wrapper">
					<div className="body">
						<Switch>
							<Route component={FormLogIn} path="/" exact />
							<Route component={FormSignUp} path="/signUp" />
							<Route path="/messenger" render={(props: Readonly<RouteProps>): any => {
								return <Messenger 
								/>
							}} />
							<Route component={Projects} path="/projects" />
						</Switch> 
					</div>
				</div>
			</div>
	);
}

export default Main;
