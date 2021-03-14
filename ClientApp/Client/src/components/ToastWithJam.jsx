import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

export default class ToastWithJam extends Component {
    state = {
        showToast: true,
        minsAgo: 0
    }

    componentDidMount(){
        setInterval(() => this.setState(prevState => {
            return { minsAgo: prevState.minsAgo + 1 }
        }), 60000);
    }

    componentWillUnmount(){
        clearInterval(interval);
    }

    setTime = (minsAgo) => {
        this.setState({minsAgo: minsAgo});
    }

    toggleToast = () => {
        this.setState({showToast: !this.state.showToast});
    }

    render(){
        const { showToast, minsAgo } = this.state;
        const { email, text } = this.props;
        return (
            <Toast
                style={{
                    minWidth: '285px'
                }}
                show={showToast}
                onClose={(e)=>this.toggleToast()}
                delay={20000}
                autohide
            >
                <Toast.Header>
                    <strong className="mr-auto">{email}</strong>
                    <small>{minsAgo ? `${minsAgo} mins ago` : 'just now'}</small>
                </Toast.Header>
                <Toast.Body>{text ? text : "wants to be your friend!"}</Toast.Body>
            </Toast>
        )
    }
}