import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {deletePost} from '../actions';
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

export default ({selectedPost, isOpen, onRequestClose }) => {
	return(
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}>

      <div className="modal-header">
        <button onClick={onRequestClose} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title">Deseja excluir o item selecionado?</h4>
      </div>

      <div>
        <h5 className="modal-title">{selectedPost.title}</h5>
        <h6>{selectedPost.categories}</h6>
        <p>Conteudo qualquer se houvesse, porem neste exemplo nao ha</p>
      </div>

      <div className="modal-footer">
        <button onClick={onRequestClose} type="button" className="btn btn-default">Fechar</button>
        <button type="button" className="btn btn-danger">Excluir</button>
      </div>
    </Modal>
	);
}





