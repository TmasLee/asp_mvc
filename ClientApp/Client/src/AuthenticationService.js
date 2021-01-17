import axios from 'axios';
import { loadingMessages } from './utilities/messages';

axios.defaults.withCredentials = true;

class AuthenticationService {
    user = null;

    getUser() {

    }

    async signUp(newUser, successCallback) {
        successCallback(loadingMessages.signingUp);

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
            successCallback(loadingMessages.connecting);
            return axios.get('/user/connect');
        })
        .then((resp) => {
            successCallback(loadingMessages.lostProgress);
            return axios.get('/user/lose-data');
        })
        .then((resp) => {
            successCallback(loadingMessages.gettingDatas);
            return axios.get(
                '/user/get-user-datass');
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