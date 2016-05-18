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
    this.state = {modalIsOpen:false, selectedPost:{}};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
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

  afterOpenModal(){
       // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
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
                 
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}>

            <div className="modal-header">
              <button onClick={this.closeModal} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Deseja excluir o item selecionado?</h4>
            </div>

            <div>
              <h5 className="modal-title">{selectedPost.title}</h5>
              <h6>{selectedPost.categories}</h6>
              <p>Conteudo qualquer se houvesse, porem neste exemplo nao ha</p>
            </div>

            <div className="modal-footer">
              <button onClick={this.closeModal} type="button" className="btn btn-default">Fechar</button>
              <button type="button" className="btn btn-danger">Excluir</button>
            </div>
          </Modal>
      </Loader>
    );
  }
	
}

function mapStateToProps(state){
	return {list: state.listOfPosts};
}

export default connect(mapStateToProps)(PostsList)
