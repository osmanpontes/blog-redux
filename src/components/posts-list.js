import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';
import {Link} from 'react-router';
import Loader from 'react-loader';
import Modal from 'react-modal';



const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class PostsList extends Component{

  constructor(props) {
    super(props);
    this.state = {modalIsOpen:false};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

	componentDidMount(){
		this.props.dispatch(fetchPosts());
	}

  openModal(){
    this.setState({modalIsOpen: true});
  }

  closeModal(){
    this.setState({modalIsOpen: false});
  }

  afterOpenModal(){
       // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
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
                 <button onClick={this.openModal}>Open Modal</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}>

            <h2 ref="subtitle">Hello</h2>
            <button onClick={this.closeModal}>close</button>
            <div>I am a modal</div>
            <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form>
          </Modal>
      </Loader>
    );
  }
	
}

function mapStateToProps(state){
	return {list: state.listOfPosts};
}

export default connect(mapStateToProps)(PostsList)
