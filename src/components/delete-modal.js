import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectPost, deletePost} from '../actions';
import UiDeleteModal from './presentational/ui-delete-modal';



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

	deletePost(){
		let postToDelete = this.props.selectedPost;
		this.setState({submitting:true});
		this.props.deletePost(postToDelete)
			.then((result)=>{
				//o result eh objeto com propriedades type e payload onde payload eh o response da solcitacao
				this.setState({submitting:false});
				this.closeModal();
		});
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
			<UiDeleteModal 
				onCloseModal={this.closeModal} 
				onDeletePost={this.deletePost} 
				submitting={this.state.submitting}
				isOpen={selectedPost!==null} 
				title={title} 
				categories={categories} />
		);
	}
}

function mapStateToProps(state){
	return {selectedPost: state.listOfPosts.modalPost};
}

export default connect(mapStateToProps, {selectPost, deletePost})(DeleteModal)



