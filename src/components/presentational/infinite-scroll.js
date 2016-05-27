import React, {Component} from 'react';
import Loader from 'react-loader';

//funcao declarada como global para poder ser reaproveitada nos metodos
//componentDidMount e componentDidUpdate

export default class InfiniteScroll extends Component {

  constructor(props) {
    super(props);
    this._onscroll = this.onscroll.bind(this);
  }

  onscroll(e) {
    const {onInfiniteScroll, isLoading} = this.props;

    if (this.wasReached() && !isLoading) {
      window.removeEventListener('scroll', onscroll);
      onInfiniteScroll();
    }
  }

  wasReached() {
    const containerRef = this.refs.infiniteContainer;
    return (window.innerHeight + window.scrollY >= containerRef.offsetTop);
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.isLoading) {
      window.addEventListener('scroll', this._onscroll);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onscroll);
  }

  componentDidMount() {
    window.addEventListener('scroll', this._onscroll);
  }

  render() {
    return (
      <div ref="infiniteContainer">
        <h2 className="text-center">
          {(this.props.isLoading ? this.props.loadingText : '')}
        </h2>
      </div>
    );
  }

}

InfiniteScroll.propTypes = {
  isLoading: React.PropTypes.bool,
  onInfiniteScroll: React.PropTypes.func.isRequired,
  loadingText: React.PropTypes.string
};

InfiniteScroll.defaultProps = {
  isLoading: false,
  loadingText: '...Carregando'
};

