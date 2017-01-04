/*eslint-disable no-unused-vars*/
import React from 'react';
import LoadingIndicator from './LoadingIndicator.react';
/*eslint-enable no-unused-vars*/

function LoadingButton(props) {
    return(
        <a href="#" className={props.className + ' btn btn--loading'} disabled="true">
            <LoadingIndicator />
        </a>
    );
}

export default LoadingButton;
