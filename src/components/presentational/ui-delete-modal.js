import React from 'react';
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

export default ({onCloseModal, onDeletePost, submitting, isOpen, title, categories}) => {


	return(
    <Modal
	      isOpen={isOpen}
	      style={customStyles}>

		  <div className="modal-header">
		    <button onClick={onCloseModal} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		    <h4 className="modal-title">Deseja excluir o item selecionado?</h4>
		  </div>

		  <div>
		    <h5 className="modal-title">{title}</h5>
		    <h6>{categories}</h6>
		    <p>Conteudo qualquer se houvesse, porem neste exemplo nao ha</p>
		  </div>

		  <div className="modal-footer">
		    <button disabled={submitting} onClick={onCloseModal} type="button" className="btn btn-default">Fechar</button>
		    <button disabled={submitting} onClick={onDeletePost} type="button" className="btn btn-danger">Excluir</button>
		  </div>

		</Modal>
	);
}