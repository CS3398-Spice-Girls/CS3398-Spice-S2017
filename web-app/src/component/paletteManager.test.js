var React = require("react");
var Swatch = require("./swatch.js")
var PaletteManager = require("./paletteManager.js")
import PaletteStore from '../data/store.js'

import { shallow } from 'enzyme';
it('addSwatch throws error if invalid key.', () => {
	expect(() => {
		shallow(<PaletteManager />).instance().addSwatch('******')
	}).toThrow('Invalid color for addSwatch')
});

it('addSwatch should successufully add a new swatch to the palette and deleteSwatch should remove it again.', () => {
	var wrapper = shallow(<PaletteManager />),
			mgr = wrapper.instance(),
			oldSize = mgr.state.palette.length
	mgr.addSwatch('#FFFFFF'); 
	wrapper.update()
	expect(mgr.state.palette.length - oldSize).toEqual(1)

	oldSize = mgr.state.palette.length
	mgr.removeSwatch(0)
	wrapper.update()
	expect(mgr.state.palette.length).toEqual(0)
})

it('removeSwatch throws error if invalid key.', () => {
	expect(() => {
		shallow(<PaletteManager />).instance().removeSwatch('******')
	}).toThrow('Key doesn\'t exist in palette')
});