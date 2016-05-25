import React, {Component} from 'react';
import Loader from 'react-loader';

export default class InfiniteScroll extends Component{

	constructor(props){
		super(props);
	}

	wasReached(){
		const containerRef = this.refs.infiniteContainer;
		console.log(containerRef.offsetTop);
		return (window.innerHeight + window.scrollY >= containerRef.offsetTop);
	}

	componentDidMount(){
		const {onInfiniteScroll, isLoading} = this.props;
		
		window.onscroll = function(ev) {
			console.clear();
			console.log('innerHeight',window.innerHeight);
			console.log('scrollY', window.scrollY);
			console.log('body offsetHeight', document.body.offsetHeight);

			//aqui o callback onInfiniteScroll esta sendo invocado diversas vezes mesmo com a condicao
			//de que nao esteja carregando. Isso porque isLoading eh uma propriedade de estado do redux
			//que demora mais pra ser atualizada que um novo listener de onscroll no objeto window
	    if (this.wasReached() && !isLoading) {
    			onInfiniteScroll();
	    }

		}.bind(this);

	}

	render(){
		return(
			<div ref="infiniteContainer" >
				<h2 className="text-center">
					{(this.props.isLoading ? this.props.loadingText : '')}
				</h2>
			</div>
		)
	}

}

InfiniteScroll.propTypes = {
	isLoading: React.PropTypes.bool,
	onInfiniteScroll: React.PropTypes.func.isRequired,
	loadingText: React.PropTypes.string
};

InfiniteScroll.defaultProps = {
	isLoading: false,
	loadingText: '...Careggando'
};

