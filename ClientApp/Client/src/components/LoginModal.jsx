import React, { Component } from 'react';
import { Alert, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { FormModal, FormControlWithError } from './generics';

// Clean up the code
export class LoginModal extends Component{
    state = {
        email: "",
        password: "",
        reenteredPassword: "",
        newUser: false,
        errors: {},
    }

    baseState = this.state;

    resetFields = () => {
        this.setState(this.baseState);
    }

    resetErrors = () => this.setState({errors: {}});

    resetAndToggleModal = () => {
        this.resetFields();
        this.props.toggleModal();
    }

    handleNewUser = () => {
        this.resetFields();
        this.setState({ newUser: true })
    };

    handleInputOnChange = (e) => this.setState({ [e.target.name]: e.target.value });

    // Seems like this should be in FormModal
    validateForm = () => {
        const { email, password, reenteredPassword, newUser } = this.state;
        let errors = {};
        let isValid = true;

        if (!email){
            isValid = false;
            errors["email"] = "Please enter your email address.";
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
        if ((password !== reenteredPassword) && (newUser)){
            isValid = false;
            errors["reenteredPassword"] = "Passwords don't match.";
        }

        this.setState({errors: errors});

        return isValid;
    }

    validateAndSignUp = () => {
        this.resetErrors();
        if (this.validateForm()){
            this.props.handleSignUp();
        }
    }

    validateAndLogin = () => {
        this.resetErrors();
        if (this.validateForm()){
            this.props.handleLogin();
        }
    }

    render(){
        const { email, password, reenteredPassword, newUser, errors } = this.state;
        const { showModal, serverError } = this.props;

        let title = "Login";
        let primaryButtonMsg = "Login";
        let action = this.validateAndLogin;

        if (newUser){
            title = "Sign Up";
            primaryButtonMsg = "Register";
            action = this.validateAndSignUp;
        }

        return (
            <FormModal title={title}
                              showModal={showModal}
                              primaryButtonMsg={primaryButtonMsg}
                              resetAndToggleModal={this.resetAndToggleModal}
                              action={action}>
                {serverError ? <Alert variant="warning">{serverError}</Alert>
                : null}
                <FormControlWithError required={true}
                                      type="text"
                                      name="email"
                                      value={email}
                                      onChange={this.handleInputOnChange}
                                      placeholder="Email"
                                      error={errors.email}/>
                <br/>
                <FormControlWithError required={true}
                                      type="password"
                                      name="password"
                                      value={password}
                                      onChange={this.handleInputOnChange}
                                      placeholder="Password"
                                      error={errors.password}/>
                {
                    newUser ? (
                        <div>
                            <br/>
                            <FormControlWithError required={true}
                                      type="reenteredPassword"
                                      name="reenteredPassword"
                                      value={reenteredPassword}
                                      onChange={this.handleInputOnChange}
                                      placeholder="Re-enter Password"
                                      error={errors.reenteredPassword}/>
                        </div>
                    )
                    : (
                        <div style={{float: "right", textAlign: "right"}}>
                            <ForgotPasswordTooltip id={0}/>
                            <br/>
                            <Button variant="link" onClick={this.handleNewUser}>New User?</Button>
                        </div>)
                }
            </FormModal>
        )
    }
}

const ForgotPasswordTooltip = ({id}) => {
    return (
      <span>
        <OverlayTrigger placement="bottom"
                        overlay={
                            <Tooltip target={"Tooltip-" + id}>
                                To do lol. Make a new user for now.
                            </Tooltip>
                        }>
            <Button variant="link" id="Tooltip-0">
                Forgot Password?
            </Button>
        </OverlayTrigger>
      </span>
    );
}