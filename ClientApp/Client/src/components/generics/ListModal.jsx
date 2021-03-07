import React, { Component } from 'react';
import { ListGroup, Button, InputGroup, FormControl, Form } from 'react-bootstrap';

import { GenericModal, ModalMessage } from '../generics';

export function ListModal(props){
    const { list } = props;
    return (
        <GenericModal {...props}>
            {props.children}
            <br/>
            <ListGroup>
                {
                    list.map((item) => item)
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
            const { searchField } = this.state;
            if (searchField === ''){
                this.setState({ queriedList: list });
            } else {
                let newQueriedList = list.filter(
                    item => item.props.userEmail.toLowerCase().includes(searchField.toLowerCase()));
                this.setState({ queriedList: newQueriedList });
            }
        }

        render() {
            const { error = '', response = '' } = this.props;
            return (
                <ListModal list={this.state.queriedList} {...this.props}>
                    <ModalMessage error={error} response={response}/>
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