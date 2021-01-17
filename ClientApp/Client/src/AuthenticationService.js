import axios from 'axios';
import { loadingMessages } from './utilities/messages';
import { getCsrfToken } from './utilities/utils';

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
        let config;

        successCallback(loadingMessages.authenticating);

        await axios.post(
            '/authentication/authenticate',
            user
        )
        .then((resp) => {
            return axios.get('/authentication/antiforgery');
        })
        .then((resp) => {
            let csrfToken = getCsrfToken();
            config = {
                headers: {
                    'csrf-token': csrfToken
                }
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
            return axios.get('/user/get-user-datass', config);
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