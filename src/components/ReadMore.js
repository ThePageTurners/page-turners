import React from 'react';
import PropTypes from 'prop-types';
// * * * * IN ORDER TO USE THIS IMPORT WE HAD TO COPY IT FROM THE REPO TO ALTER THE STYLING https://github.com/Thamodaran/react-read-more-less

class ReadMore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charLimit: props.charLimit
        };
        this.initialState = this.state;
    }

    getReadMoreContent() {
        const { charLimit } = this.state;
        const { children, readMoreText, readLessText } = this.props;
        if (children.length > charLimit) {
            return (<span className="short-text">
                {children.substr(0, charLimit)}...
                <span
                    className="readMoreText"
                    style={{ color: "#FFF", cursor: "pointer", "text-transform": "uppercase", background: "#637192", margin: "5px" }}
                    role="presentation"
                    onClick={this.showLongText.bind(this)}
                >
                    {readMoreText}
                </span>
            </span>);
        } else if (children.length < charLimit) {
            return (<span className="short-text">
                {children}
            </span>);
        }
        return (<span className="short-text">
            {children}
            <span
                className="readMoreText"
                style={{ color: "#FFF", cursor: "pointer", "text-transform": "uppercase", background: "#637192", margin: "5px" }}
                role="presentation"
                onClick={this.showShortText.bind(this)}
            >
                {readLessText}
            </span>
        </span>);
    };

    showLongText() {
        const { children } = this.props;
        this.setState({ charLimit: children.length });
        this.getReadMoreContent();
    }

    showShortText() {
        this.setState(this.initialState);
        this.getReadMoreContent();
    }

    render() {
        return (
            <div>
                {this.getReadMoreContent()}
            </div>
        );
    }
}

ReadMore.propTypes = {
    charLimit: PropTypes.number,
    readMoreText: PropTypes.string,
    readLessText: PropTypes.string,
    children: PropTypes.string.isRequired
};
ReadMore.defaultProps = {
    charLimit: 150,
    readMoreText: "Read more",
    readLessText: "Read less"
};
export default ReadMore;