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

    render(){
        return (
            //<div id='img'>
              //<canvas ref="myCanvas">
                <img src={lake} width={500} height={400} mode='fit'/>
              //</canvas>
            //</div>
        );
    }
}

module.exports = ImageManager;
