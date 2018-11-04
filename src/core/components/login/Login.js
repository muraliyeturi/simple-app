import React from "react";
import "./Login.scss";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";

import constants from "../../../common/constants";

import CreateUser from "../register/CreateUser";

import "react-notifications/lib/notifications.css";
import { connect } from "react-redux";

import { loginService } from "../../../actions/login";

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "95%"
  }
});

var renderedComponent = null;

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.state = {
      open: true,
      username: "",
      password: "",
      validUserName: false,
      validPassword: false,
      loginError: ""
    };
  }

  submitHandler = () => {
    const userObj = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.dispatch(loginService(userObj));
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.validate(name, value);
    this.setState({ [name]: value });
    this.setState({ loginError: "" });
  };

  validate = (name, value) => {
    switch (name) {
      case "username":
        let isValidEmail = value.match(
          new RegExp(
            "^\\w+([\\.-]?\\w+)*(\\b@" + constants.emailDomain + "\\b)+$"
          )
        );
        this.setState({ validUserName: isValidEmail === null });
        break;
      case "password":
        this.setState({ validPassword: value == "" });
        break;
    }
  };

  componentDidUpdate(props) {
    if (this.props.loginResponse && this.props.loginResponse.success === true) {
      window.localStorage.setItem("currentUser", true);
      this.props.sendData(this.props.loginResponse.success);
    }
  }

  getData = userId => {
    renderedComponent = null;
    if (userId != null) {
      this.props.sendData(true);
      NotificationManager.success("User Created Successfully.", userId, 10000);
    } else {
      this.forceUpdate();
    }
  };

  createUserHandler = () => {
    renderedComponent = (
      <Dialog
        open={true}
        aria-labelledby="signup"
        aria-describedby="create user account to login"
      >
        <DialogTitle id="alert-dialog-title-signup">
          {"Sign up for new Account"}
        </DialogTitle>
        <DialogContent>
          <CreateUser sendData={this.getData} />;
        </DialogContent>
      </Dialog>
    );
    this.forceUpdate();
  };

  render() {
    const { classes } = this.props;
    if (renderedComponent === null) {
      return (
        <div>
          <Dialog
            open={this.state.open}
            aria-labelledby="Login"
            aria-describedby="login to access application"
          >
            <DialogTitle id="alert-dialog-title">{"Login"}</DialogTitle>
            <DialogContent>
              <FormControl
                aria-describedby="enter user name"
                error={this.state.validUserName}
                className={classes.formControl}
              >
                <InputLabel htmlFor="username-error">UserName</InputLabel>
                <Input
                  id="username-error"
                  onChange={this.handleChange}
                  name="username"
                />
                {this.state.validUserName ? (
                  <FormHelperText id="username-error-text">
                    Enter valid User name
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl
                aria-describedby="enter password"
                error={this.state.validPassword}
                className={classes.formControl}
              >
                <InputLabel htmlFor="password-error">Password</InputLabel>
                <Input
                  id="password-error"
                  onChange={this.handleChange}
                  name="password"
                  type="password"
                />
                {!this.state.password ? (
                  <FormHelperText id="password-error-text">
                    Enter valid Password
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              {this.props.loginResponse ? (
                <p className="errorMessage">
                  {this.props.loginResponse.message}
                </p>
              ) : (
                ""
              )}
              <p className="forgotPassword">
                <a href="">Forgot password</a>
              </p>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.submitHandler}
                color="primary"
                variant="contained"
                component="span"
                className={classes.button}
              >
                Login
              </Button>

              <Button color="secondary" onClick={this.createUserHandler}>
                Click to Sign Up..!
              </Button>
            </DialogActions>
          </Dialog>
          <NotificationContainer />
        </div>
      );
    } else {
      return renderedComponent;
    }
  }
}

const mapStateToProps = state => {
  return {
    loginResponse: state.loginReducer.result
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Login));
