import React from 'react';
import { Spinner } from 'react-bootstrap';

export function Loading(){
    return (
        <div style={{textAlign: 'center'}}>
            <Spinner animation="border" role="status"/>
            <div>Loading...</div>
        </div>
    )
}