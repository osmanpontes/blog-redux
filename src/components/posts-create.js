import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false
    };

  }

  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(form) {
  	console.log('props on submit', form);
  	this.setState({isSubmitting:true});
  	setTimeout(()=>{
  		this.setState({isSubmitting:false});
  		this.props.createPost(form);
  	}, 5000)
  	
  }

  render() {
  	console.log('props', this.props);
    const { fields: { title, categories, content }, handleSubmit, submitting } = this.props;
    const btnStyle = {margin:'10px'};
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Crie um novo Post</h3>

        <div className={`form-group`}>
          <label>Titulo</label>
          <input type="text" className="form-control" {...title} />
        </div>

        <div className={`form-group`}>
          <label>Categorias</label>
          <input type="text" className="form-control" {...categories} />
        </div>

        <div className={`form-group`}>
          <label>Conteudo</label>
          <textarea className="form-control" {...content} />
        </div>

        <button type="submit" style={btnStyle} className="btn btn-primary" disabled={this.state.isSubmitting}>Salvar</button>
        <Link style={btnStyle} to="/" className="btn btn-danger">Cancelar</Link>
        <p>Enviando: {submitting? "sim" : "nao"}</p>
        <p>Enviando2: {this.state.isSubmitting? "sim" : "nao"}</p>
      </form>
    );
  }
}

PostsCreate.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}


// similar to connect: http://redux-form.com/5.2.3/#/api/reduxForm?_k=r222sz
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsCreateForm',
  fields: ['title', 'categories', 'content']
}, null, {createPost})(PostsCreate);