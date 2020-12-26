import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

export const LoadingButton = () => {
    return (
        <Button variant="primary" disabled>
            <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            />
        </Button>
    )
}