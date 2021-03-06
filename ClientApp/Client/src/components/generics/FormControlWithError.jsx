import React from 'react';
import { Form } from 'react-bootstrap';

import { FormInputError } from './FormInputError';

export function FormControlWithError({ required, type, name, value, onChange, placeholder, error, readOnly = false }){
    return (
        <Form.Group>
            <Form.Control
                required={required}
                type={type}
                name={name}
                value={value}
                onChange={(e)=>onChange(e)}
                placeholder={placeholder}
                readOnly={readOnly}
            />
            {error ? <FormInputError error={error}/> : null}
        </Form.Group>
    )
}
