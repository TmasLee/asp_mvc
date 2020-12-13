import React, { Component } from 'react';
import axios from 'axios';

import "../../../css/App.css";

export class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount(){
        axios.get(
            '/Home/Index'
        ).then(res => {
            const data = res.data;
            this.setState({
                page: data.page,
                time: data.time.now
            });
        })
    }

    render () {
        const {data, time} = this.state;
        return (
            <div>
                <h1>Welcome to the {data} Page</h1>
                <p>The date and time is {time}.</p>
            </div>
        );
    }
}
