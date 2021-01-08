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
        await axios.post(
            '/user/login',
            user
        )
        .then((resp) => {
            successCallback(loadingMessages.connecting);
            return axios.get('/user/connect', {
                withCredentials: true
            });
        })
        .then((resp) => {
            successCallback(loadingMessages.lostProgress);
            return axios.get('/user/lose-data', {
                withCredentials: true
            });
        })
        .then((resp) => {
            successCallback(loadingMessages.gettingDatas);
            return axios.get(
                '/user/get-user-datass', {
                    withCredentials: true
                });
        })
        .then((resp) => {
            successCallback(loadingMessages.success);
        })
        .catch((err) => {
            throw err.response.data;
        });
    }

    logOut() {

    }
};

const authService = new AuthenticationService();

export default authService;