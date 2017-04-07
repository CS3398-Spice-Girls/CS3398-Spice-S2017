import lake from './lake.jpg';

var React = require('react');
var Dropzone = require('react-dropzone');




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

    render(){
        return (
            <Dropzone
                multiple={false}
                accept="image/*"
                onDrop={this.onImageDrop.bind(this)}>
                <p>Drop an image or clock to select a file to uploaf.</p>
                </Dropzone>
                


            <div id='imageManager'>
                <img src={lake} width={500} height={400} mode='fit'/>
                <button onClick={this.upload.bind(this)} >Upload new image.</button>
            </div>
        );
    }
}

module.exports = ImageManager;
