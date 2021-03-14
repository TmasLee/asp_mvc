import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

export default class ToastWithJam extends Component {
    state = {
        showToast: true,
        secondsAgo: 0
    }

    componentDidMount(){
        setInterval(() => this.setState(prevState => {
            return { secondsAgo: prevState.secondsAgo + 10 }
        }), 10000);
    }

    componentWillUnmount(){
        clearInterval(interval);
    }

    setTime = (secondsAgo) => {
        this.setState({secondsAgo: secondsAgo});
    }

    toggleToast = () => {
        this.setState({showToast: !this.state.showToast});
    }

    render(){
        const { showToast, secondsAgo } = this.state;
        const { email, text } = this.props;
        return (
            <Toast
                style={{
                    minWidth: '300px'
                }}
                show={showToast}
                onClose={(e)=>this.toggleToast()}
                delay={21000}
                autohide
            >
                <Toast.Header>
                    <strong className="mr-auto">{email}</strong>
                    <small>{secondsAgo ? `${secondsAgo} seconds ago` : 'just now'}</small>
                </Toast.Header>
                <Toast.Body>{text ? text : "wants to be your friend!"}</Toast.Body>
            </Toast>
        )
    }
}