import React, { Component } from 'react';
import { ListGroup, Button, InputGroup, FormControl, Form } from 'react-bootstrap';

import { GenericModal, ModalMessage } from '../generics';
import UserListItem from '../modals/UserListItem';

export function ListModal(props){
    const { userBtns = [], list } = props;
    return (
        <GenericModal {...props}>
            {props.children}
            <br/>
            <ListGroup>
                {
                    list.map((item, i) => {
                        return (
                            <UserListItem
                                key={i}
                                userEmail={item.email}
                                userId={item.id}
                            >
                                {
                                    userBtns.map((btn) =>
                                        <Button
                                            key={item.id}
                                            className="float-right"
                                            variant={btn.variant ? btn.variant : 'primary'}
                                            onClick={() => btn.action(item.id)}
                                        >
                                            {btn.name ? btn.name : 'Action'}
                                        </Button>
                                    )
                                }
                            </UserListItem>
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
                    <Form onSubmit={(e)=>{e.preventDefault(); this.searchUsers()}}>
                        <InputGroup>
                            <FormControl
                                placeholder='Search an email'
                                name='searchField'
                                onChange={this.handleInputOnChange}
                            />
                            <InputGroup.Append>
                                <Button type="submit">Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </ListModal>
            )
        }
    }
}