import React, { Component, cloneElement, Fragment } from 'react';

// CALCULATE COST SAVINGS?
// Side panel for different charts dont display in order they are opened
export function WithSidePanel(ChartContainer) {
    return class extends Component {
        state = {
            hidden: true,
            data: null
        }

        setHidden = () => this.setState({ hidden: !this.state.hidden });

        getSidePanelData = (deets) => {
            if (deets){
                this.setState({
                    data: deets[0],
                    hidden: false
                });
            }
        }

        render() {
            let { hidden, data } = this.state;
            return (
                <Fragment>
                    <SidePanel hidden={hidden} setHidden={this.setHidden}>
                        {cloneElement(this.props.children, {data: data})}
                    </SidePanel>
                    <ChartContainer {...this.props} getSidePanelData={this.getSidePanelData}/>
                </Fragment>
            );
        }
    }
}

export function SidePanel({ hidden, setHidden, children }) {
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