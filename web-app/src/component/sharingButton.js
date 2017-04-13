var React = require('react');
//var CopyToClipboard = require('react-copy-to-clipboard');

class SharingButton extends React.Component{
	constructor(props){
		super(props);
	}

	copy(){
		window.prompt("Copy to clipboard", Object.values(this.props.app.palette).join(', '))
	}

	render(){
		return(
			<div id="copy">
				<button onClick={this.copy.bind(this)} >Copy</button>
     	</div>
		);
	}
}

module.exports = SharingButton;
