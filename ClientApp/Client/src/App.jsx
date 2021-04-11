import React, { Component } from 'react';
import { Route } from 'react-router';
import { hot } from 'react-hot-loader';
import "core-js/stable";
import "regenerator-runtime/runtime";

import authService from './AuthenticationService';
import { Layout } from './components/Layout';
import {
    Home,
    User,
    Catalogue
} from './components/pages';
import { PageWithSidePanel, LaunchDataSidePanel } from './components/SidePanel';
import '../../css/App.css';

let HomePageWithSidePanel = PageWithSidePanel(Home);

class App extends Component {
    state = {
        currentUser: null,
        connection: null,
    }

    async componentDidUpdate(prevProps, prevState){
        if ((prevState.currentUser !== this.state.currentUser) && this.state.currentUser){
            await this.connect();
        }
    }

    async componentDidMount(){
        let user = await authService.retrieveUser();
        this.setUser(user);
    }

    async connect(){
        let connection = new signalR.HubConnectionBuilder()
            .withUrl("/friendshub")
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        await connection.start()
            .then(() => {
                console.log("Connected");
            })
            .catch((err)=>{
                console.error(err);
            });

        this.setConnection(connection);
    }

    setUser = (user) => {
        this.setState({ currentUser: user });
    }

    setConnection = (connection) => {
        this.setState({ connection: connection});
    }

    handleLogout = () => {
        authService.logout();
        this.setUser(null);
        this.state.connection.stop();
        this.setConnection(null);
    }

    render(){
        return (
            <Layout setUser={this.setUser}
                    handleLogout={this.handleLogout}
                    {...this.state}>
                <Route
                    exact path='/'
                    render={(props) => (
                        <HomePageWithSidePanel currentUser={this.state.currentUser}>
                            <LaunchDataSidePanel />
                        </HomePageWithSidePanel>
                    )}
                />
                <Route path='/catalogue' render={(props) => (
                        <Catalogue currentUser={this.state.currentUser}/>
                    )}
                />
                <Route path='/user/:id' component={User} />
            </Layout>
        );
    }
}

export default hot(module)(App);