import React from 'react';

function WebsitesList(props) {
    if (props.violations && props.violations.length) {
        return (
            <div className="websites-list">
                <p className="red">Forbidden Websites Detected</p>
                <ul>
                    {(() => {
                        const listItems = [];
                        for (const violation of props.violations) {
                            listItems.push(<p key={`${violation}-list-item`} className="red">{violation}</p>)
                        }

                        return listItems;
                    })()}
                </ul>
            </div>
        );
    }
    else {
        return (
            <div className="websites-list">
                <p>No Forbidden Websites Detected</p>
            </div>
        );
    }
}

export default WebsitesList;