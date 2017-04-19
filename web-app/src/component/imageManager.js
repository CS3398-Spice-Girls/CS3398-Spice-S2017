var React = require('react');
var Dropzone = require('react-dropzone');
import Dispatcher from '../data/dispatcher.js';
import PaletteStore from '../data/store';

class ImageManager extends React.Component {
	constructor(props){
		super(props)
		this.state = {uploadedFile:''}
	}

	onImageDrop(files) {
		Dispatcher.dispatch({
		actionName: 'uploadImage',
		file: files[0]
	})

		this.setState({ uploadedFile: PaletteStore.imageUrl });
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
			<Dropzone
				className="dropzone"
				activeClassName="dropzone-active"
				rejectClassName="dropzone-reject"
				multiple={false}
				accept="image/*"
				disableClick
				onDrop={this.onImageDrop.bind(this)}>
				<div id="imageManager">
					<img alt="" src={ this.state.uploadedFile} />
				</div>
			</Dropzone>
		);
	}
}

module.exports = ImageManager;
