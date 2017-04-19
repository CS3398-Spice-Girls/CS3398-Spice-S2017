import React, { Component } from 'react';
import PaletteManager from './component/paletteManager.js';
import SharingButton from './component/sharingButton.js';
import ImageManager from './component/imageManager.js';

class App extends Component {
	render() {
		return (
			<div>
				<div id="header">
					<SharingButton />
				</div>
				<div id="wrapper">
					<div id="content">
						<ImageManager />
					</div>
				</div>
				<PaletteManager debug={true}/>
			</div>
		);
	}
}

export default App;