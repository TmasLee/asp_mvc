import React from 'react';

export function FormInputError({ error }){
    return (
        <span style={{color: "red", paddingLeft: "2px"}}>
            {error}
        </span>
    )
}
