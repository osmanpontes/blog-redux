import fetch from 'isomorphic-fetch';
import axios from 'axios';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';


export function requestPost(post){
	return {
		type:REQUEST_POST,
		post
	}
}

export function requestPosts(){
	return {
		type:REQUEST_POSTS	
	};
}

export function receivePosts(jsonData){
	var receivedAt = new Date();
	// var posts = jsonData.data.children.map(post=>post.data);
	console.log('posts jsonData', jsonData);
	var posts = jsonData;
	return {
		type: RECEIVE_POSTS,
		posts,
		receivedAt
	}
}

export function createPost(post){
	return {
		type:CREATE_POST,
		post
	}
}

export function deletePost(post){
	return {
		type:DELETE_POST,
		post
	}
}

export function fetchPosts(post) {

  return function (dispatch) {
  	dispatch(requestPosts());
    return fetch('http://reduxblog.herokuapp.com/api/posts?key=programadorobjetivo')
    	.then(response => response.json())
    	.then(jsonData => dispatch(receivePosts(jsonData)) )
  };
}





