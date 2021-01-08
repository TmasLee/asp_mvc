import React from 'react';
import { Spinner, Fade } from 'react-bootstrap';

export const Loading = () => {
    return (
        <div>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <Fade>
                
            </Fade>
        </div>
    )
}