import { IUserLogin, IUserSigIn } from '../interfaces/inderfaces';

class DashboardApi {
			 token: string
	readonly baseUrl: string

	constructor() {
		this.token = '';
		this.baseUrl = 'https://geekhub-frontend-js-9.herokuapp.com/api';
	}

	 async logIn(data: IUserLogin) {
		
		let headers = {
			"Content-Type": "application/json",
		}

		let user = {
			email: data.email,
			password: data.password
		}

		return await fetch(`${this.baseUrl}/users/login`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: headers,
		}).then(async response => {
			if(response.ok) {

			    this.token = await response.headers.get('x-auth-token');

			   await localStorage.setItem('token', response.headers.get('x-auth-token') as any);

			   await this.getAllUsers().then(data => {
					localStorage.setItem('allUsers', JSON.stringify(data) as any);

				})
				
				return response.json();

			}

			return response.json().then(err => {
				let e = new Error(err);
				throw e;
			})

		})
	}

	async signUp(data: IUserSigIn) {

		let headers = {
			"Content-Type": "application/json",
		}

		let user = {
			name: data.name,
			email: data.email,
			password: data.password
		}

		return fetch(`${this.baseUrl}/users/`, {
			method: "POST",
			body: JSON.stringify(user),
			headers: headers,
		}).then(response => {
			if(response.ok) return response.json();

			return response.json().then(error => {
				let e = new Error(error);
				throw e;

			})
		})
	}

	async getAllUsers() {
		const token = await localStorage.getItem('token');

		let headers = {
			"x-access-token": token,
			"Content-Type": "application/json",
		}
		return fetch(`${this.baseUrl}/users/all/`,{
			headers: headers
		}).then(response => response.json())
	}

	async getAllThreads() {
		const token = await localStorage.getItem('token');

		let headers = {
			"x-access-token": token,
			"Content-Type": "application/json",
		}

		return fetch(`${this.baseUrl}/threads?sort=desc`,{
			headers: headers
		}).then(response => response.json())
	}

	async createNewThreads(id: string) {
		const token = await localStorage.getItem('token');

		let headers = {
			"x-access-token": token,
			"Content-Type": "application/json",
		}

		let body = {
			"user": {
				"_id": id,
			}
		}

		return fetch(`${this.baseUrl}/threads/`,{
			method: 'POST',
			body: JSON.stringify(body),
			headers: headers
		}).then(response => response.json())
	}

	async getAllMessageByThread(id: string) {
		const token = await localStorage.getItem('token');

		let headers = {
			"x-access-token": token,
			"Content-Type": "application/json",
		}

		return fetch(`${this.baseUrl}/threads/messages/${id}`, {
			headers: headers,
		}).then(response => response.json())
	}

	async sendMessage(id: string, message: string) {
		const token = await localStorage.getItem('token');

		let headers = {
			"x-access-token": token,
			"Content-Type": "application/json",
		}

		let body = {
			"thread": {
				"_id": id,
			},
			"message": {
				"body": message,
			}
		}
		console.log('id',id);
		console.log('text',message)
		return fetch(`${this.baseUrl}/threads/messages`,{
			method: 'POST',
			body: JSON.stringify(body),
			headers: headers
		}).then(response => response.json())
	}

//==== Projects ==============================================================================================

	async getAllProjects() {
		const token = await localStorage.getItem('token');

		let headers = {
			"x-access-token": token,
			"Content-Type": "application/json",
		}

		return fetch(`${this.baseUrl}/projects/`, {
			headers: headers
		}).then(response => response.json())
	}

	async createNewProject(NewProjectData: any) {
	    const token = await localStorage.getItem('token');
	    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]') as any;

	    let headers = {
	    	"x-access-token": token,
	    	"Content-Type": "application/json",
	    }

		let data = {
			"title": NewProjectData.title,
			"company": NewProjectData.company,
			"cost": NewProjectData.cost,
			"deadline": NewProjectData.deadline,
			"assigned": userInfo._id
		}

		return await fetch(`${this.baseUrl}/projects/`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: headers,
		}).then(response => {
			if(response.ok) return response.json();

			return response.json().then(error => {
				let e = new Error(error);
				throw e;
			})
		})	
	}

	async deleteProject(id: string) {
		const token = await localStorage.getItem('token');

		let headers = {
			"x-access-token": token,
			"Content-Type": "application/json",
		}
		return await fetch(`${this.baseUrl}/projects/${id}`, {
			method: 'DELETE',
			headers: headers,
		}).then(response => response.json());
	}

	async updateProject(id: string, data: any) {
		const token = await localStorage.getItem('token');

		let headers = {
			"x-access-token": token,
			"Content-Type": "application/json",
		}

		let body = {
			"cost": data.cost,
			"progress": data.progress,
			"timeSpent": data.timeSpent,
			"status": data.status,
		}

		return fetch(`${this.baseUrl}/projects/${id}`, {
			method: "PUT",
			body: JSON.stringify(body),
			headers: headers,
		}).then(response => response.json())
	}

}	


let dashboardApi = new DashboardApi();
export default dashboardApi;
