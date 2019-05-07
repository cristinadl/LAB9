const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let postSchema = mongoose.Schema({
    // id : {type : String, required : true, unique: true},
    title : {type : String, required : true},
    content: {type : String, required : true},
    author : {type : String, required : true},
	publishDate : {type : Date, required : true}
})

let Posts = mongoose.model('posts', postSchema);

const ListPosts = {

    get: function() {
        return Posts.find()
            .then(posts => {
                return posts
            })
            .catch(err => {
                throw new Error(err)
            })
    },


    getByAuthor: function (author) {
        return Posts.find({author : author})
			.then(posts => {
				if (posts){
					return posts;
				}
			})
			.catch(err =>{
				throw new Error(err);
			});
    },



    getByID : function(id) {
        return Posts.find({_id : id})
			.then(post => {
				if (post){
					return post;
				}
			})
			.catch(err =>{
				throw new Error(err);
			});
    },


    post: function(newPost) {
        return Posts.create(newPost)
			.then(post => {
				return post;
			})
			.catch(err => {
				 throw new Error(err);
			});
    },



    put: function (id, newPost) {
        return Posts.findOneAndUpdate({_id : id}, { $set: newPost }, { new: false })
			.then(post => {
				if (post){
					return post;
				}
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
	
	delete: function(id) {
        return Posts.findOneAndRemove({_id : id})
			.then(post => {
				return post
			})
			.catch(err => {
				throw new Error(err);
			})
    }
}

module.exports = { ListPosts }
