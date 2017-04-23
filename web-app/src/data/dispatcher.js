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
	switch(data.actionName){
		case 'canvasMouseMove':
			PaletteStore.mouseColor = data.color;
			// console.log(data.color);
			// console.log('dispatcher', Date.now());
			PaletteEmmiter.emit('canvasMouseMove');
			break;
		case 'canvasOnClick':
			PaletteStore.clickColor = data.color
			PaletteEmmiter.emit('canvasMouseClick')
			break;

		case 'addSwatch':
			PaletteStore.palette.push(data.color);
			break;

		case 'autoCall':
			PaletteStore.numColors = data.numColors;
			ImageManagerEmmiter.emit('autoGenerate');

		case 'Generate':
			PaletteStore.palette = data.palette;
			PaletteEmmiter.emit('paletteGenerate');
			break;

		case 'removeSwatch':
			delete PaletteStore.palette[data.key]
			break;

		case 'resetPalette':
			PaletteStore.palette = []
			PaletteEmmiter.emit('resetPalette')
			break;

		case 'uploadImage':
			PaletteStore.imageUrl = URL.createObjectURL(data.file)
			break;

		default:
			break;
	}
})

export default AppDispatcher