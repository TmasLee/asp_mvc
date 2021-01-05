import axios from 'axios';
import { loadingMessages } from './utilities/messages';

class AuthenticationService {
    user = null;

    getUser() {

    }

    async signUp(newUser, successCallback) {
        await axios.post(
            '/User/SignUp',
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
            '/User/Login',
            user
        )
        .then((resp) => {
            successCallback(loadingMessages.connecting);
            return axios.get('/User/ConnectToServices', {
                withCredentials: true
            });
        })
        .then((resp) => {
            successCallback(loadingMessages.lostProgress);
            return axios.get('/User/LoseData', {
                withCredentials: true
            });
        })
        .then((resp) => {
            successCallback(loadingMessages.gettingDatas);
            return axios.get(
                '/User/GetUserDatas', {
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