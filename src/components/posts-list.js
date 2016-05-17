import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';
import {Link} from 'react-router';
import Loader from 'react-loader';

class PostsList extends Component{

	componentDidMount(){
		this.props.dispatch(fetchPosts());
	}


  renderPosts() {
    return this.props.list.posts.map((post) => {
      return (
        <li className="list-group-item row" key={post.id}>
          <Link to={"posts/" + post.id}>
            <span className="col-md-6">{post.categories}</span>
            <strong className="col-md-6">{post.title}</strong>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <Loader loaded={!this.props.list.isLoading}>
      <div className="container">
        <div className="row text-right">
          <Link to="/posts/new" className="btn btn-primary">
            Adicione um Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
			    <li className="list-group-item row">
			        <strong className="col-md-6">Categorias</strong>
			        <strong className="col-md-6">Titulo</strong>
			    </li>
          {this.renderPosts()}
        </ul>
      </div>
      </Loader>
    );
  }
	
}

function mapStateToProps(state){
	return {list: state.listOfPosts};
}

export default connect(mapStateToProps)(PostsList)
