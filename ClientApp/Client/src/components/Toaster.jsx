import React, { useEffect, useState } from 'react';

import ToastWithJam from './ToastWithJam';

export default function Toaster({ connection }){
    const [toasts, addToast] = useState([]);

    useEffect(() => {
        if (connection){
            connection.on("ReceiveNewRequest", (newRequest) => {
                addToast(toasts => [...toasts, <ToastWithJam key={toasts.length} {...newRequest} />]);
            });
        }
    }, [connection]);

    return (
        <div
            style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
            }}
        >
            {
                toasts.map((toast) => toast)
            }
        </div>
    );
}