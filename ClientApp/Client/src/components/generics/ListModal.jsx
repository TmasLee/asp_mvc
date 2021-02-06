import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, InputGroup, FormControl } from 'react-bootstrap';

import { GenericModal } from '../generics';

// Why does this rerender when delete friend? 🤔
// Unncessary HOC? Maybe merge function and component
class ListModal extends Component {
    render(){
        const { title } = this.props;
        return(
            <GenericModal {...this.props}>
                {this.props.children}
                <br/>
                <ListGroup>
                    {
                        this.props.list.map((item, i) => {
                            let actionBtn = (title === 'Friends') ? <Button variant='danger' onClick={(e)=>this.props.userAction(item.id)}>Delete</Button>
                                                                : <Button onClick={(e)=>this.props.userAction(item.id)}>Add</Button>
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
        );
    }
}

export default function ListModalWithSearch(list){
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
            return (
                <ListModal list={this.state.queriedList} {...this.props}>
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