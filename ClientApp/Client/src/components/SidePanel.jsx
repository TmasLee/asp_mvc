import React, { Component, cloneElement, Fragment, useState, useEffect } from 'react';
import { formatTimestamp, formatYoutubeLink } from '../utilities/utils';

// CALCULATE COST SAVINGS?
export function PageWithSidePanel(Page) {
    return class extends Component {
        state = {
            hidden: true,
            data: null
        }

        setHidden = () => this.setState({ hidden: !this.state.hidden });

        // Probably passing this method down to Page components is bad
        getDataPoint = (deets) => {
            this.setState({
                data: deets[0],
                hidden: false
            });
        }

        render() {
            let { hidden, data } = this.state;
            return (
                <div>
                    <SidePanel hidden={hidden} setHidden={this.setHidden}>
                        {cloneElement(this.props.children, {data: data})}
                    </SidePanel>
                    <Page {...this.props} getDataPoint={this.getDataPoint}/>
                </div>
            );
        }
    }
}

function SidePanel({ hidden, setHidden, children }) {
    let hide =  hidden ? 'hide' : 'show';
    return (
        <div className={'side-panel border-left border-bottom border-top box-shadow ' + hide}>
            <div style={{width: '100%', height: '30px', display: 'block'}}>
                <button className={'close-btn ' + hide} onClick={setHidden}>
                    <i className="fa fa-times" style={{color: 'black'}}></i>
                </button>
            </div>
            {children}
        </div>
    )
}

export function LaunchDataSidePanel({ data }) {
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
                    <div>
                        <iframe
                            src={formatYoutubeLink(launch_details.media.video)}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                            height={275}
                            width={365}
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
        <div>
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


// HOC to add data fetching to components when needed
export function WithDataFetcher(Component, url) {
    return class extends Component {
        state = {
            data: []
        }

        // For automatic data refetch?
        componentDidUpdate() {}

        render() {
            return(
                <div>

                </div>
            )
        }
    }
}