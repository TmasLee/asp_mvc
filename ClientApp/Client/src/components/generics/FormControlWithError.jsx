import React from 'react';
import { Form } from 'react-bootstrap';

import { FormInputError } from './FormInputError';

export const FormControlWithError = ({ required, type, name, value, onChange, placeholder, error }) => {
    return (
        <Form.Group>
            <Form.Control required={required}
                type={type}
                name={name}
                value={value}
                onChange={(e)=>onChange(e)}
                placeholder={placeholder}/>
            {error ? <FormInputError error={error}/> : null}
        </Form.Group>
    )
}
