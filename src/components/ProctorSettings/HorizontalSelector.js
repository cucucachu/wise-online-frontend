import React, { Component } from 'react';

import HorizontalSelectorButton from './HorizontalSelectorButton';

class HorizontalSelector extends Component {
    
    constructor(props) {
        super(props);

        // this.state = {
        //     selected: this.props.selected,
        // }

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(index) {

        // this.setState({
        //     ...this.state,
        //     selected: index,
        // });

        this.props.onSelect(index);
    }

    render() {
        return (
            <div className="shadow horizontal-selector">
                <p className="text-large">{this.props.title}</p>
                {(() => {
                    const buttons = [];

                    for (const optionIndex in this.props.options) {
                        const option = this.props.options[optionIndex];
                        let position = 0;

                        if (Number(optionIndex) === 0) {
                            position = -1;
                        }
                        else if (Number(optionIndex) === this.props.options.length - 1) {
                            position = 1
                        }

                        buttons.push(<HorizontalSelectorButton
                            key={`horizontal-selector-${option}-${optionIndex}`}
                            position={position}
                            onClick={this.handleSelect}
                            text={option}
                            selected={Number(this.props.selected) === Number(optionIndex)}
                            index={optionIndex}
                        />)
                    }

                    return buttons;
                })()}
            </div>
        )
    }
}

export default HorizontalSelector;