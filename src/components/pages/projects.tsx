import * as React from 'react';
import dashboardApi from '../../dashboardApi/dashboardApi';
import * as I from '../../interfaces/inderfaces';
import dateModification from '../../dateModification/dateModification';
import { CreateNewProjectPopup, UpdateProjectPopup } from '../popup/popup';


const Projects: React.FC = () => {
	const [projects, setProjects] = React.useState([]) as any;
	const [isToggleCreateNewProjectPopup = false, setIsToggleCreateNewProjectPopup] = React.useState();
	const [isToggleUpdateProjectPopup = false, setUpdateProjectPopup] = React.useState();
	const [idProject, setIdProject] = React.useState<string>('');

	const userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]') as any;

	React.useEffect(() => {
		dashboardApi.getAllProjects()
		.then(data => {
			console.log('запрос')
			console.log('data',data)
			setProjects(prev => data)
		})
	}, [])

	const showNesProjectPopup = (): void => {
		setIsToggleCreateNewProjectPopup(!isToggleCreateNewProjectPopup);
	}

	const showUpdateProjectPopup = (id?: any): void => {
		setIdProject(id);
		console.log(id)
		setUpdateProjectPopup(!isToggleUpdateProjectPopup);
	}

	const createNewProject = (data: object): void => {
		dashboardApi.createNewProject(data)
		.then(data => {
			data.assigned = userInfo;
			setProjects([data, ...projects])

		})
		.then(() => showNesProjectPopup())
		.catch(() => alert('Error: Something went wrong. Please try again.'))
	}

	const deleteProject = (id: string) => {
		dashboardApi.deleteProject(id)
		.then(data => {
			console.log(data)
			setProjects(prev => projects.filter(item => item._id !== id))
		})
	}

	const updateProject = (id: string, updateData: any) => {
		console.log('id', id);
		console.log('updateData', updateData);
		dashboardApi.updateProject(id, updateData)
		.then(data => {
			console.log(data);
			setProjects(prev => projects.map(item => (item._id === data._id)? data : item))
			setUpdateProjectPopup(!isToggleUpdateProjectPopup);
		})
	}


	return (
	<>
		<ProjectsHeader amountOfProjects={projects.length} showNesProjectPopup={showNesProjectPopup}/>
		<div className="body_projects">
			{isToggleCreateNewProjectPopup? 
				<CreateNewProjectPopup 
					showNesProjectPopup={showNesProjectPopup}
					createNewProject={createNewProject}
				/> : null}

			{isToggleUpdateProjectPopup? <UpdateProjectPopup 
				showUpdateProjectPopup={showUpdateProjectPopup}
				idProject={idProject}
				updateProject={updateProject}
				/> : null}
			
			<table className="body_projects_table" cellSpacing="0">
				<TableHeader />
				{projects.length === 0? <thead><tr><td><h1>Loading.</h1></td></tr></thead>
					: projects.map(project => {
						
						return (
							<TableContent
								projectData= {project} 
								key={project._id}
								deleteProject={deleteProject}
								showUpdateProjectPopup={showUpdateProjectPopup}
							/>
						);
					})}
			</table>
		</div>
	</>
	);
}

const ProjectsHeader: React.FC<I.ProjectsPropsForProjectsHeader> = (props) => {

	return (
		<div className="body_header">
			<div className="body_header_widget">
				<div className="body_header_widget_inbox item"><button>All Projects ({props.amountOfProjects})</button></div>
				<div className="body_header_widget_sent item"><button>Workflow</button></div>
				<div className="body_header_widget_createProject item">
					<button onClick={props.showNesProjectPopup}>Create project</button>
				</div>
			</div>
			<div className="body_header_filter">
				<span>Show projects:</span>
				<button>All<img src={require('../../assets/img/widget/chevron-down_(1).png').default} alt="" /></button>
			</div>
		</div>
	);
}

const TableHeader: React.FC = () => {

	return (
		<thead>
			<tr className="table_head">
				<th>Project title</th>
				<th>Value</th>
				<th>Deadline</th>
				<th>Time spent</th>
				<th>Progress</th>
				<th>Status</th>
				<th>Assigned to</th>
			</tr>
		</thead>
	);
}

const TableContent: React.FC<I.ProjectsPropsForTableContent> = (props) => {	
		
		return (
			<tbody>
				<tr className="table_content">
					<TableContentTitle projectData={props.projectData}/>
					<TableContentCost projectData={props.projectData} />
					<TableContentDeadline projectData={props.projectData} />
					<TableContentTimeSpent projectData={props.projectData} />
					<TableContentProgress projectData={props.projectData} />
					<TableContentStatus projectData={props.projectData} />
					<TableContentAssigned 
						projectData={props.projectData} 
						deleteProject={props.deleteProject}
						showUpdateProjectPopup={props.showUpdateProjectPopup}
						/>
				</tr>	
			</tbody>
		); 
		
}

