import * as React from "react";
import * as I from '../../interfaces/inderfaces';

const AllUsersPopup: React.FC<I.MessengerPropsForPopup> = (props) => {
	const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]') as any;

	const [recipient, setRecipient] = React.useState({name: "Jhon", _id: '12345'}) as any;

	const recipientHeandler = (user: object): void => {
		setRecipient((prev) => user)
	}

	return (
		<div className="popup">
			<div className="users">
				<div className="overlay_menu_btn_close" onClick={props.isToggleAllUserPopup}></div>
				<h2>Users</h2>
				<div className="users_table_wrapper">
					<table className="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
							</tr>
						</thead>
						{allUsers.map(user => {
							return (<AllUsersList key={user._id} user={user} selectUser={recipientHeandler}/>);
						})}
					</table>
				</div>
				<div className="users_inner">
					<button onClick={() => props.createNewChat(recipient._id)}>Creat chat with</button> <span className="Recipient">{recipient.name}</span>
				</div>
			</div>
		</div>
	);
}

const AllUsersList: React.FC<I.AllUserPopupPropsForUsersList> = ({ user, selectUser }) => {
	
	return (
		<tbody>
			<tr onClick={() => selectUser(user)}>
				<td>{user.name}</td>
				<td>{user.email}</td>
			</tr>
		</tbody>
	);
}


const CreateNewProjectPopup: React.FC<I.ProjectPropsForCreateNewProjectPopup> = (props) => {

	const [title, setTitle] = React.useState<string>('');
	const [company, setCompany] = React.useState<string>('');
	const [cost, setCost] = React.useState<string>('');
	const [deadline, setDeadline] = React.useState<string>('');
	const [error, setError] = React.useState<string>('');
	const titlelHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
	    setTitle(event.target.value)
	}

	const companyHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
	    setCompany(event.target.value)
	}    

	const costHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
	    setCost(event.target.value)
	}

	const deadlineHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
	    setDeadline(event.target.value)
	}

	const NewProjectData: I.NewProjectPopup = {
	   title: title.trim(),
	   company: company.trim(),
	   cost: '$'+cost.trim(),
	   deadline: deadline,
	}

	const newProjectHeandler = () => {
		if(!NewProjectData.title) setError(prev => 'Error: Please enter Title.');
			else if(!NewProjectData.company) setError(prev => 'Error: Please enter Company.');
			else if(NewProjectData.cost.length === 1) setError(prev => 'Error: Please enter Cost.');
			else if(!NewProjectData.deadline) setError(prev => 'Error: Please enter Deadline.');
			else {
				props.createNewProject(NewProjectData)
			}
	}


	return (
		<div className="popup_wrapper">
			<div className="body_projects_popup">
				<div className="overlay_menu_btn_close" onClick={props.showNesProjectPopup}></div>
				<h2>Create new project</h2>
				<form className="body_projects_popup_form" name="form">
					<label>Title:<input type="text" name="title" placeholder="Dashboard API" onChange={titlelHandler}/></label>
					<label>Company:<input type="text" name="company" placeholder="GeekHub System" onChange={companyHandler}/></label>
					<label>Cost:<input type="number" name="cost" placeholder="$2000.50" onChange={costHandler}/></label>
					<label>Deadline:<input name="deadline" type="date"
							     
							       min="2020-01-01" max="2030-01-01"
							       onChange={deadlineHandler}
							       />
					</label>
					<p className="formError">{error}</p>
					<input type="button" name="submit" value="Create"
						onClick={newProjectHeandler}
					/>
				</form>
			</div>
		</div>
	);
}

const UpdateProjectPopup: React.FC<I.ProjectsPropsForUpdateProjectPopup> = (props) => {
	console.log('popup', props.idProject)
	const [error, setError] = React.useState<string>('');
	const [cost, setCost] = React.useState<string>('');
	const [progress, setProgress] = React.useState<number>() as any;
	const [timeSpent, setTimeSpent] = React.useState<number>() as any;
	const [status, setStatus] = React.useState<string>('Development');

	const costlHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
	    setCost(event.target.value)
	}

	const progressHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
	    setProgress(event.target.value)
	}    

	const timeSpentHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
	    setTimeSpent(event.target.value)
	}

	const statusHandler = (event: React.ChangeEvent<HTMLSelectElement>):void => {
	    setStatus(event.target.value)
	}

	const UpdateProject = {
	   cost: '$'+cost.trim(),
	   progress: progress,
	   timeSpent: timeSpent,
	   status: status,
	}

	const updateProjectHeandler = () => {
		if(UpdateProject.cost.length === 1) setError(prev => 'Error: Please enter Cost.');
			else if(!UpdateProject.progress) setError(prev => 'Error: Please enter Progress.');
			else if(!UpdateProject.timeSpent) setError(prev => 'Error: Please enter TimeSpent.');
			else if(!UpdateProject.status) setError(prev => 'Error: Please enter Status.');
			else {
				props.updateProject(props.idProject, UpdateProject);
			}
	}

	return (
		<div className="popup_wrapper">
			<div className="body_projects_popup">
				<div className="overlay_menu_btn_close" onClick={props.showUpdateProjectPopup}></div>
				<h2>Update project</h2>
				<form className="body_projects_popup_form" name="form">
					<label>Cost:<input type="number" name="cost" placeholder="$2000.50" onChange={costlHandler}/></label>
					<label>Progress:<input type="number" name="progress" placeholder="100" min="0" max="100" onChange={progressHandler}/></label>
					<label>TimeSpent:<input type="number" name="timeSpent" placeholder="20" onChange={timeSpentHandler}/></label>
					<label>Status:<select name="status" onChange={statusHandler} >
									<option defaultValue="Development">Development</option>
									<option value="Testing">Testing</option>
									<option value="Design">Design</option>
									<option value="Queued">Queued</option>
									<option value="Completed">Completed</option>
								  </select>
					</label>
					<p className="formError">{error}</p>
					<input type="button" name="submit" value="Update" onClick={updateProjectHeandler}/>
				</form>
			</div>
		</div>
	);
}


export { 
	AllUsersPopup,
	CreateNewProjectPopup,
	UpdateProjectPopup,
	};