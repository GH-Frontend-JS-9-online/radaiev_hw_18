	interface IUserLogin {
		email: string
		password: string
	}

	interface IUserSigIn {
		name: string
		email: string
		password: string
	}

	interface IDateLeft{
		[key: number]: string | number
	}

	interface MainProps {
		showUserHeandler(user: object[]): void
		readonly showUserInfo: object
	}

	interface MessengerPropsForMessContacts {
		showUserHeandler(user: object[], id: string): void
		isToggleAllUserPopup(): void
		//showMessages(id: string)
	}

	interface MessengerPropsForMessInterlocutor {
		readonly showUserInfo: object | any
	}

	interface MessengerPropsForPopup {
		isToggleAllUserPopup(): void
		createNewChat(id: string): void
	}

	interface AllUserPopupPropsForUsersList {
		user: any
		selectUser(user: object): void
	}

	interface MessengerPropsForMessChat {
		messages: any
		threadId: string
	}

	interface Message {
		message: any
	}

	interface ProjectsPropsForProjectsHeader {
		amountOfProjects: number
		showNesProjectPopup(): void
	}

	interface ProjectsPropsForTableContent {
		projectData: object
		deleteProject(id: string)
		showUpdateProjectPopup(): void
	}

	interface ProjectData {
		projectData: any
	}

	interface ProjectPropsForCreateNewProjectPopup {
		showNesProjectPopup(): void
		createNewProject(data: object): void
	}

	interface NewProjectPopup {
		title: string
		company: string
		cost: string
		deadline: string
	}

	interface TableContentAssignedPropsForDropMenu {
		projectID: string
		deleteProject(id: string)
		showUpdateProjectPopup(id?: any): void
		toggleDropMenu()
	}

	interface TableContentPropsForTableAssigned {
		projectData: any
		deleteProject(id: string)
		showUpdateProjectPopup(id?: any): void
	}

	interface ProjectsPropsForUpdateProjectPopup {
		showUpdateProjectPopup(id?: any): any
		idProject: string
		updateProject(id: string, updateData: any): any
	}

	export {
		IUserLogin,
		IUserSigIn,
		IDateLeft,
		MainProps,
		MessengerPropsForMessContacts,
		MessengerPropsForMessInterlocutor,
		MessengerPropsForPopup,
		AllUserPopupPropsForUsersList,
		MessengerPropsForMessChat,
		Message,
		ProjectsPropsForProjectsHeader,
		ProjectsPropsForTableContent,
		ProjectData,
		ProjectPropsForCreateNewProjectPopup,
		NewProjectPopup,
		TableContentAssignedPropsForDropMenu,
		TableContentPropsForTableAssigned,
		ProjectsPropsForUpdateProjectPopup,
	}
