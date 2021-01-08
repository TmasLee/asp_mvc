import React, { Component } from 'react';
import axios from 'axios';

export class Exercises extends Component {
    constructor(props){
        super(props);
        this.state = {
            time: ''
        }
    }

    componentDidMount(){
        axios.get(
            'index/exercises/servertime'
        ).then(res => {
            const data = res.data;
            this.setState({
                time: data.now
            });
        })
    }

    render() {
        const {time} = this.state;
        return (
            <div>
                <h1>Exercises</h1>
                <p>The date and time is {time}.</p>
            </div>
        );
    }
}
