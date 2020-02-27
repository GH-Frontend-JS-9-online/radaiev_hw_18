import * as React from "react";
import "./../assets/scss/App.scss";
import Header from './header';
import Main from './main';

class App extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<Header /> 
				<Main  />
			</div>	
		);
	}
}

export default App;
