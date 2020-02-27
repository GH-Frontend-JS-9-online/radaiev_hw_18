import * as React from 'react';
import dashboardApi from '../../dashboardApi/dashboardApi';
import dateModification from '../../dateModification/dateModification';
import * as I from '../../interfaces/inderfaces';
import { AllUsersPopup } from '../popup/popup';
import { lowerTheScrollDown } from '../../jsScripts';

const Messenger: React.FC = (props) => {
	const [isToggleAllUserPopup = false, setIsToggleAllUserPopup] = React.useState();
	const [allMessages, setAllMessages] = React.useState([]);
	const [threadId, setThreadId] = React.useState('');
	const [_timerID, setTimerID] = React.useState() as any;
	const [showUserInfo, serShowUserInfo] = React.useState({});

	const showAllUserPopup = (): void => {
		setIsToggleAllUserPopup(!isToggleAllUserPopup);
		console.log(isToggleAllUserPopup);
	}

	const createNewChat = async (id: string) => {
		let idThread = await dashboardApi.createNewThreads(id)
		.then(data => data._id)
		console.log('createNewChat', id)
		await setIsToggleAllUserPopup(!isToggleAllUserPopup);
	}

	// const getAllMessages = async (id: string) => {
	// 	clearInterval(_timerID)
	// 	let arrayMessages = await dashboardApi.getAllMessageByThread(id).then(data => data);
	// 	await setAllMessages(prev => arrayMessages)
	// 	await setThreadId(prev => id)
	// 	let timerID = await setInterval(() => {
	// 		dashboardApi.getAllMessageByThread(id)
	// 		.then(data => {
	// 			if(data.length !== allMessages.length) {
	// 				setAllMessages(prev => data)
	// 			}
	// 		})
	// 	}, 1000)
	// 	await setTimerID(prev => timerID)
	// }
	const showUserInfoFromLeftListHeandler = async (user: object[], id: string) =>{
		clearInterval(_timerID)	
		await serShowUserInfo(prev => user);
		

		let arrayMessages = await dashboardApi.getAllMessageByThread(id).then(data => data);
		await setAllMessages(prev => arrayMessages)
		await setThreadId(prev => id)
		let timerID = await setInterval(() => {
			dashboardApi.getAllMessageByThread(id)
			.then(data => {
				if(data.length !== allMessages.length) {
					setAllMessages(prev => data)
				}
			})
		}, 1000)
		await setTimerID(prev => timerID)
	}

	return (
		<div className="inner">
			<MessHeader />
			{isToggleAllUserPopup? <AllUsersPopup createNewChat={createNewChat} isToggleAllUserPopup={showAllUserPopup}/> : null}
			<div className="messenger">
				<MessContacts 
					showUserHeandler={showUserInfoFromLeftListHeandler}
					isToggleAllUserPopup={showAllUserPopup}
					//showMessages={getAllMessages}
				/>
				<MessChat 
 					messages={allMessages}
 					threadId={threadId}
				/>
				<MessInterlocutorInfo 
					showUserInfo={showUserInfo}
				/>
			</div>
		</div>
	);
}

const MessHeader: React.FC = () => {
	return (
		<div className="body_header">
			<div className="body_header_widget">
				<div className="body_header_widget_inbox item"><button><i className="icon-download2"></i>Inbox</button></div>
				<div className="body_header_widget_sent item"><button><i className="icon-send"></i>Sent</button></div>
				<div className="body_header_widget_trash item"><button><i className="icon-bin2"></i>Trash</button></div>
			</div>
			<div className="body_header_filter">
				<span>Filter messages:</span>
				<button>Date<img src={require('../../assets/img/widget/chevron-down_(1).png').default} alt="" /></button>
			</div>
		</div>
	);
}

const MessContacts: React.FC<I.MessengerPropsForMessContacts> = (props) => {

	const [contacts, setContacts] = React.useState([]);

	const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]') as any;
	const userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]') as any;

    React.useEffect(() => {
		console.log('useEffect');

		dashboardApi.getAllThreads()
		.then(data => {
			setContacts(data);
			return data;
		})
		.then((threads) => {
			let user = allUsers.filter(user => {
				let user1 = threads[0].users.filter(user => user._id !== userInfo._id)
				return user._id === user1[0]._id
			});
			props.showUserHeandler(user[0], threads[0]._id)
		})

		timeInterval();
	}, [])

	const timeInterval = async () => {
		let timeID = await setInterval(async () => {
			await dashboardApi.getAllThreads()
			.then(data => {
				setContacts(data);

			})
		}, 1000);
	}


	return (
		<div className="messenger_contacts">
			<ul className="aside">

			{contacts.length === 0? <li>No data yet.</li> : contacts.map(thread => {

					let user = thread.users.filter(user => user._id !== userInfo._id)

				return (
					<li className="messenger_contacts_item" key={thread._id} 
							onClick={() => {
								console.log('contact',thread._id)
								props.showUserHeandler(user[0], thread._id);
								//props.showMessages(thread._id);

								setTimeout(() => {
									lowerTheScrollDown();
								}, 500)
									
							}} >
						<div className="messenger_contacts_item_user">
							<div className="messenger_contacts_item_inner">
								<div className="messenger_contacts_item_user_photo">
									<img src={require('../../assets/img/messenger/avatar.png').default} alt="avatar" />
								</div>
								<div className="messenger_contacts_item_user_name">
									{user[0].name}
								</div>
							</div>

							<div className="messenger_contacts_item_date">
								{dateModification.timeSpend(thread.updated_at)}
							</div>
						</div>

						<div className="messenger_contacts_item_last-letter">
							{thread.message === null? 'No messages yet.' : thread.message.body}
						</div>
					</li>
				);
			})}	

			</ul>

			<div className="messenger_contacts_new-coversation">
				<a onClick={props.isToggleAllUserPopup} className="btn_new-coversation"><span>+</span>New coversation</a>
			</div>
		</div>
	);
}

