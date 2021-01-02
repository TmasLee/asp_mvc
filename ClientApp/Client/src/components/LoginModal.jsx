import React, { Component } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { FormModal, FormControlWithError } from './generics';

// Clean up code
export class LoginModal extends Component{
    state = {
        email: "",
        firstName: "",
        lastName: "",
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

    // Seems like this should be in FormModal - maybe extend FormModal
    validateForm = () => {
        const { email, firstName, lastName, password, reenteredPassword, newUser } = this.state;
        let errors = {};
        let isValid = true;

        // Probably need server side validation too
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
            this.props.handleSignUp(newUser);
        }
    }

    validateAndLogin = () => {
        this.resetErrors();
        if (this.validateForm()){
            let user = this.getDataModel(this.state);
            this.props.handleLogin(user);
        }
    }

    render(){
        const { email, firstName, lastName, password, reenteredPassword, newUser, errors } = this.state;

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
                       primaryButtonMsg={primaryButtonMsg}
                       resetAndToggleModal={this.resetAndToggleModal}
                       action={action}
                       {...this.props}>
                <FormControlWithError required={true}
                                      type="text"
                                      name="email"
                                      value={email}
                                      onChange={this.handleInputOnChange}
                                      placeholder="Email"
                                      error={errors.email}/>
                {
                    newUser ? (
                        <div>
                            <FormControlWithError required={true}
                                      type="text"
                                      name="firstName"
                                      value={firstName}
                                      onChange={this.handleInputOnChange}
                                      placeholder="First Name"
                                      error={errors.firstName}/>
                            <FormControlWithError required={true}
                                      type="text"
                                      name="lastName"
                                      value={lastName}
                                      onChange={this.handleInputOnChange}
                                      placeholder="Last Name"
                                      error={errors.lastName}/>
                        </div>
                    )
                    : null
                }
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
                            <FormControlWithError required={true}
                                      type="password"
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