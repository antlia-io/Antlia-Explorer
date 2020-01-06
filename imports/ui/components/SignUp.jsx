import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class SignUp extends Component {
  //  Google Authetication
  responseGoogle = response => {
    console.log(response);
  };

  // facebook Authetication
  responseFacebook = response => {
    console.log(response);
  };
  render() {
    return (
      <React.Fragment>
        <Row className="mainContainer mt-0">
          <Col
            sm={6}
            md={6}
            lg={6}
            id={"signInImageContainerColumn"}
            className={"pl-0"}
          >
            <div className="d-flex justify-content-center align-items-center signUpImageContainer">
              <div className="signInImageText">
                <h3>Welcome to Explorer.</h3>
                <h1>
                  Make sure your account is secure
                  <br /> secure
                </h1>
              </div>
            </div>
          </Col>
          <Col
            xs={11}
            sm={10}
            md={10}
            lg={5}
            className="position-relative formColumn"
            id={"formColumn"}
          >
            <Container className={"pr-0 pl-0"}>
              <div
                className="container containerForSigninform pr-0 pl-0"
                id={"containerForSigninform"}
              >
                <img
                  className="antaliaSvg"
                  src={"/img/antlia-logo.jpg"}
                  alt={"Antlia"}
                />
                <div className={"d-none"} id={"svgReplacement"}>
                  <h3>Welcome to Explorer.</h3>
                  <h1>
                    Make sure your account is secure
                    <br />
                    secure
                  </h1>
                </div>
                <Form onSubmit={e => e.preventDefault()}>
                  <FormGroup>
                    <Label for="exampleEmail">Email / Mobile</Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="example@example.com"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="Enter password..."
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Confirm Password</Label>
                    <Input
                      type="password"
                      name="password"
                      // id="examplePassword"
                      placeholder="Confirm Password..."
                    />
                  </FormGroup>

                  <Button className="btn-block" id={"createAdressBtn"}>
                    CREATE ADDRESS
                  </Button>
                </Form>

                <Row className="mt-4">
                  <Col xs={12} md={12} sm={12} lg={6}>
                    <GoogleLogin
                      clientId="501755889014-btls89ktsuijoj5c1lrrjvtr3jmg1fba.apps.googleusercontent.com"
                      buttonText="Sign in with google"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      cookiePolicy={"single_host_origin"}
                      id={"googleLoginButton"}
                    />
                  </Col>
                  <Col xs={11} md={12} sm={12} lg={6}>
                    <FacebookLogin
                      appId="1007814429617488"
                      autoLoad={true}
                      fields="name,email,picture"
                      onClick={this.componentClicked}
                      callback={this.responseFacebook}
                      className="facebookLoginButton"
                      buttonText="Login"
                      icon="fab fa-facebook-square"
                    />
                  </Col>
                </Row>
                <div className="mt-3 mb-3">
                  <small>Already have an account? </small>
                  <Link to={"/sign-in"}>
                    {" "}
                    <strong id={"signUpText"}>Sign In</strong>
                  </Link>
                </div>
              </div>
            </Container>
          </Col>
          <Col xs={1} sm={1}>
            <div>
              <Link to="/">
                <i className="fas fa-chevron-left signInSignUpArrowIcon"></i>
              </Link>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default SignUp;
