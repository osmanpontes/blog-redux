import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { submitNewPost } from '../actions/index';
import { Link } from 'react-router';

class PostsCreate extends Component {

  constructor(props) {
    super(props);

  }

  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(form) {
  	
  	var that = this;
  	
		return this.props.submitNewPost(form).then(function(){
			that.context.router.push('/');
		})

  }

  render() {
    const { fields: { title, categories, content }, handleSubmit, submitting } = this.props;
    const btnStyle = {margin:'10px'};
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Crie um novo Post</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Titulo</label>
          <input type="text" className="form-control" {...title} />
          <div className="error-messages">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categorias</label>
          <input type="text" className="form-control" {...categories} />
          <div className="error-messages">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Conteudo</label>
          <textarea className="form-control" {...content} />
          <div className="error-messages">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" style={btnStyle} className="btn btn-primary" disabled={submitting}>Salvar</button>
        <Link style={btnStyle} to="/" className="btn btn-danger">Cancelar</Link>
      </form>
    );
  }
}

PostsCreate.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Campo Obrigatorio';
  }
  if (!values.categories) {
    errors.categories = 'Campo Obrigatorio';
  }
  if(!values.content) {
    errors.content = 'Campo Obrigatorio';
  }

  return errors;
}


// similar to connect: http://redux-form.com/5.2.3/#/api/reduxForm?_k=r222sz
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsCreateForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, {submitNewPost})(PostsCreate);