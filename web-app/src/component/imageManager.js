var React = require('react');
var Dropzone = require('react-dropzone');
import Dispatcher from '../data/dispatcher.js';
import PaletteStore from '../data/store';

class ImageManager extends React.Component {
	constructor(props){
		super(props)
		this.state = {uploadedFile:''}
	}

	componentDidUpdate() {
        this.updateCanvas();
    }

  updateCanvas() {
        const vas = this.refs.canvas;
				var img = new Image();
		      // declare a function to call once the image has loaded
		      img.onload = function(){
						vas.width = img.width;
						vas.height = img.height;
						vas.getContext('2d').drawImage(img, 0,0,);
           }
				img.src = this.state.uploadedFile;


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
					<canvas ref="canvas"/>
				</div>
			</Dropzone>
		);
	}
}
//<img alt="" src={ this.state.uploadedFile} />
module.exports = ImageManager;
