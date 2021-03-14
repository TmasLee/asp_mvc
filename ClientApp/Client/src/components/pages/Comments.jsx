import React, { Component } from 'react';
import { Row, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';

import patrick_wip from '../../../../assets/patrick_wip.gif';

// TODO: OnChangeHandler
export class Comments extends Component {
    state = {
        comments: [],
        comment: ''
    }

    async componentDidMount(){
        await axios.get('/comment/get-comments')
        .then((resp) => {
            this.setState({ comments: resp.data })
        })
        .catch((err) => console.error(err));
    }

    postComment = (text) => {
        axios.post(
            '/comment/post-comment',
            {
                userId: this.props.currentUser.id,
                text: text
            }
        )
        .then()
        .catch(err => console.error(err));
    }

    render (){
        const { currentUser } = this.props;
        let commentInputField = currentUser ? (
            <form action={this.postComment}>
                <textarea/>
                <Button type="submit">Post</Button>
            </form>
        )
        : <div>Sign up to leave your boy a heartfelt comment!</div>

        return (
            <div className="margins" style={{height: '105vh'}}>
                <br/><br/>
                <div>
                    {
                        this.state.comments.map((comment) => {
                            <div></div>
                        })
                    }
                </div>
                <br/><br/>
                <br/><br/>
                <Row className='row'>
                    <img src={patrick_wip} alt="WIP" width={400}/>
                </Row>
            </div>
        );
    }
}
