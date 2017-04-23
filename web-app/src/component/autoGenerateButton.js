var React = require('react');
import Dispatcher from '../data/dispatcher.js';
import PaletteStore from '../data/store';

class AutoGenerateButton extends React.Component{

	constructor(props){
		super(props);
		this.state = {count: 4};

	}

	onClick(){
		Dispatcher.dispatch({
			'actionName': 'autoCall',
			numColors: this.state.count
		})
	}

	decrease(){
		this.setState({count: this.state.count - 1});
	}

	increase(){
		this.setState({count: this.state.count + 1});
	}

	render(){
		return(
			<div className = "flyout" id="auto-flyout">
				<button id="auto-button"  onClick={this.onClick.bind(this)}  >Auto</button>
				<button className = "flyout-button" id="decrease" onClick={this.decrease.bind(this)}>-</button>
				<input type="text" className = "flyout-button" value={this.state.count} contenteditable />
				<button className = "flyout-button" id="increase" onClick={this.increase.bind(this)}>+</button>
			</div>
		);
	}

}

module.exports = AutoGenerateButton;