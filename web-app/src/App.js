import React, { Component } from 'react';
import logo from './logo.svg';
import Swatch from './component/swatch.js';
import PaletteManager from './component/paletteManager.js';
import SharingButton from './component/sharingButton.js';
import ImageManager from './component/imageManager.js';

class App extends Component {
	constructor(props){
		super(props);
		this.paletteManager = <PaletteManager debug={true} app={this} />;
		this.shareButton = <SharingButton app={this} />;
		this.imageManager = <ImageManager app={this} />;
		this.palette = {}
	}

  render() {
    return (
    	<div>
    		<div id="header">
    			{this.shareButton}
    		</div>
            <div id="wrapper">
    		<div id="content">
                {this.imageManager}
    		</div>
            </div>
    		{this.paletteManager}
    	</div>
    );
  }
}

export default App;
