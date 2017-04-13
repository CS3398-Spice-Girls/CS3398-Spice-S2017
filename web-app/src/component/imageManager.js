import lake from './lake.jpg';

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

  	upload(){
  		window.alert("Eventually you can upload an image when you click me.")
  	}
    
    // <button onClick={this.upload.bind(this)} >Upload new image.</button>

    render(){
        return (
            <div id='imageManager'>
                <img src={lake} />
            </div>
        );
    }
}

module.exports = ImageManager;
