import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';
import {Link} from 'react-router';
import Loader from 'react-loader';
import DeleteModal from './delete-modal';





class PostsList extends Component{

  constructor(props) {
    super(props);
    this.state = {modalIsOpen:false, selectedPost:{}};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

	componentDidMount(){
		this.props.dispatch(fetchPosts());
	}

  openModal(post){
    this.setState({modalIsOpen: true, selectedPost:post});
  }

  closeModal(){
    this.setState({modalIsOpen: false});
  }


  renderPosts() {
    return this.props.list.posts.map((post) => {
      return (
        <li className="list-group-item row" key={post.id}>
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

    const {selectedPost, modalIsOpen} = this.state;

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
              
        <DeleteModal selectedPost={selectedPost}
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal} />

      </Loader>
    );
  }
	
}

function mapStateToProps(state){
	return {list: state.listOfPosts};
}

export default connect(mapStateToProps)(PostsList)
