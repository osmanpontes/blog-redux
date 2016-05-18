import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectPost, deletePost} from '../actions';
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

class DeleteModal extends Component{

	constructor(props){
		super(props);
		this.state = {submitting:false};
		this.closeModal = this.closeModal.bind(this);
		this.deletePost = this.deletePost.bind(this);

	}

	closeModal(){
		this.props.selectPost(null);
	}

	deletePost(post){
		this.setState({submitting:true});
		this.props.deletePost(post)
			.then((result)=>{
				//o result eh objeto com propriedades type e payload onde payload eh o response da solcitacao
				this.props.selectPost(null);
		})
	}

	render(){

		const {selectedPost} = this.props;
		var title = "",
		categories ="";

		if(selectedPost){
			title = selectedPost.title;
			categories = selectedPost.categories;
		}

		return(

	    <Modal
	      isOpen={selectedPost!==null}
	      style={customStyles}>

	      <div className="modal-header">
	        <button onClick={this.closeModal} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 className="modal-title">Deseja excluir o item selecionado?</h4>
	      </div>

	      <div>
	        <h5 className="modal-title">{title}</h5>
	        <h6>{categories}</h6>
	        <p>Conteudo qualquer se houvesse, porem neste exemplo nao ha</p>
	      </div>

	      <div className="modal-footer">
	        <button disabled={this.state.submitting} onClick={this.closeModal} type="button" className="btn btn-default">Fechar</button>
	        <button disabled={this.state.submitting} onClick={() => this.deletePost(selectedPost)} type="button" className="btn btn-danger">Excluir</button>
	      </div>
	    </Modal>
		);
	}
}

function mapStateToProps(state){
	return {selectedPost: state.listOfPosts.modalPost};
}

export default connect(mapStateToProps, {selectPost, deletePost})(DeleteModal)