const MessAllUsers: React.FC = () => {
	return (
		<div className="popup">
			<div className="users">
				<div className="overlay_menu_btn_close" id="closePopup"></div>
				<h2>Users</h2>
				<table className="table" id="btnTableUsers">
					<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
					</tr>
					<ListAllUsers />
					</thead>
				</table>
				<div className="users_inner">
					<button id="createNewChat" >Creat chat with</button> <span className="Recipient"></span>
				</div>
			</div>
		</div>
	);
}

const ListAllUsers: React.FC = () => {
	return (
		<tbody>
			<tr>
				<td>
					Roma
				</td>
				<td>
					roma@gmail.com
				</td>
			</tr>
		</tbody>
	);
}


const MessChat: React.FC<I.MessengerPropsForMessChat> = (props) => {
	const userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]') as any;
	const [message, setMessage] = React.useState('');


	const sendMessage = (event: React.KeyboardEvent | any) => {
		if(event.key === 'Enter') {
			dashboardApi.sendMessage(props.threadId, message)
			.then(data => {
				console.log(data)
				setMessage('')
			})
		}
	}

	const messageHeandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
		setMessage(event.target.value)
	}
	
	return (
		<div className="messenger_chat">

			<div className="messenger_chat_inner">
			{props.messages.length === 0? <p>No messages yet.</p> :
				props.messages.map(mess => {
	
					return (mess.user._id === userInfo._id)? <MessChatSender key={mess._id} message={mess}/>
							: <MessChatRecipient key={mess._id} message={mess}/>
				})
			}
				
			</div>

			<div className="messenger_chat_write_message">
		
			    <textarea className="messenger_chat_write_message_textarea" 
			    	onChange={messageHeandler}
			    	onKeyPress={sendMessage}
			    	value={message} 
			    	>
			    </textarea>
			</div>
		</div>
	);
}

const MessChatSender: React.FC<I.Message> = ({ message }) => {
	return (
		<div className="messenger_chat_sender">
			<div className="messenger_chat_sender_mess">
				<div className="messenger_chat_sender_mess_text">
					{message.body}
				</div>
				<div className="messenger_chat_sender_avatar">
					<img src={require('../../assets/img/messenger/avatar.png').default} alt="" />
				</div>
			</div>
			<div className="messenger_chat_sender_mess_date">
				{dateModification.timeSpend(message.created_at)}
			</div>
		</div>
	);
}

const MessChatRecipient: React.FC<I.Message> = ({ message }) => {
	return (
		<div className="messenger_chat_recipient">
		
			<div className="messenger_chat_recipient_mess">

				<div className="messenger_chat_recipient_avatar">
					<img src={require('../../assets/img/messenger/avatar.png').default} alt="" />
				</div>
				<div className="messenger_chat_recipient_mess_text">
					{message.body}
				</div>
			</div>
			<div className="messenger_chat_recipient_mess_date">
				{dateModification.timeSpend(message.created_at)}
			</div>
		</div> 
	);
}

const MessInterlocutorInfo: React.FC<I.MessengerPropsForMessInterlocutor> = (props) => {
	const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]') as any;
	
	let user = allUsers.filter(user => user._id === props.showUserInfo._id)

	return (
		<div className="messenger_interlocutor-info">
			{user.length === 0? <p>Loading</p> :
				(<>
					<div className="messenger_interlocutor-info_photo">
						<img src={require('../../assets/img/messenger/avatar.png').default} alt="" />
					</div>
					<div className="messenger_interlocutor-info_name">
						{user[0].name}
					</div>
					<div className="messenger_interlocutor-info_position">
						{user[0].position}
					</div>
					<div className="messenger_interlocutor-info_specific">
						{user[0].description} Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.
					</div>
					<div className="messenger_interlocutor-info_email">
						<span>Email</span>
						{user[0].email}
					</div>
					<div className="messenger_interlocutor-info_phone">
						<span>Phone</span>
						{user[0].phone}
					</div>
					<div className="messenger_interlocutor-info_adress">
						<span>Adress</span>
						{user[0].address}
					</div>
					<div className="messenger_interlocutor-info_organization">
						<span>Organization</span>
						{user[0].organization}
					</div>
				</>)
			}
		</div>
	);
}


export default Messenger;
