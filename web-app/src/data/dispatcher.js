import {Dispatcher} from 'flux';
import PaletteStore from './store.js'

var AppDispatcher = new Dispatcher();
AppDispatcher.register( function(data){
	switch(data.actionName){
		case 'addSwatch':
			PaletteStore.palette.push(data.color);
			break;

		case 'removeSwatch':
			console.log(data.key);
			delete PaletteStore.palette[data.key]
			break;

		case 'uploadImage':
			PaletteStore.imageUrl = URL.createObjectURL(data.file)
			break;

		default:
			break;
	}
})

export default AppDispatcher