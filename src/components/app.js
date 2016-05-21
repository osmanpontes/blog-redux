import React from 'react';
import { Component } from 'react';
import FlashMessage from './flash-message';
import Navigation from './presentational/navigation';

export default class App extends Component {
  render() {
    return (
      <div>
	      <Navigation/>
				<FlashMessage />
				{this.props.children}
			</div>
    );
  }
}
