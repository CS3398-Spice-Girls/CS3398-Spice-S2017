var React = require('react');

class Swatch extends React.Component {
    constructor(props){
        super(props)
        if(!/^#[0-9a-f]{3,6}$/i.test(this.props['color'])){
           throw(new Error('Invalid color for Swatch'));
        }
    }

    render(){
        const divStyle = {
            backgroundColor: this.props['color']    
        };

        return (
            <div className="swatch" id={'swatch-'+this.props.id} style={divStyle}>
                &nbsp;
                <span className="swatchText centered"> {this.props['color']} </span>
                <button id={this.props.id} onClick={this.props.deleteFunc} className="closeButton" />
            </div>
        );
    }
}

module.exports = Swatch;
