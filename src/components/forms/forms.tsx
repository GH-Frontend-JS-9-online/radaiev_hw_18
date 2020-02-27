import * as React from "react";
import { useHistory, Link } from 'react-router-dom';
import dashboardApi from '../../dashboardApi/dashboardApi';
import { IUserLogin, IUserSigIn } from '../../interfaces/inderfaces';


const FormLogIn: React.FC = () => {
	const history = useHistory();

	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [error, setError] = React.useState<string>('');

	const emailHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
	    setEmail(event.target.value)
	}

	const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
	    setPassword(event.target.value)
	}


	const user:IUserLogin = {
	    email: email,
	    password: password
	}


   	const logInHandler = async (user: IUserLogin ) => {
   		if(!user.email) setError(prev => 'Error: Please enter your Email.');
   			else if(!user.password) setError(prev => 'Error: Please enter your Password.');
   			else {
   				dashboardApi.logIn(user)
   				.then(data => {
   					localStorage.setItem('userInfo', JSON.stringify(data))
   					localStorage.setItem('userIsOnline', JSON.stringify({userIsOnline: true}))
   				})
   				.then(() => history.push('/messenger'))
   				.catch(() => setError(prev => 'Error: Such user does not exist or entered data incorrectly.'))
   			}
	}


	return (
		<div className="signUp">

			<h2>Log in</h2>

			<form name="form" className="form">
				<input className="email" type="email" 
					   name="email" placeholder="Email" 
					   required onChange={emailHandler}
				/>
				<input className="password" type="password" 
				       name="password" placeholder="Password" 
				       required onChange={passwordHandler}
				/>

				<Link to="/signUp" className="FormLinks">To register.</Link>
				<p className="formError" id="formError">{error}</p>
				<input className="btnSignUp" type="button" name="btnLogIn" value="Log in"
					onClick={() => logInHandler(user)}
				 />
			</form>

		</div>
	);
}

const FormSignUp: React.FC = () => {
	const history = useHistory();

	const [name, setName] = React.useState<string>('');
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [error, setError] = React.useState<string>('');

	const namelHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
	    setName(event.target.value)
	}

	const emailHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
	    setEmail(event.target.value)
	}

	const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
	    setPassword(event.target.value)
	}


	const user:IUserSigIn = {
		name: name.trim(),
	    email: email.trim(),
	    password: password.trim().toLowerCase()
	}


   	const signUpHandler = async (user: IUserSigIn ) => {
   		if(!user.name) setError(prev => 'Error: Please enter your Name.');
   			else if(!user.email) setError(prev => 'Error: Please enter your Email.');
   			else if(!user.email.includes('@')) setError(prev => 'Error: The email address must contain the character "@".');
   			else if(!user.password) setError(prev => 'Error: Please enter your Password.');
   			else if(user.password.length < 8) setError(prev => 'Error: Password must be at least 8 characters long.');
   			else {
   				
   				dashboardApi.signUp(user)
   				.then(data => {
   					alert('You have successfully registered.')
   					console.log(data)
   				})
   				.then(() => history.push('/'))
   				.catch((err) => {
   					console.log(err);
   					alert('Error: Registration failed, please try again.');
   				})
   			}
	}

	return (
		<div className="signUp">

		    <h2>Sign up</h2>

		    <form name="form" className="form">
		        <input className="name" type="text"
		        	   name="name" placeholder="Name" 
		        	   required onChange={namelHandler}
		        	   />
		        <input className="email" type="email"
		        	   name="email" placeholder="Email" 
		        	    required onChange={emailHandler}
		        	   />
		        <input className="password" type="password" 
		         	   name="password" placeholder="Password"
		         	    required onChange={passwordHandler}
		         	    />
		        <Link to="/" className="FormLinks" >Log in.</Link>
		        <p className="formError">{error}</p>
		        <input className="btnSignUp" type="button"
		        	   name="btnSignUp" value="Sign up" 
		        	   onClick={() => signUpHandler(user)}
		        	   />
		    </form>

		</div>
	);
}

export { 
	FormLogIn,
	FormSignUp,
} ;