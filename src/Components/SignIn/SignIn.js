import React from "react";
import "./SignIn.css";
import * as firebase from "firebase";

import FormFields from "../Widgets/FormFields/FormFields";

class SignIn extends React.Component {
  state = {
    registerError: "",
    loading: false,
    formData: {
      email: {
        element: "input",
        label: true,
        labelText: "Enter your email",
        value: "",
        config: {
          type: "email",
          placeholder: "Email Id"
        },
        validation: {
          required: true,
          email: true,
          minLength: 5
        },
        valid: false,
        touched: false,
        errorMessage: ""
      },

      password: {
        element: "input",
        label: true,
        labelText: "Enter Password",
        value: "",
        config: {
          type: "password",
          placeholder: "Password"
        },
        validation: {
          required: true,
          minLength: 5
        },
        valid: false,
        touched: false,
        errorMessage: ""
      }
    }
  };

  updateFormData = ({ event, id, blur }) => {
    let newFormData = { ...this.state.formData }; //getting the complete form data.
    let newElement = { ...newFormData[id] }; // Getting the element email/ password.
    //changing the new element value
    newElement = { ...newElement, value: event.target.value };

    //Performing validation before setting the state
    if (blur) {
      let valid = this.validateElement(newElement);
      newElement = {
        ...newElement,
        valid: valid[0],
        errorMessage: valid[1],
        touched: true
      };
    }

    //changing the email/password key inside newformData
    newFormData = { ...newFormData, [id]: newElement };

    this.setState({ formData: { ...this.state.formData, ...newFormData } });
  };

  validateElement(element) {
    let error = [true, ""];
    let message = "";

    if (element.validation.email) {
      let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/gim;

      let valid = regex.test(element.value.trim());
      message = `${!valid ? "Invalid Email" : ""}`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.minLength) {
      let valid = element.value.length >= element.validation.minLength;
      message = `${!valid ? "Must be greater than 5" : ""}`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
      let valid = element.value.trim() !== "";
      message = `${!valid ? "This field is required" : ""}`;
      error = !valid ? [valid, message] : error;
    }

    return error;
  }

  handleFormSubmit = (e, type) => {
    let dataToSubmit = {};
    let valid = true;

    if (type !== "direct-submit") {
      for (let x in this.state.formData) {
        valid = this.state.formData[x].valid && valid;
      }

      if (valid) {
        this.setState({ loading: true });

        for (let x in this.state.formData) {
          dataToSubmit = { ...dataToSubmit, [x]: this.state.formData[x].value };
        }

        if (type === "register") {
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              dataToSubmit.email,
              dataToSubmit.password
            )
            .then(() => this.props.history.push("/"))
            .catch(err =>
              this.setState({
                loading: false,
                registerError: err.message
              })
            );
        } else {
          firebase
            .auth()
            .signInWithEmailAndPassword(
              dataToSubmit.email,
              dataToSubmit.password
            )
            .then(() => this.props.history.push("/"))
            .catch(err =>
              this.setState({
                loading: false,
                registerError: err.message
              })
            );
        }
      }
    }

    e.preventDefault();
  };

  showButtons = () => {
    if (!this.state.loading) {
      return (
        <div>
          <button
            type="submit"
            onClick={e => this.handleFormSubmit(e, "login")}
          >
            Login
          </button>
          <button
            type="submit"
            onClick={e => this.handleFormSubmit(e, "register")}
          >
            Register
          </button>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  showRegisterError = () => {
    return this.state.registerError !== "" ? (
      <div style={{ color: "red" }} className="mt-3">
        {this.state.registerError}
      </div>
    ) : (
      ""
    );
  };

  handleInputError = element => {
    if (element.touched) {
      if (element.errorMessage !== "") {
        return <div className="error-msg">{element.errorMessage}</div>;
      }
    } else return null;
  };

  render() {
    return (
      <React.Fragment>
        <h1>Login / Register</h1>

        <form className="sign-in-form" onSubmit={e => this.handleFormSubmit(e, "direct-submit")}>
          <FormFields
            id="email"
            formData={this.state.formData.email}
            change={element => this.updateFormData(element)}
            blur={element => this.updateFormData(element)}
            showError={this.handleInputError}
          />

          <FormFields
            id="password"
            formData={this.state.formData.password}
            change={element => this.updateFormData(element)}
            blur={element => this.updateFormData(element)}
            showError={this.handleInputError}
          />

          {this.showButtons()}
          {this.showRegisterError()}
        </form>
      </React.Fragment>
    );
  }
}
export default SignIn;
