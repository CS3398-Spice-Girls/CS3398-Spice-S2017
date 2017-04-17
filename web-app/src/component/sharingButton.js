var React = require('react');
//var CopyToClipboard = require('react-copy-to-clipboard');

class SharingButton extends React.Component{
	constructor(props){
		super(props);
	}

	copyHex(){
		window.prompt("Copy to clipboard", Object.values(this.props.app.palette).join(', '))
	}

	copyRGB(){
		var RGBValues = []
		Object.values(this.props.app.palette).forEach((hex) => {
			RGBValues.push(this.hexToRGB(hex))
		})
		console.log(RGBValues);
		window.prompt("Copy to clipboard", RGBValues.join(', '))
	}

	hexToRGB(hex){
		hex = hex.replace('#','');
		var r = parseInt(hex.substring(0, hex.length/3), 16);
		var g = parseInt(hex.substring(hex.length/3, 2*hex.length/3), 16);
		var b = parseInt(hex.substring(2*hex.length/3, 3*hex.length/3), 16);

		return 'rgba(' + r + ',' + g + ',' + b + ')';
	}

	render(){
		return(
			<div id="share-flyout">
				<button className="flyout-button" id="copy-rgb" onClick={this.copyRGB.bind(this)}>RGB</button>
				<button className="flyout-button" id="copy-hex" onClick={this.copyHex.bind(this)}>Hex</button>
				<button className="flyout-button" id="copy-img">Image</button>
				<button id="share-button">Share</button>
			</div>
		);
	}
}

module.exports = SharingButton;