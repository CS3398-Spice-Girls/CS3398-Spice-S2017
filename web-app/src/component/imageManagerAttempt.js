var React = require('react');

class ImageManager extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        //let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
        //let ctx = canvas.getContext('2d');

        //ctx.fillStyle = 'rgb(200,0,0)';
        //ctx.fillRect(10, 10, 55, 50);
    }

    render(){
    let {mode, src, height, width, style, ...props} = this.props;
    let modes = {
      'fill': 'cover',
      'fit': 'contain'
    };
    let size = modes[mode] || 'contain';

    let defaults = {
      height: height || 100,
      width: width || 100,
      backgroundImage: src || `./lake.jpg`,
      backgroundColor: 'teal'
    };

    let important = {
      backgroundSize: size,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat'
    };

        return <div {...props} style={{...defaults, ...style, ...important}} />
    }
}

module.exports = ImageManager;
