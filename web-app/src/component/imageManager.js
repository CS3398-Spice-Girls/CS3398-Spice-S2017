import lake from './lake.jpg';

var React = require('react');
var Dropzone = require('react-dropzone');
var request = require('superagent')

class ImageManager extends React.Component {
	constructor(props){
			super(props)	
			this.state ={ uploadedFile: ''}
	}

	getInitialState(){
		return { uploadedFile: '' }
	}

	onImageDrop(files) {
		this.setState({ uploadedFile: URL.createObjectURL(files[0])});
	}

	render(){
		if (this.state.uploadedFile === '')
			return (
				<Dropzone
					multiple={false}
					accept="image/*"
					onDrop={this.onImageDrop.bind(this)}>
					<p>Drop an image or click to select a file to upload.</p>
				</Dropzone>
				);
		else
			return (
				<div id="imageManager">
					<img src={ this.state.uploadedFile} />
				</div>
			);
	}
}

module.exports = ImageManager;
