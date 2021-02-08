import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, InputGroup, FormControl } from 'react-bootstrap';

import { GenericModal, ModalMessage } from '../generics';

export function ListModal(props){
    const { title, currentUser, userAction, list } = props;
    if (!currentUser){
        return (
            <GenericModal {...props}>
                {props.children}
                <br/>
                <ListGroup>
                    {
                        list.map((item, i) => {
                            return (
                                <ListGroupItem key={i}>
                                    <a href={`/user/${item.id}`} style={{textDecoration: 'none'}}>
                                        {item.email}
                                    </a>
                                </ListGroupItem>
                            )
                        })
                    }
                </ListGroup>
            </GenericModal>
        )
    }

    return (
        <GenericModal {...props}>
            {props.children}
            <br/>
            <ListGroup>
                {
                    list.map((item, i) => {
                        let actionBtn = (title === 'Friends') ? <Button variant='danger' onClick={(e)=>userAction(item.id)}>Delete</Button>
                                                            : <Button onClick={(e)=>userAction(item.id)}>Add</Button>
                        return (
                            <ListGroupItem key={i}>
                                <a href={`/user/${item.id}`} style={{textDecoration: 'none'}}>
                                    {item.email}
                                </a>
                                {actionBtn}
                            </ListGroupItem>
                        )
                    })
                }
            </ListGroup>
        </GenericModal>
    )
}

export function ListModalWithSearch(list){
    return class extends Component {
        constructor(props){
            super(props);
            this.state = {
                queriedList: list,
                searchField: ''
            }
        }

        // Add debounce user input?
        handleInputOnChange = (e) => this.setState({ [e.target.name]: e.target.value });

        // Shitty search lol
        searchUsers = () => {
            if (this.state.searchField === ''){
                this.setState({ queriedList: list });
            } else {
                let newQueriedList = list.filter(item => item.email.includes(this.state.searchField));
                this.setState({ queriedList: newQueriedList });
            }
        }

        render() {
            const { error = '' } = this.props;
            return (
                <ListModal list={this.state.queriedList} {...this.props}>
                    <ModalMessage error={error}/>
                    <InputGroup>
                        <FormControl placeholder='Search an email'
                                    name='searchField'
                                    onChange={this.handleInputOnChange}
                                    />
                        <InputGroup.Append>
                            <Button onClick={this.searchUsers}>Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </ListModal>
            )
        }
    }
}