import React, { Component, cloneElement, Fragment } from 'react';

// CALCULATE COST SAVINGS?
export function WithSidePanel(ChartContainer) {
    return class extends Component {
        state = {
            hidden: true,
            panelData: null
        }

        componentDidUpdate(prevProps, prevState) {
            if (prevProps.activePanel !== this.props.activePanel && this.props.activePanel !== this.props.panelId) {
                this.setState({hidden: true});
            }
        }

        setHidden = () => this.setState({ hidden: !this.state.hidden });

        getSidePanelData = (deets) => {
            let { panelId, setActivePanel } = this.props;
            if (deets){
                setActivePanel(panelId);
                this.setState({
                    panelData: deets[0],
                    hidden: false
                });
            }
        }

        render() {
            let { hidden, panelData } = this.state;
            let { panelId, activePanel, setActivePanel, ...chartProps } = this.props;

            return (
                <Fragment>
                    <SidePanel hidden={hidden} setHidden={this.setHidden}>
                        {cloneElement(this.props.children, {data: panelData})}
                    </SidePanel>
                    <ChartContainer {...chartProps} getSidePanelData={this.getSidePanelData}/>
                </Fragment>
            );
        }
    }
}

export function SidePanel({ hidden, setHidden, children }) {
    if (!hidden) {
        return (
            <div className={'side-panel border-left border-bottom border-top box-shadow'}>
                <div style={{width: '100%', height: '30px', display: 'block'}}>
                    <button className='close-btn' onClick={setHidden}>
                        <i className="fa fa-times" style={{color: 'black'}}></i>
                    </button>
                </div>
                {children}
            </div>
        )
    }
    return null;
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