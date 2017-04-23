var React = require('react');
import AppDispatcher from '../data/dispatcher.js';

class ResetButton extends React.Component{
	onClick(){
		AppDispatcher.dispatch({
			actionName: 'resetPalette'
		})
	}

	render(){
		return(
			<button id="reset-button" onClick={this.onClick.bind(this)} >Reset</button>
		);
	}
}

module.exports = ResetButton;