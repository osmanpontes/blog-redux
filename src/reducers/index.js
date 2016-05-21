import { combineReducers } from 'redux';
import {REQUEST_POSTS, RECEIVE_POSTS, CREATE_POST,
	 	SELECT_POST, DELETE_POST, FLASH_MESSAGE, LOGIN_USER} from '../actions';
import {reducer as formReducer} from 'redux-form';


function findIndexOfId(items, id){
	var index = -1;
	for(var i = 0; i<items.length; i+=1){
		if(items[i].id === id){
			return i;
		}
	}

	return index;
}

const initialListOfPosts = {isLoading:false, posts:[], receivedAt:null, modalPost:null};
function listOfPosts (state = initialListOfPosts, action){
	if(action.type === REQUEST_POSTS){
		return {...state, isLoading:true};
	}else if(action.type === RECEIVE_POSTS){
		return {
			isLoading:false,
			posts:action.posts,
			receivedAt:action.receivedAt,
			modalPost:null
		};
	}else if(action.type === CREATE_POST){
		return {...state, posts:[action.post, ...state.posts]};
	}else if(action.type === SELECT_POST){
		return {...state, modalPost:action.post};
	}else if(action.type === DELETE_POST){
		
		//no redux-promise, o action.payload ja vem com o resutado do axios.delete request resolvido
		//isto e, action.payload passa a ser o response
		const {posts} = state;
		const deletedPost = action.payload.data;
		let indexToDelete = findIndexOfId(posts,deletedPost.id);
		if(indexToDelete === -1){
			return state;
		}else{
			let newPosts = posts.slice(0,indexToDelete).concat(posts.slice(indexToDelete + 1, posts.length))
			return {...state, posts:newPosts}
		}

	}
	else{
		return state;
	}
}

const initialFlashState = {  
	message: null,
  className: null
}

const flashMessage = (state = initialFlashState, action) => {  
  switch(action.type){
    case FLASH_MESSAGE:
      return action.message;
    default:
      return state;
  }
};

const isAuthenticated = (state = false, action) => {
	switch(action.type){
		case LOGIN_USER:
			return action.isAuthenticated;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
  listOfPosts,
  isAuthenticated,
  form: formReducer,
  flashMessage
});

export default rootReducer;
