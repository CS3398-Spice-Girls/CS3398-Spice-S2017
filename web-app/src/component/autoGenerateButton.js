var React = require('react');
import ImageManagerEmmiter from '../data/emmiter.js'

class AutoGenerateButton extends React.Component{

	onClick(){
		ImageManagerEmmiter.emit('autoGenerate');
	}

	render(){
		return(
			<button id="auto-button"  onClick={this.onClick.bind(this)}>Auto</button>
		);
	}

}

module.exports = AutoGenerateButton;