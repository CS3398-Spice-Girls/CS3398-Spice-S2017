import lake from './lake.jpg';

var React = require('react');
var Dropzone = require('react-dropzone');
var request = require('superagent')

const CLOUDINARY_UPLOAD_PRESET = 'iieovyvu';
const CLOUDINARY_UPLOAD_URL ='https://api.cloudinary.com/v1_1/mikeycloud9/upload';

class ImageManager extends React.Component {
		constructor(props){
				super(props)

			this.state = {
					uploadedFileCloudinaryUrl: ''
			};
		}


onImageDrop(files) {
		this.setState({
			uploadedFile: files[0]
		});

		this.handleImageUpload(files[0]);
	}

	handleImageUpload(file) {
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
												.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
												.field('file', file);

		upload.end((err, response) => {
			if (err) {
				console.error(err);
			}

			if (response.body.secure_url !== '') {
				this.setState({
					uploadedFileCloudinaryUrl: response.body.secure_url
				});
			}
		});
	}

		render(){
			
			if (this.state.uploadedFileCloudinaryUrl === '')
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
						<img src={ this.state.uploadedFileCloudinaryUrl} />
					</div>
				);
		}
}

module.exports = ImageManager;
