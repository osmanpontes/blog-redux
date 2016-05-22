import React, {Component} from 'react';  
import {connect} from 'react-redux';
import { submitNewPost, sendFlashMessage } from '../actions/index';

class FlashMessage extends Component{

	close(){
		this.props.sendFlashMessage(null, null);
	}

  render(){
    const {text, className} = this.props.flashMessage;
    if(!text){
      return null;
    }

    //para que possa fechar sem intervencao do usuario apos 1 segundo
    //sugestao de melhoria: tornar o tempo um parametro no reducer para que fique parametrizado
    setTimeout(()=>{this.close()},1500);

    return (
      <div className="row">
        <div 
        className={'col-md-10 col-centered alert ' + className} 
        role="alert">
        <button onClick={this.close.bind(this)} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          {text}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({flashMessage}) => {  
  return {flashMessage};
};

export default connect(mapStateToProps, {sendFlashMessage})(FlashMessage);