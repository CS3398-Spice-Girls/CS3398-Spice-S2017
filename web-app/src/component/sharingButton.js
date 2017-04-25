var React = require('react');
import PaletteStore from '../data/store.js';

class SharingButton extends React.Component{
	copyHex(){
		window.prompt("Copy to clipboard", Object.values(PaletteStore.palette).join(', '))
	}

	copyRGB(){
		var RGBValues = []
		Object.values(PaletteStore.palette).forEach((hex) => {
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
	
	downloadImage(){
		var canvas = this.refs.saveCanvas,
				context = canvas.getContext('2d'),
				image = new Image();
 
		image.src = PaletteStore.imageUrl;
	   
		image.onload = function(){
			var swatchHeight = 30,
					swatchWidth = image.naturalWidth/PaletteStore.palette.length;

			canvas.width = image.naturalWidth
			canvas.height = image.naturalHeight + swatchHeight
			context.fillRect(0,0,image.naturalWidth, image.naturalHeight)
			context.drawImage(image, 0, 0)

			context.textAlign = 'center';
			context.strokeStyle = '#333';
			context.font = '14pt arial';
			context.lineWidth = 3;

			for (var i=0; i<PaletteStore.palette.length; i++){
				context.fillStyle = PaletteStore.palette[i]
				context.fillRect(swatchWidth*i, image.naturalHeight, swatchWidth, swatchHeight)
				context.fillStyle = '#eee';
				context.strokeText(PaletteStore.palette[i].toUpperCase(), swatchWidth*(i+.5), image.naturalHeight + .75*swatchHeight);
				context.fillText(PaletteStore.palette[i].toUpperCase(), swatchWidth*(i+.5), image.naturalHeight + .75*swatchHeight);
			}

			canvas.toBlob(function(blob){
				if (blob){
					var a = document.createElement('a')
					document.body.appendChild(a)
					a.style = 'display: none'
					var url = window.URL.createObjectURL(blob)
					a.href = url
					a.download = 'palette.png'
					a.click()
					window.URL.revokeObjectURL(url)
					a.remove()
				}
			});
		}
	}

	render(){
		return(
			<div className="flyout" id="share-flyout">
				<button className="flyout-button" id="copy-rgb" onClick={this.copyRGB.bind(this)}>RGB</button>
				<button className="flyout-button" id="copy-hex" onClick={this.copyHex.bind(this)}>Hex</button>
				<button className="flyout-button" id="copy-img" onClick={this.downloadImage.bind(this)} download="image.png" >Download Image</button>
				<canvas className="hidden" id="save-canvas" ref="saveCanvas" />
				<button id="share-button">Share</button>
			</div>
		);
	}
}

module.exports = SharingButton;