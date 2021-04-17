import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';
import axios from 'axios';

import { WithSidePanel, SidePanel } from '../SidePanel';
import { charts } from '../../utilities/chart-types';
import { removeUnderscore, formatTimestamp, formatYoutubeLink } from '../../utilities/utils';
import DatasetParser from '../../utilities/dataset-parser';
import { ChartContainer } from '../generics/charts/ChartContainer';
import { Loading } from '../../components/generics/Loading';
import sloth_astronaut from '../../../../assets/sloth_astronaut.jpg';
import elon from '../../../../assets/elon.jpg';

let ChartContainerWithSidePanel = WithSidePanel(ChartContainer, SidePanel)

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
        fairingsData: {
            data: [],
            xAxis: {
                key: 'date',
                label: 'Launch Date'
            },
            yAxis: {
                seriesKeys: {
                    reuse: ['fairings_reuse_count'],
                    nonReuse: ['fairings_non_reuse_count']
                },
                label: 'Count'
            }
        },
        coreData: {
            data: [],
            xAxis: {
                key: 'date',
                label: 'Launch Date'
            },
            yAxis: {
                seriesKeys: {
                    core_reuse: ['core_reuse_count', 'core_non_reuse_count']
                },
                label: 'Count'
            }
        },
        covidData: {
            data: [],
            xAxis: {
                key: 'date_of_interest',
                label: 'Date'
            },
            yAxis: {
                seriesKeys: {
                    allCases: ['case_count'],
                    bronxCases: ['bx_case_count'],
                    brooklynCases: ['bk_case_count'],
                    queensCases: ['qn_case_count'],
                    manhattanCases: ['mn_case_count'],
                    statenIslandCases: ['si_case_count']
                },
                label: 'Cases'
            }
        }
    }

    componentDidMount() {
        axios.get('https://data.cityofnewyork.us/resource/rc75-m7u3.json', {
            withCredentials: false,
            transformRequest: (data, headers) => {
                delete headers.common['csrf-token'];
            }
        })
        .then((resp) => {
            let covidData = this.state.covidData;

            let data = DatasetParser.parseCovidCasesDataset(resp.data);
            covidData.data = data;

            this.setState({
                covidData: covidData,
            });
        })
        .catch((err) => console.error(err));

        axios.get('https://api.spacexdata.com/v4/launches', {
            withCredentials: false,
            transformRequest: (data, headers) => {
                delete headers.common['csrf-token'];
            }
        })
        .then((resp) => {
            let reuseDataset = this.state.reuseData;
            let fairingsData = this.state.fairingsData;
            let coreData = this.state.coreData;

            let data = DatasetParser.parseReuseOverTimeDataset(resp.data);
            reuseDataset.data = data;
            fairingsData.data = data;
            coreData.data = data;

            this.setState({
                reuseData: reuseDataset,
                fairingsData: fairingsData,
                coreData: coreData,
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
        const { reuseData, fairingsData, coreData, covidData, loading } = this.state;
        const { currentUser } = this.props;

        let makeFriendsBtn =  (
            <div>
                Click here to get started with some friends: {"  "}
                <Button onClick={() => this.makeFriends()}>
                    Make Friends!
                </Button>
            </div>
        )

        let reuseChart = loading ? <Loading/> : (
            <ChartContainerWithSidePanel
                title='Core and fairing reuse over time'
                data={reuseData}
                chartTypes={[
                    charts.STACKED_BAR_WITH_ZOOM,
                    charts.LINE_WITH_ZOOM
                ]}
                tooltip={ReuseChartTooltip}
            >
                <LaunchDataSidePanel />
            </ChartContainerWithSidePanel>
        );

        let fairingsLineChart = loading ? <Loading/> : (
            <ChartContainer
                title='Fairing reuse over time'
                data={fairingsData}
                chartTypes={[charts.LINE_WITH_ZOOM]}
            />
        )

        let coreBarChart = loading ? <Loading/> : (
            <ChartContainerWithSidePanel
                title='Core reuse over time'
                data={coreData}
                chartTypes={[charts.STACKED_BAR_WITH_ZOOM]}
            >
                <LaunchDataSidePanel />
            </ChartContainerWithSidePanel>
        )

        let covidChart = loading ? <Loading/> : (
            <ChartContainerWithSidePanel
                title='Covid Case Count in NYC'
                data={covidData}
                chartTypes={[
                    charts.STACKED_BAR_WITH_ZOOM,
                    charts.LINE_WITH_ZOOM
                ]}
            >
                <CovidDataSidePanel />
            </ChartContainerWithSidePanel>
        );

        return (
            <div className="margins" style={{height: '105vh'}}>
                <h1>Welcome to Astronaut Sloth</h1>
                <br/>
                <p>
                    This is a small project built with React and ASP.NET Core (MVC and WebApi) with a focus on writing more modular and extendable code.
                </p>
                <p>
                    Interactive visualizations of some SpaceX launch data are shown below in different formats. Data fetched from the open-source
                    api found here: <a href='https://github.com/r-spacex/SpaceX-API'>https://github.com/r-spacex/SpaceX-API</a> 🚀.
                </p>
                <br/>
                <p>
                    {
                        currentUser ? makeFriendsBtn : 'You can also sign up (with a fake email), log in, and make some friends!'
                    }
                </p>
                <br/>
                { reuseChart }
                <br/>
                { fairingsLineChart }
                <br/>
                { coreBarChart }
                <br/>
                { covidChart }
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

function LaunchDataSidePanel({ data }) {
    if (!data) {
        return null;
    }

    let payload = data.payload
    let launch_details = payload.launch_details;
    let failureList = [];

    if (launch_details.failures.length) {
        failureList = (
            <div>
                <h5>Launch Failures</h5>
                {
                    launch_details.failures.map((failure, i) => <li key={i}>{failure.reason}</li>)
                }
            </div>
        )
    }

    let video = launch_details.media.video ? (
        <div style={{display: 'block', textAlign: 'center'}}>
            <iframe
                src={formatYoutubeLink(launch_details.media.video)}
                frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                height={325}
                width='100%'
            />
        </div>
    ) : null

    let articleLinks = [];
    let articleList = null;

    if (launch_details.media.article) {
        articleLinks.push(launch_details.media.article);
    }
    if (launch_details.media.wiki) {
        articleLinks.push(launch_details.media.wiki);
    }

    if (articleLinks.length) {
        articleList = (
            <div>
                <h5>Articles</h5>
                {
                    articleLinks.map((link, i) => <li key={i}><a href={link}>{link}</a></li>)
                }
            </div>
        )
    }

    return (
        <div style={{paddingBottom: '20px'}}>
            <h3>Launch #{payload.flight_number} ({formatTimestamp(payload.date)})</h3>
            <div>{launch_details.details}</div>
            <br/>
            {video}
            {failureList}
            <br/>
            {articleList}
        </div>
    )
}

function CovidDataSidePanel() {
    return (
        <div style={{paddingBottom: '20px'}}>
            <h3>Custom Title Goes Here</h3>
            <div>Custom content for this new dataset goes here!</div>
            <br/><br/><br/>
            <div>Something something something</div>
        </div>
    )
}