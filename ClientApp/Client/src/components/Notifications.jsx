import React, { Fragment, useState, useEffect } from 'react';
import { Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Notifications = ({currentUser, toggleModal}) => {
    const [connection, setConnection] = useState(null);
    const [requestCount, setRequestCount] = useState(0);
    const requestsBadge = <Badge variant="primary">{requestCount}</Badge>;

    useEffect(() => {
        setRequestCount(currentUser.requestCount);
        let connection = new signalR.HubConnectionBuilder()
            .withUrl("/requestshub")
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();
            connection.start()
        .catch((err)=>{
            console.error(err);
        });

        setConnection(connection);
    }, []);

    useEffect(() => {
        if (connection){
            connection.on("ReceiveMessage", message => {
                console.log(message)
            });
        }
    }, [connection]);

    return (
        <Fragment>
            <Nav.Item>
                <Nav.Link as={Link} className="text-dark" to="#" onClick={(e)=>{toggleModal('requests')}}>
                    Requests {requestsBadge}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} className="text-dark" to="#">
                    Chat {requestsBadge}
                </Nav.Link>
            </Nav.Item>
        </Fragment>
    )
}


export default Notifications;