const TableContentTitle: React.FC<I.ProjectData> = ({ projectData }) => {	
	let styles = {
		scale: {
			background: `${projectData.progress == 100?  '#4caf50' : 
						   projectData.progress == 0? '#e2e3e8' : '#2196f3'}`,
		}
	}

	return (
		<td className="project_table-item">
			<div className="color_detector_left" style={styles.scale} ></div>
			<div className="project_table-item_title text_white">
				{projectData.title.length > 15?  projectData.title.slice(0, 15)+ '...': projectData.title}
			</div>
			<div className="project_table-item_company text_gray">{projectData.company}</div>
		</td>
	);
}

const TableContentCost: React.FC<I.ProjectData> = ({ projectData }) =>  {
	return (
		<td className="project_table-item">
			<div className="project_table-item_value text_white">{projectData.cost}</div>
		</td>
	);
}


const TableContentDeadline: React.FC<I.ProjectData> = ({ projectData }) =>  {
	return (
		<td className="project_table-item">
			<div className="project_table-item_deadline text_white">{dateModification.date(projectData.deadline)}</div>
			<div className="project_table-item_timeLeft text_gray">{dateModification.dateLeft(projectData.created_at, projectData.deadline)}</div>
		</td>
	);
}

const TableContentTimeSpent: React.FC<I.ProjectData> = ({ projectData }) =>  {
	return (
		<td className="project_table-item">
			<div className="project_table-item_timeSpent text_white">{projectData.timeSpent}</div>
		</td>
	);
}

const TableContentProgress: React.FC<I.ProjectData> = ({ projectData }) => {
	let styles = {
		scale: {
			background: `${projectData.progress == 100?  '#4caf50' : 
						   projectData.progress == 0? '#e2e3e8' : '#2196f3'}`,
			width: `${projectData.progress}%`			   
		}
	}

	return (
		<td className="project_table-item">
			<div className="project_table-item_progress">
				<div className="project_table-item_progress-percent text_white">{projectData.progress}%</div>
				<div className="project_table-item_progress-scale">
					<div className="project_table-item_progress-scale_before" style={styles.scale}></div>
				</div>
			</div>
		</td>
	);
}

const TableContentStatus: React.FC<I.ProjectData> = ({ projectData }) =>  {
	return (
		<td className="project_table-item">
			<div className="project_table-item_status text_white">{projectData.status}</div>
		</td>
	);
}

const TableContentAssigned: React.FC<I.TableContentPropsForTableAssigned> = (props) => {
	const [isToggleDropMenu = false, setIsToggleDropMenu] = React.useState();

	const toggleDropMenu = () => {
		setIsToggleDropMenu(!isToggleDropMenu);
	}

		return (
			<td className="project_table-item">
				<div className="project_table-item_assigned">
					<div className="project_table-item_assigned_avatar"><img src={require('../../assets/img/messenger/avatar.png').default} alt="avatar" /></div>
					<div className="project_table-item_assigned_info">
						<div className="project_table-item_assigned_name text_white">
							{props.projectData.assigned === null? 'No name' : props.projectData.assigned.name}
						</div>
						<div className="project_table-item_assigned_position text_gray">
							{props.projectData.assigned === null? 'No position' : props.projectData.assigned.position}
						</div>
					</div>
					<div className="project_table-item_assigned_settings"
						onClick={() => setIsToggleDropMenu(!isToggleDropMenu)}
					>
						<img src={require('../../assets/img/pojects/dots-vertical.png').default}  alt="" />
					</div>
					{isToggleDropMenu? <DropMenu 
						projectID={props.projectData._id} 
						deleteProject={props.deleteProject}
						showUpdateProjectPopup={props.showUpdateProjectPopup}
						toggleDropMenu={toggleDropMenu}
						/> : null}
				</div>
			</td>
		);
}

const DropMenu: React.FC<I.TableContentAssignedPropsForDropMenu> = (props) => {

	return (
		<div className="project_table-item_assigned_popup">
			<div className="project_table-item_assigned_popup_update"
				onClick={() => {
					props.showUpdateProjectPopup(props.projectID);
					props.toggleDropMenu();
				}}
			>Update project</div>
			<div className="project_table-item_assigned_popup_remove"
				onClick={() => props.deleteProject(props.projectID)}
			>Remove project</div>
		</div>
	);
}

export default Projects;