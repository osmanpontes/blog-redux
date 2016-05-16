import { combineReducers } from 'redux';
import {REQUEST_POSTS, RECEIVE_POSTS} from '../actions'

const initialListOfPosts = {isLoading:false, posts:[], receivedAt:null}
function listOfPosts (state = initialListOfPosts, action){
	if(action.type === REQUEST_POSTS){
		return {...state, isLoading:true};
	}else if(action.type === RECEIVE_POSTS){
		return {
			isLoading:false,
			posts:action.posts,
			receivedAt:action.receivedAt
		};
	}
	else{
		return state;
	}
}

const rootReducer = combineReducers({
  listOfPosts
});

export default rootReducer;
