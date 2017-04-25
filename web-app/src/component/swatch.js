var React = require("react");

class Swatch extends React.Component {
    constructor(props) {
        super(props);
        if (!/^#[0-9a-f]{3,6}$/i.test(this.props["color"])) {
            throw new Error("Invalid color for Swatch");
        }
    }

    handleClick = () => {
        if (this.props.selectedColor === this.props.color) {
            this.props.selectColor("");
        } else if (this.props.selectedColor.length) {
            this.props.switchSwatches(this.props.color);
        } else {
            this.props.selectColor(this.props.color);
        }
    };

    render() {
        const textColor = this.props.color === this.props.selectedColor
            ? "#fff"
            : "#000";
        const divStyle = {
            backgroundColor: this.props["color"],
            color: textColor
        };

        return (
            <div
                className="swatch"
                id={"swatch-" + this.props.id}
                style={divStyle}
                onClick={this.handleClick}
            >
                &nbsp;
                <span className="swatchText centered">
                    {" "}{this.props["color"]}{" "}
                </span>
                <button
                    id={this.props.id}
                    onClick={this.props.deleteFunc}
                    className="closeButton"
                />
            </div>
        );
    }
}

module.exports = Swatch;
