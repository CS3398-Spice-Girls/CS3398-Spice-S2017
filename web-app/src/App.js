import React, { Component } from 'react';
import PaletteManager from './component/paletteManager.js';
import SharingButton from './component/sharingButton.js';
// import UploadButton from './component/uploadButton.js';
import ResetButton from './component/resetButton.js';
import ImageManager from './component/imageManager.js';
import AutoGenerateButton from './component/autoGenerateButton.js';

class App extends Component {
	render() {
		return (
			<div>
				<div id="header">
					<span id="logo">PaletteTown</span>
					<ResetButton />
					<AutoGenerateButton />
					<SharingButton />
				</div>
				<div id="wrapper">
					<div id="content">
						<ImageManager />
					</div>
				</div>
				<PaletteManager debug={false}/>
			</div>
		);
	}
}

export default App;