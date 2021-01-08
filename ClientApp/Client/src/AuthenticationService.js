import axios from 'axios';
import { loadingMessages } from './utilities/messages';

class AuthenticationService {
    user = null;

    getUser() {

    }

    async signUp(newUser, successCallback) {
        await axios.post(
            '/user/signup',
            newUser
        )
        .then((resp) => {
            successCallback(loadingMessages.registered, false);
        })
        .catch((err) => {
            throw err.response.data;
        });
    }

    async logIn(user, successCallback) {
        var config;

        successCallback(loadingMessages.authenticating);

        await axios.post(
            '/authentication/authenticate',
            user
        )
        .then((resp) => {
            config = {
                headers: { Authorization: `Bearer ${resp.data}` }
            }
            successCallback(loadingMessages.connecting);
            return axios.get('/user/connect', config);
        })
        .then((resp) => {
            successCallback(loadingMessages.lostProgress);
            return axios.get('/user/lose-data', config);
        })
        .then((resp) => {
            successCallback(loadingMessages.gettingDatas);
            return axios.get(
                '/user/get-user-datass', config);
        })
        .then((resp) => {
            successCallback(loadingMessages.success);
        })
        .catch((err) => {
            throw err.response;
        });
    }

    logOut() {

    }
};

const authService = new AuthenticationService();

export default authService;