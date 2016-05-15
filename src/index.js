import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, hashHistory,browserHistory, Link, IndexRoute } from 'react-router'
import App from './components/app';
import PostsList from './components/posts-list';
import PostsCreate from './components/posts-create';
import PostDetail from './components/post-detail';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
    	<Route path="/" component={App}>
    		<IndexRoute component={PostsList} />
    		<Route path="/new" component={PostsCreate}/>
    		<Route path="/posts/:postId" component={PostDetail}/>
    	</Route>
    </Router>
  </Provider>
  , document.querySelector('#root'));
