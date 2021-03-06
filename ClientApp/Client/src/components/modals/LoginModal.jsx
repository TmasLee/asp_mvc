import React, { Component } from 'react';
import { Button, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';

import { GenericModal, FormControlWithError, LoadingButton } from '../generics';
import { ModalMessage } from '../generics/ModalMessage';
import authService from '../../AuthenticationService';

/**
 * Needs clean up
 */

export default class LoginModal extends Component{
    state = {
        loading: false,
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        reenteredPassword: "",
        newUser: false,
        errors: {},
        serverResponse: null,
        serverError: null
    }

    baseState = this.state;

    resetFields = () => this.setState(this.baseState);

    resetErrors = () => this.setState({ errors: {} });

    resetAndToggleModal = () => {
        this.resetFields();
        this.resetServerResponse();
        this.props.toggleModal();
    }

    resetServerResponse = () => {
        this.setState({
            serverResponse: null,
            serverError: null
        });
    }

    autoToggle = (time = 700) => {
        setTimeout(() => {
            this.resetAndToggleModal();
        }, time);
    }

    handleNewUser = () => {
        this.resetFields();
        this.setState({ newUser: true });
    };

    handleInputOnChange = (e) => this.setState({ [e.target.name]: e.target.value });

    getDataModel = (form) => {
        if (form.newUser){
            return {
                email: form.email,
                firstName: form.firstName,
                lastName: form.lastName,
                password: form.password
            }
        }
        return {
            email: form.email,
            password: form.password
        }
    }

    handleServerError = (error) => {
        this.setState({
            serverResponse: null,
            serverError: error,
            loading: false
        });
    }

    updateLoadingMessage = (resp, isLoading=true) => {
        this.setState({
            loading: isLoading,
            serverResponse: resp,
            serverError: null
        });
    }

    validateForm = () => {
        const { email, firstName, lastName, password, reenteredPassword, newUser } = this.state;
        let errors = {};
        let isValid = true;

        if (!email){
            isValid = false;
            errors["email"] = "Please enter your email address.";
        }
        if (newUser && !firstName){
            isValid = false;
            errors["firstName"] = "Please enter your first name.";
        }
        if (newUser && !lastName){
            isValid = false;
            errors["lastName"] = "Please enter your last name.";
        }
        if (email){
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                isValid = false;
                errors["email"] = "Please enter a valid email address.";
            }
        }
        if (!password){
            isValid = false;
            errors["password"] = "Please enter your password.";
        }
        if (newUser && (password !== reenteredPassword)){
            isValid = false;
            errors["reenteredPassword"] = "Passwords don't match.";
        }

        this.setState({errors: errors});

        return isValid;
    }

    validateAndSignUp = () => {
        this.resetErrors();
        if (this.validateForm()){
            let newUser = this.getDataModel(this.state);
            let callbacks = [
                this.updateLoadingMessage,
                this.autoToggle,
                this.handleServerError
            ]
            authService.signUp(newUser, callbacks);
        }
    }

    validateAndLogin = () => {
        this.resetErrors();
        if (this.validateForm()){
            let userModel = this.getDataModel(this.state);
            let callbacks = [
                this.updateLoadingMessage,
                this.props.setUser,
                this.autoToggle,
                this.handleServerError
            ]
            authService.login(userModel, callbacks)
        }
    }

    render(){
        const { email, firstName, lastName, password, reenteredPassword, newUser,
                errors, loading, serverError, serverResponse } = this.state;

        let userOptions = (
            <div style={{float: "right", textAlign: "right"}}>
                <ForgotPasswordTooltip id={0}/>
                <br/>
                <Button variant="link" onClick={this.handleNewUser}>New User?</Button>
            </div>
        )
        let title = "Login";
        let actionButtonMsg = "Login";
        let action = this.validateAndLogin;
        let usernamePlaceholder = "Log In";

        if (newUser){
            title = "Sign Up";
            actionButtonMsg = "Register"
            action = this.validateAndSignUp;
            usernamePlaceholder = "Email"
        }

        let buttons = (
            <div>
                <Button type="submit">{actionButtonMsg}</Button>
                {' '}
                <Button variant="secondary" onClick={this.resetAndToggleModal}>Cancel</Button>
            </div>
            
            )

        if (loading){
            userOptions = null;
            buttons = <LoadingButton />;
        }

        return (
            <GenericModal
                title={title}
                toggleModal={this.resetAndToggleModal}
                loading={loading}
                showModal={this.props.showModal}
            >
                <ModalMessage error={serverError} response={serverResponse} />
                <Form onSubmit={(e)=>{e.preventDefault(); action()}}>
                    <FormControlWithError
                        required={true}
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.handleInputOnChange}
                        placeholder={usernamePlaceholder}
                        error={errors.email}
                        readOnly={loading ? true : false}
                    />
                    {
                        newUser ? (
                            <div>
                                <FormControlWithError
                                    required={true}
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={this.handleInputOnChange}
                                    placeholder="First Name"
                                    error={errors.firstName}
                                    readOnly={loading ? true : false}
                                />
                                <FormControlWithError
                                    required={true}
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    onChange={this.handleInputOnChange}
                                    placeholder="Last Name"
                                    error={errors.lastName}
                                    readOnly={loading ? true : false}
                                />
                            </div>
                        )
                        : null
                    }
                    <FormControlWithError
                        required={true}
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleInputOnChange}
                        placeholder="Password"
                        error={errors.password}
                        readOnly={loading ? true : false}
                    />
                    {
                        newUser ? (
                            <FormControlWithError
                                required={true}
                                type="password"
                                name="reenteredPassword"
                                value={reenteredPassword}
                                onChange={this.handleInputOnChange}
                                placeholder="Re-enter Password"
                                error={errors.reenteredPassword}
                                readOnly={loading ? true : false}
                            />
                        )
                        : userOptions
                    }
                    {buttons}
                    <br/>
                    {
                        !loading ? (
                            <div style={{fontSize: '14px'}}>
                                *Hint: You can sign up with any fake email address
                            </div>
                        ) : null
                    }
                </Form>
            </GenericModal>
        )
    }
}

function ForgotPasswordTooltip({id}){
    const overlay = (
        <Tooltip target={"Tooltip-" + id}>
            To do lol. Make a new user for now.
        </Tooltip>
    );
    return (
        <span>
            <OverlayTrigger
                placement="bottom"
                overlay={overlay}>
                <Button variant="link" id="Tooltip-0">
                    Forgot Password?
                </Button>
            </OverlayTrigger>
        </span>
    );
}