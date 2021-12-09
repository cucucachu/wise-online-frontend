import React from 'react';

function Spinner(props) {
    switch(props.size) {
            case 's' : 
                return <div className="spinner-s"></div>
                break;
            ;
            case 'm' : 
                return <div className="spinner-m"></div>
                break;
            ;
            case 'l' : 
                return <div className="spinner-l"></div>
                break;
            ;
            default : 
                return <div className="spinner"></div>
                break;
            ;

    }


}

export default Spinner;