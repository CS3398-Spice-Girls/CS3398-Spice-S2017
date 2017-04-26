import {Dispatcher} from 'flux';
import PaletteStore from './store.js'
import PaletteEmmiter from '../data/emmiter.js'
import ImageManagerEmmiter from '../data/emmiter.js'


var dispatcher = new Dispatcher();
var dispatchQueue = []
var isDispatching = false

function queueDispatch(dispatchItem){
	dispatchQueue.push(dispatchItem)
	if (!isDispatching)
		startDispatching()
}

function startDispatching(){
	isDispatching = true
	while(dispatchQueue.length > 0){
		if (dispatcher.isDispatching()){
			return setTimeout(startDispatching, 100)
		}
		var dispatchItem = dispatchQueue.shift()
		dispatcher.dispatch(dispatchItem)
	}
	isDispatching = false
}


var AppDispatcher	= {
	isDispatching() { return isDispatching },
	dispatch(dispatchItem) { queueDispatch(dispatchItem) },
	register(callback) { return dispatcher.register(callback) }
}

AppDispatcher.register( function(data){
	console.log(data.actionName);
	// console.log(PaletteStore.swapID);
	switch(data.actionName){
		case 'canvasMouseMove':
			PaletteStore.mouseColor = data.color;
			PaletteEmmiter.emit('canvasMouseMove');
			break;
		case 'canvasOnClick':
			PaletteStore.clickColor = data.color
			PaletteEmmiter.emit('canvasMouseClick')
			break;

		case 'addSwatch':
			PaletteStore.palette.push(data.color);
			PaletteEmmiter.emit('swatchAdded')
			break;

		case 'autoCall':
			PaletteStore.numColors = data.numColors;
			ImageManagerEmmiter.emit('autoGenerate');
			break;

		case 'Generate':
			PaletteStore.palette = data.palette;
			PaletteEmmiter.emit('paletteGenerate');
			break;

		case 'removeSwatch':
			PaletteStore.swapID = -2
			PaletteStore.palette.splice(data.key, 1)
			PaletteEmmiter.emit('swatchRemoved')
			break;

		case 'selectSwatch':
			if (PaletteStore.swapID === -2){
				PaletteStore.swapID = -1
			}else{
				PaletteStore.swapID = data.id
				PaletteEmmiter.emit('swatchSelected')
			}
			break;

		case 'dropSwatch':
			var id = PaletteStore.swapID
			var tempColor = PaletteStore.palette[id]
			PaletteStore.palette[id] = PaletteStore.palette[data.id]
			PaletteStore.palette[data.id] = tempColor
			PaletteStore.swapID = -1
			PaletteEmmiter.emit('swatchDropped')
			break;

		case 'resetPalette':
			PaletteStore.palette = []
			PaletteStore.imageUrl = ''
			PaletteEmmiter.emit('resetPalette')
			//PaletteEmmiter.emit('resetImage')
			break;

		case 'uploadImage':
			PaletteStore.imageUrl = URL.createObjectURL(data.file)
			PaletteEmmiter.emit('imageUploaded')
			break;

		default:
			break;
	}
})

export default AppDispatcher