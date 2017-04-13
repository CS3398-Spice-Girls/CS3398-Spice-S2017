var React = require('react');
var Dropzone = require('react-dropzone');

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
					className="dropzone"
					activeClassName="dropzone-active"
					rejectClassName="dropzone-reject"
					multiple={false}
					accept="image/*"
					onDrop={this.onImageDrop.bind(this)}>
					<p className={"centered"}>Drop an image or click to select a file to upload.</p>
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
