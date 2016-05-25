import fetch from 'isomorphic-fetch';
import axios from 'axios';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const REQUEST_MORE_POSTS = 'REQUEST_MORE_POSTS';
export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_MORE_POSTS = 'RECEIVE_MORE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const SELECT_POST = 'SELECT_POST';
export const FLASH_MESSAGE = 'FLASH_MESSAGE';
export const LOGIN_USER = 'LOGIN_USER';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=programadorobjetivo';


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

export function requestMorePosts(){
	return {
		type:REQUEST_MORE_POSTS
	}
}

export function receivePosts(jsonData){
	var receivedAt = new Date();
	console.log('posts jsonData', jsonData);
	var posts = jsonData;
	return {
		type: RECEIVE_POSTS,
		posts,
		receivedAt
	}
}

export function receiveMorePosts(jsonData){
	var receivedAt = new Date();
	var posts = jsonData;
	return {
		type: RECEIVE_MORE_POSTS,
		posts,
		receivedAt
	}
}

export function submitNewPost(post){
	return (dispatch) => {
		return axios.post('http://reduxblog.herokuapp.com/api/posts?key=programadorobjetivo', post)
		  .then(function (response) {
		  	//response.data corresponde ao post recem-criado, porem com a propriedade id tambem preenchida
		  	//isso eh importante para que ao salvar a pagina que lista os posts tenham o id do novo post para
		  	//fazer o Link correto
		    dispatch(createPost(response.data));
		  })
	}
}

export function selectPost(post){
	return {
		type: SELECT_POST,
		post
	};
}

function createPost(post){
	return {
		type:CREATE_POST,
		post
	};

}

export function deletePost(post) {
  const request = axios.delete(`${ROOT_URL}/posts/${post.id}${API_KEY}`);

  return {
    type: DELETE_POST,
    payload: request
  };
}


export function fetchPosts() {

  return function (dispatch, getState) {
  	const currentState = getState();
  	//se a lista de posts ainda nao foi carregada
  	if(!currentState.listOfPosts.receivedAt){
	  	dispatch(requestPosts());
	    return fetch('http://reduxblog.herokuapp.com/api/posts?key=programadorobjetivo')
	    	.then(response => response.json())
	    	.then(jsonData => dispatch(receivePosts(jsonData)) )
  	}

  };
}

//o ideal eh que possam ser especificados a pagina e a quantidade de items por pagina
//o que trabalhando com uma api mais completa seria possivel
export function fetchMorePosts(page,numberPerPage) {

  return function (dispatch) {
  	dispatch(requestMorePosts());
    return fetch('http://reduxblog.herokuapp.com/api/posts?key=programadorobjetivo')
    	.then(response => response.json())
    	.then(jsonData => dispatch(receiveMorePosts(jsonData)) )

  };
}

export function sendFlashMessage (text, className){

  return {
    type: FLASH_MESSAGE,
    message: {
      text,
      className
    }
  }
};

export function login(loggedIn){
	return {
		type:LOGIN_USER,
		isAuthenticated:loggedIn
	};
}




