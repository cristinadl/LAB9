
function displayPostList(data){

	$('.post-list').html("");

	for (let i = 0; i < data.posts.length; i ++){

		$('.post-list').append(`<li style="list-style-type: none;">
									<p>${data.posts[i].title} </p>
									<p> By: ${data.posts[i].author} </p>
									<p> ${data.posts[i].content}</p>
									<p> Date Published: ${data.posts[i].publishDate}</p>
									<p> ID: ${data.posts[i]._id}</p>
									<p style="color:blue;">_______________________________________________</p>
								  </li>`);
	}

}

function onload(){
	let url = 'blog-posts';
	let settings = {
		method : 'GET',
		headers : {
			'Content-Type' : 'application/json'
		}
	};

	fetch(url, settings)
		.then(response => {
			if (response.ok){
				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(responseJSON => {
			displayPostList(responseJSON);
		})
		.catch(err => {
			console.log(err);
		});
}

function addNewPost(title, author, content, date){

	let data = {
		title: title,
		author: author,
		content: content,
		publishDate: date
	};

	let url = 'blog-posts';
	let settings = {
						method : 'POST',
						headers : {
							'Content-Type' : 'application/json'
						},
						body : JSON.stringify(data)
					};

	fetch(url, settings)
		.then(response => {
			if (response.ok){
				return response.json();
			}
			else{
				return new Promise(function(resolve, reject){
					resolve(response.json());
				})
				.then(data =>{
					throw new Error(data.message);
				})
			}
		})
		.then(responseJSON => {
			$(onload)
		})
		.catch(err => {
			console.log(err);
		});
}

function editPost(id, title, author, content, date){

	var data = { }
    if (title) data.title = title
    if (author) data.author = author
    if (content) data.content = content

	console.log(data);

	let url = 'blog-posts/' + id;
	let settings = {
						method : 'PUT',
						headers : {
							'Content-Type' : 'application/json'
						},
						body : JSON.stringify(data)
					};

	fetch(url, settings)
		.then(response => {
			if (response.ok){
				return response.json();
			}
			else{
				return new Promise(function(resolve, reject){
					resolve(response.json());
				})
				.then(data =>{
					throw new Error(data.message);
				})
			}
		})
		.then(responseJSON => {
			$(onload)
		})
		.catch(err => {
			console.log(err);
		});
}

function deletePost(id) {
	let url = 'blog-posts/' + id;
	let settings = {
						method : 'DELETE',
						headers : {
							'Content-Type' : 'application/json'
						},
						body : JSON.stringify({id})
					};

	fetch(url, settings)
		.then(response => {
			if (response.ok){
				return response.json();
			}
			else{
				return new Promise(function(resolve, reject){
					resolve(response.json());
				})
				.then(data =>{
					throw new Error(data.message);
				})
			}
		})
		.then(responseJSON => {
			$(onload)
		})
		.catch(err => {
			console.log(err);
		});
}

function watchForm(){
    
	$('.postForm').on('submit', function(event) {
		event.preventDefault();
		let title = $('.postTitle').val();
		let author = $('.postAuthor').val();
		let content = $('.postContent').val();
		let date = Date()
		addNewPost(title, author, content, date);
    });
    $('.editForm').on('submit', function(event){
		event.preventDefault();
		let id = $('.editId').val()
		let title = $('.editTitle').val();
		let author = $('.editAuthor').val();
		let content = $('.editContent').val();
		let date = Date()
		editPost(id, title, author, content, date)
    });
	$('.deleteForm').on('submit', function(event){
		event.preventDefault();
		let id = $('.postId').val()
		deletePost(id)
    });
}

function init(){
	$(onload);
	$(watchForm);
}

$(init);
