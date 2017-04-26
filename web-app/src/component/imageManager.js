var React = require('react');
var Dropzone = require('react-dropzone');
import Dispatcher from '../data/dispatcher.js';
import PaletteStore from '../data/store';
import ImageManagerEmmiter from '../data/emmiter';
var mean = require('../../util/kMeanCluster.js');

class ImageManager extends React.Component {
	constructor(props){
		super(props)
		this.state = {uploadedFile:''}

		ImageManagerEmmiter.on('autoGenerate', this.autoGenerate.bind(this));
		ImageManagerEmmiter.on('resetPalette', this.componentWillMount.bind(this));
	}

	componentDidUpdate() {
  	this.updateCanvas();
  }

  componentWillMount() {
		this.setState({
			uploadedFile: PaletteStore.imageUrl
		});
	}

  updateCanvas() {
		const vas = this.refs.canvas;
		var img = new Image();
	  // declare a function to call once the image has loaded
    img.onload = function(){
			vas.width = img.width;
			vas.height = img.height;
			vas.getContext('2d').drawImage(img, 0,0);
	  }
		img.src = this.state.uploadedFile;
   }

	onImageDrop(files) {
		Dispatcher.dispatch({
			actionName: 'uploadImage',
			file: files[0]
		})


		this.setState({
			uploadedFile: PaletteStore.imageUrl
		});
	}

	autoGenerate(){
		var samples = 30000;
		var sqrtSamples = Math.floor(Math.sqrt(samples))
		var randomSpots = []
		var color;
		var context = this.refs.canvas.getContext('2d');
		var j;
		
		var xDelta = this.refs.canvas.width/sqrtSamples,
				yDelta = this.refs.canvas.height/sqrtSamples;

		for (var i = 0; i < sqrtSamples; i++){
			for(j = 0; j < sqrtSamples; j++){
				color = context.getImageData(i*xDelta, j*yDelta, 1,1).data;
				randomSpots.push([color[0], color[1], color[2]]);
			}
		}
	
		Dispatcher.dispatch({
			'actionName' : 'Generate',
			palette: mean.clusterColors(randomSpots, PaletteStore.numColors)

		}); 
	}

	onClick(event) {
		var rect = this.refs.canvas.getBoundingClientRect();
		var x = Math.round((event.clientX-rect.left)/(rect.right-rect.left)*this.refs.canvas.width),
				y = Math.round((event.clientY-rect.top)/(rect.bottom-rect.top)*this.refs.canvas.height);
		Dispatcher.dispatch({

			'actionName': 'canvasOnClick',
			color: this.refs.canvas.getContext('2d').getImageData(x,y,1,1).data
		})
	}

	onMouseMove(event) {
		var rect = this.refs.canvas.getBoundingClientRect();
		var x = Math.round((event.clientX-rect.left)/(rect.right-rect.left)*this.refs.canvas.width),
				y = Math.round((event.clientY-rect.top)/(rect.bottom-rect.top)*this.refs.canvas.height);
		Dispatcher.dispatch({
			'actionName': 'canvasMouseMove',
			color: this.refs.canvas.getContext('2d').getImageData(x,y,1,1).data
		})
	}

	onMouseLeave(event) {
		Dispatcher.dispatch({
			'actionName': 'canvasMouseMove',
			color: [34,34,34, 255]
		})
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
					<canvas ref="canvas" className='centered' onMouseLeave={this.onMouseLeave.bind(this)} onMouseMove={this.onMouseMove.bind(this)} onClick={this.onClick.bind(this)} />
				</div>
			</Dropzone>
		);
	}
}

module.exports = ImageManager;
