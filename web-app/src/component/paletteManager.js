var React = require('react');
var Swatch = require('./swatch')
import Dispatcher from '../data/dispatcher.js'
import PaletteStore from '../data/store'

class PaletteManager extends React.Component {
	constructor(props){
		super(props)
		//Get info from the URL
		var urlColors = document.location.hash.split(',');
		if (urlColors[0] !== '')
			for (var id in urlColors)
				this.addSwatch(urlColors[id]);

		// generate random test colors
		if (this.props.debug)
			while (this.nextID < Math.floor(Math.random()*3+4))
				this.addSwatch('#' + (Math.random()*0xFFFFFF<<0).toString(16))
	}

	addSwatch(color){
		if(!/^#[0-9a-f]{3,6}$/i.test(color))
		throw(new Error('Invalid color for addSwatch'));

	Dispatcher.dispatch({
		actionName: 'addSwatch',
		color: color
	})
	}

	removeSwatch(key){
		if(PaletteStore.palette[key] === undefined)
		throw(new Error('Key doesn\'t exist in palette'));

	Dispatcher.dispatch({
		actionName: 'removeSwatch',
		key: key
	})

	this.setState({ palette: PaletteStore.palette })
	}

	componentWillMount(){
		this.setState({ palette: PaletteStore.palette })
	}

	// This function manages the drag and drop updating of a swatch.
	//  When a swatch is dropped this function should be fired with that
	//  swatch's id and the new location that it should be moved to.
	sortSwatches(id, newLoc){

	}

	getPaletteLength(){
		return (PaletteStore.palette).length()
	}

	getPaletteAsString(){
		return Object.keys(PaletteStore.palette).map(function(id){
			return PaletteStore.palette[id];
		}).join(',');
	}

	getPaletteInfo(){
		return PaletteStore.palette
	}

	render(){
		//Keep it populated for testing
		if (this.props.debug)
			if (Object.keys(this.state.palette).length < 2)
				while (Object.keys(this.state.palette).length < 6)
					this.addSwatch('#' + (Math.random()*0xFFFFFF<<0).toString(16))
		
		document.location.hash = this.getPaletteAsString();
		return(
			<div id="palette">
				{
					Object.keys(this.state.palette).map(function(key){
						return <Swatch className="swatch" deleteFunc={this.removeSwatch.bind(this, key)}
							id={key} key={key} color={this.state.palette[key]} />
					}.bind(this))
				}
			</div>
		);
	}
}
module.exports = PaletteManager;