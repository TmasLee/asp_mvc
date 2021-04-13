import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';
import axios from 'axios';

import DatasetParser from '../../utilities/dataset-parser';
import { ChartContainer } from '../generics/charts/ChartContainer';
import { Loading } from '../../components/generics/Loading';
import { removeUnderscore, formatTimestamp } from '../../utilities/utils';
import sloth_astronaut from '../../../../assets/sloth_astronaut.jpg';
import elon from '../../../../assets/elon.jpg';

export class Home extends Component {
    state = {
        loading: true,
        reuseData: {
            data: [],
            xAxis: {
                key: 'date',
                label: 'Launch Date'
            },
            yAxis: {
                seriesKeys: {
                    core: ['core_reuse_count', 'core_non_reuse_count'],
                    fairings: ['fairings_reuse_count', 'fairings_non_reuse_count']
                },
                label: 'Count'
            }
        },
    }

    componentDidMount() {
        axios.get('https://api.spacexdata.com/v4/launches', {
            withCredentials: false,
            transformRequest: (data, headers) => {
                delete headers.common['csrf-token'];
            }
        })
        .then((resp) => {
            let reuseDataset = this.state.reuseData;
            reuseDataset.data = DatasetParser.parseReuseOverTimeDataset(resp.data);

            this.setState({
                reuseData: reuseDataset,
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
        const { reuseData, loading } = this.state;
        const { currentUser, getDataPoint = null } = this.props;

        let makeFriendsBtn =  (
            <div>
                Click here to get started with some friends: {"  "}
                <Button onClick={() => this.makeFriends()}>
                    Make Friends!
                </Button>
            </div>
        )

        let reuseChart = loading ? <Loading/> : (
            <ChartContainer
                title='Core and fairing reuse over time'
                data={reuseData}
                chartTypes={['stacked-bar', 'line']}
                getDataPoint={getDataPoint}
                tooltip={ReuseChartTooltip}
            />
        );

        return (
            <div className="margins" style={{height: '105vh'}}>
                <h1>Welcome to Astronaut Sloth</h1>
                <br/>
                <p>
                    This is a small project built with React and ASP.NET Core (MVC and WebApi) with a focus on trying to write more modular and extendable code.
                </p>
                <p>
                    An interactive visualization of some SpaceX launch data is shown below. Data fetched from the open-source api found
                    here: <a href='https://github.com/r-spacex/SpaceX-API'>https://github.com/r-spacex/SpaceX-API</a> 🚀.
                </p>
                <br/>
                <p>
                    {
                        currentUser ? makeFriendsBtn : 'You can also sign up (with a fake email), log in, and make some friends!'
                    }
                </p>
                <br/>
                { reuseChart }
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

function ReuseChartTooltip({payload, label, active}) {
    if (active && payload && payload.length) {
        return (
            <div style={{backgroundColor: 'white', padding: '5px 5px', outline: '1px solid black'}}>
                <p>{`Flight #${payload[0].payload.flight_number} (${formatTimestamp(label)})`}</p>
                {
                    payload.map((data, i) => (
                        <p key={i}>
                            {`${removeUnderscore(data.dataKey)}: ${data.value}`}
                        </p>
                    ))
                }
            </div>
        );
    }

      return null;
}
