import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';
import axios from 'axios';

import DatasetParser from '../../utilities/dataset-parser';
import { ChartContainer } from '../generics/charts/ChartContainer';
import sloth_astronaut from '../../../../assets/sloth_astronaut.jpg';
import elon from '../../../../assets/elon.jpg';

export class Home extends Component {
    state = {
        loading: true,
        datasets: {
            launches_over_time: {
                title: 'Launches vs Date',
                data: {}
            }
        },
        data: []
    }

    componentDidMount() {
        axios.get('https://api.spacexdata.com/v4/launches', {
            withCredentials: false,
            transformRequest: (data, headers) => {
                delete headers.common['csrf-token'];
            }
        })
        .then((resp) => {
            let reuseDataset = DatasetParser.parseReuseOverTimeDataset(resp.data);
            this.setState({
                data: reuseDataset,
                loading: false
            });
        })
        .catch((err) => console.error(err));
    }

    makeFriends = async () => {
        await axios.get('/friendship/give-friends', {
            params: {
                currentUserId: this.props.currentUser.id
            }
        })
        .catch((err) => console.error(err));
    }

    render (){
        const { data, loading } = this.state;
        const { currentUser, getDataPoint = null } = this.props;

        let makeFriendsBtn =  (
            <div>
                Click here to get started with some friends: {"  "}
                <Button onClick={() => this.makeFriends()}>
                    Make Friends!
                </Button>
            </div>
        )

        let chart = loading ? <div style={{textAlign: 'center'}}>Loading...</div> : (
            <ChartContainer
                title='Core and fairing reuse over time'
                data={data}
                seriesKeys={{
                    core: ['core_reuse_count', 'core_non_reuse_count'],
                    fairings: ['fairings_reuse_count', 'fairings_non_reuse_count']
                }}
                chartTypes={['stacked-bar', 'line']}
                getDataPoint={getDataPoint}
            />
        );

        return (
            <div className="margins" style={{height: '105vh'}}>
                <h1>Welcome to Astronaut Sloth</h1>
                <br/>
                <p>
                    This is a small project built with React and ASP.NET Core (MVC and WebApi) with a focus on writing modular and extendable software.
                </p>
                <p>
                    Some SpaceX data is visualized below from composed and reusable components. The data is from the open-source api found
                    here: <a href='https://github.com/r-spacex/SpaceX-API'>https://github.com/r-spacex/SpaceX-API</a> 🚀.
                </p>
                <br/>
                <p>
                    {
                        currentUser ? makeFriendsBtn : 'You can also sign up (with a fake email), log in, and make some friends!'
                    }
                </p>
                <br/>
                { chart }
                <br/><br/>
                <Row className='row'>
                    <img src={sloth_astronaut} alt="Sloth Astronaut" width={300}/>
                </Row>
                <br/><br/>
                <Row className='row' style={{marginTop: '35vh'}}>
                    <img src={elon} alt="Elon Musk" width={300}/>
                </Row>
            </div>
        );
    }
}