import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reduxPromise from 'redux-promise';
import { Router, Route, hashHistory,browserHistory, Link, IndexRoute } from 'react-router'
import App from './components/app';
import PostsList from './components/posts-list';
import PostsCreate from './components/posts-create';
import PostDetail from './components/post-detail';
import reducers from './reducers';
import authWrapper from './components/hoc/authentication';


const createStoreWithMiddleware = applyMiddleware(thunkMiddleware,reduxPromise, createLogger())(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
    	<Route path="/" component={App}>
    		<IndexRoute component={PostsList} />
    		<Route path="posts/new" component={authWrapper(PostsCreate)}/>
    		<Route path="/posts/:postId" component={PostDetail}/>
    	</Route>
    </Router>
  </Provider>
  , document.querySelector('#root'));
