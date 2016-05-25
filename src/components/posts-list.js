import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts, selectPost, fetchMorePosts} from '../actions';
import {Link} from 'react-router';
import Loader from 'react-loader';
import DeleteModal from './delete-modal';
import InfiniteScroll from './presentational/infinite-scroll';





class PostsList extends Component{

  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.loadMorePosts = this.loadMorePosts.bind(this);
  }

	componentDidMount(){
		this.props.dispatch(fetchPosts());
	}

  openModal(post){
    this.props.dispatch(selectPost(post));
  }

  loadMorePosts(){
    this.props.dispatch(fetchMorePosts());
  }


  renderPosts() {
    return this.props.list.posts.map((post) => {
      return (
        <li className="list-group-item row">
          <button className="col-md-1" onClick={()=>this.openModal(post)}><i style={ {paddingRight:'7px'} } className="fa fa-trash-o"></i>Excluir</button>
          <span className="col-md-5 col-md-offset-1">{post.categories}</span>
          <Link to={"posts/" + post.id}>
            <strong className="col-md-5">{post.title}</strong>
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
  			        <strong className=" col-md-offset-2 col-md-5">Categorias</strong>
  			        <strong className="col-md-5">Titulo</strong>
  			    </li>
            {this.renderPosts()}
          </ul>
        </div>
        
        <InfiniteScroll onInfiniteScroll={this.loadMorePosts} isLoading={this.props.list.isLoadingMore} />

        <DeleteModal/>

      </Loader>
    );
  }
	
}

function mapStateToProps(state){
	return {list: state.listOfPosts};
}

export default connect(mapStateToProps)(PostsList)
