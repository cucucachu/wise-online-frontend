import React from 'react';

function Spinner(props) {
    switch(props.size) {
            case 's' : 
                return <div className="spinner-s"></div>
            ;
            case 'm' : 
                return <div className="spinner-m"></div>
            ;
            case 'l' : 
                return <div className="spinner-l"></div>
            ;
            default : 
                return <div className="spinner"></div>
            ;

    }


}

export default Spinner;