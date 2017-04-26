var React = require('react');
import Dispatcher from '../data/dispatcher.js';
import PaletteStore from '../data/store';
import PaletteEmmiter from '../data/emmiter.js';

class AutoGenerateButton extends React.Component{

	constructor(props){
		super(props);
		this.state = {count: 4, disabled: true };
		PaletteEmmiter.on('imageUploaded', this.enableButton.bind(this))
	}

	enableButton(){
		this.setState({ disabled: PaletteStore.imageUrl.trim().length === 0 })
	}

	onClick(){
		Dispatcher.dispatch({
			'actionName': 'autoCall',
			numColors: this.state.count
		})
	}

	decrease(){
		this.setState({count: Math.max(1, this.state.count - 1)});
	}

	increase(){
		this.setState({count: this.state.count + 1});
	}

	render(){
		return(
			<div className={["flyout", (this.state.disabled ? 'disabled' : '')].join(' ')} id="auto-flyout">
				<button id="auto-button" disabled={this.state.disabled} onClick={this.onClick.bind(this)} >Auto</button>
				<button className="flyout-button" id="decrease" onClick={this.decrease.bind(this)}>-</button>
				<input className="flyout-input" type="text" value={this.state.count} readOnly contentEditable />
				<button className="flyout-button" id="increase" onClick={this.increase.bind(this)}>+</button>
			</div>
		);
	}

}

module.exports=AutoGenerateButton;