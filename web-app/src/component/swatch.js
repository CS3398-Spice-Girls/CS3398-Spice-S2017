var React = require('react');
import AppDispatcher from '../data/dispatcher.js'
import PaletteStore from '../data/store'

class Swatch extends React.Component {
    constructor(props){
        super(props)
        if(!/^#[0-9a-f]{3,6}$/i.test(this.props['color'])){
           throw(new Error('Invalid color for Swatch'));
        }
    }

    onClick(){
        AppDispatcher.dispatch({
            'actionName': PaletteStore.swapID >= 0 ? 'dropSwatch' : 'selectSwatch',
            id: this.props.id
        })
    }

    render(){
        const divStyle = {
            backgroundColor: this.props['color']    
        };

        var classes = [
            "swatch",
            (this.props.id === PaletteStore.swapID ? 'selected' : '')
        ].join(' ')

        return (
            <div className={classes} id={'swatch-'+this.props.id} onClick={this.onClick.bind(this)} style={divStyle}>
                &nbsp;
                <span className="swatchText centered"> {this.props['color']} </span>
                <button id={this.props.id} onClick={this.props.deleteFunc} className="closeButton" />
            </div>
        );
    }
}

module.exports = Swatch;
