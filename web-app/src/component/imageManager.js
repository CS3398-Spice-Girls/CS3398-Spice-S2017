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
		var rect = this.refs.canvas.getBoundingClientRect();
		var randomSpots = [];
		var randomX;
		var randomY;
		var color;
		var samples = 20000;
		for (var i = 0; i < samples; i++){
			randomX = Math.floor(Math.random() * (rect.right-rect.left));
			randomY = Math.floor(Math.random() * (rect.bottom-rect.top));
			//randomX = (rect.left + (rect.width/samples)*i);
			//randomY = (rect.top +  i * ((rect.bottom-rect.top)/samples));
			
			color = this.refs.canvas.getContext('2d').getImageData(randomX,randomY,1,1).data;
			randomSpots.push([color[0], color[1], color[2]]);
		}
	
		Dispatcher.dispatch({
			'actionName' : 'Generate',
			palette: mean.clusterColors(randomSpots, 5)

		}); 
		
		//console.log(mean.clusterColors(randomSpots, 4));
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
					<canvas ref="canvas" onMouseMove={this.onMouseMove.bind(this)} onClick={this.onClick.bind(this)} />
				</div>
			</Dropzone>
		);
	}
}

module.exports = ImageManager;
