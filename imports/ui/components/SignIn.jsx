import React, { Component } from "react";
import { Link } from "react-router-dom";
import {signUp} from "../../api/signup/signup.js";
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
import ForgetPasswordModal from "./forgetPasswordModal.jsx";

class SignIn extends Component {
  state={
    email: '',
    password: '',
    message: '',
    modalOpen: false
  }
  //  Google Authetication
  responseGoogle = response => {
    console.log(response);
    this.props.history.push('/')
  };

  // facebook Authetication
  responseFacebook = response => {
    console.log(response);
    this.props.history.push('/')
  };

  signInFormSubmit = e => {
    e.preventDefault();
    var {email, password} =  this.state;
    const existing = signUp._collection.findOne({email:email, password:password});
    if(!existing){
      this.setState({
        message: 'User Not Found'
      })
      return
    }
    this.props.history.push('/')
  }

  onChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }


  //  on label clicked

  onForgetPassword = e => this.setState({modalOpen:!this.state.modalOpen})
  render() {
    const {email,password,message, modalOpen} = this.state;
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
            <div className="d-flex justify-content-center align-items-center  signInImageContainer">
              <div className="signInImageText">
                <h1>
                  Welcome back. <br />
                  Good afternoon!
                </h1>
              </div>
            </div>
          </Col>
          <Col
            xs={11}
            sm={10}
            md={10}
            lg={5}
            className="position-relative  formColumn"
            id={"formColumn"}
          >
            <Container className={"pr-0 pl-0"}>
              <div className="container containerForSigninform pr-0 pl-0">
                <div className={"d-none"} id={"svgReplacement"}>
                  {" "}
                  {/* <h1>Welcome back.</h1> */}
                  <h1 className={"mb-4"}> Good afternoon! Welcome back. </h1>
                </div>
                <img
                  className="antaliaSvg"
                  src={"/img/antlia-logo.jpg"}
                  alt={"Antlia"}
                />
                <Form onSubmit={this.signInFormSubmit}>
                  <FormGroup>
                    <Label for="email">Email / Mobile</Label>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      value={email}
                      onChange={this.onChange}
                      placeholder="example@example.com"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Label className="float-right" onClick={this.onForgetPassword}>Forget Password?</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={this.onChange}
                      placeholder="Enter password..."
                    />
                  </FormGroup>
                  {message && <div className="text-center"><span className="text-danger">{message}</span></div>}
                  <Button className="btn-block" color="success">
                    LOGIN
                  </Button>{" "}
                  <Link to={"/sign-up"}>
                    {" "}
                    <Button className="btn-block mt-2" id={"createAdressBtn"}>
                      CREATE ADDRESS
                    </Button>
                  </Link>
                </Form>
                <Row className="mt-4"><Col lg={12}><div className="line"><span>OR</span></div></Col></Row>
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
                  <Col xs={12} md={12} sm={12} lg={6}>
                    <FacebookLogin
                      appId="1007814429617488"
                      // autoLoad={true}
                      fields="name,email,picture"
                      onClick={this.componentClicked}
                      callback={this.responseFacebook}
                      className="facebookLoginButton"
                      textButton="Sign in with Facebook"
                      // buttonText="Login"
                      icon="fab fa-facebook-square"
                    />
                  </Col>
                </Row>
                {/* <div className="mt-4 d-flex"></div> */}
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
        <ForgetPasswordModal modalOpen= {modalOpen} history={this.props.history.push('/sign-in')}/>
      </React.Fragment>
    );
  }
}

export default SignIn;
