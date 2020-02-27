
	 function lowerTheScrollDown() {
	 	let inner = document.querySelector('.messenger_chat_inner')
	 	if(inner !== null) {
	 			inner.scrollTop = inner.scrollHeight
	 	}
	 }

	 export { lowerTheScrollDown };
