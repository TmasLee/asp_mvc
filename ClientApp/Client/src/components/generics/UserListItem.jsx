import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

export function UserListItem(props){
    const { userEmail, userId } = props;
    return (
        <ListGroupItem>
            <a href={`/user/${userId}`} style={{textDecoration: 'none'}}>
                {userEmail}
            </a>
            {props.children}
        </ListGroupItem>
    )
}

export function UserListItemWithMessageField(action){
    return class extends Component {
        constructor(props){
            super(props);
            this.state = {
                message: ''
            }
        }

        handleInputOnChange = (e) => this.setState({ [e.target.name]: e.target.value });

        render(){
            let button = (
                <Button
                    className="float-right"
                    onClick={() => action(this.props.userId, this.state.message)}
                >
                    Add
                </Button>
            )
            return (
                <UserListItem {...this.props}>
                    {button}
                    <input
                        className="float-right"
                        placeholder='Say hi!'
                        name='message'
                        onChange={this.handleInputOnChange}
                    />
                </UserListItem>
            )
        }
    }
}