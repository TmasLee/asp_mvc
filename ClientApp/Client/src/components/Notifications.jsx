import React, { Fragment, useState, useEffect } from 'react';
import { Nav, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Notifications = ({currentUser, toggleModal, connection}) => {
    const [requestCount, setRequestCount] = useState(null);
    let requestsBadge = requestCount ? <Badge variant="primary">{requestCount}</Badge> : null;

    useEffect(() => {
        if (connection){
            connection.invoke("GetRequestCount", currentUser.id)
                .then(count => {
                    setRequestCount(count);
                })
                .catch((err) => console.error(err));
        }
    });

    useEffect(() => {
        if (connection){
            connection.on("ReceiveRequestsList", (requests) => {
                setRequestCount(requests.length);
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
                <ChatTooltip id={0}/>
            </Nav.Item>
        </Fragment>
    )
}


function ChatTooltip({id}){
    const overlay = (
        <Tooltip target={"Tooltip-" + id}>
            Coming soon™️ lol.
        </Tooltip>
    );
    return (
        <span>
            <OverlayTrigger
                placement="bottom"
                overlay={overlay}
            >
                <Nav.Link as={Link} className="text-dark" to="#">
                    Chat
                </Nav.Link>
            </OverlayTrigger>
        </span>
    );
}