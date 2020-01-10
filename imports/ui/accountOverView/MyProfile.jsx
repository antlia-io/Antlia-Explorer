import React, { useState } from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from "reactstrap";

function MyProfile(props) {
  const [imageSrc, setImageSrc] = useState("/img/userDp.png");
  //  when image is selected
  const onImageSelect = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    setImageSrc(reader.result);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <Container className={"myAccountForSigninform"}>
            <Row>
              <Col md={6} lg={6} sm={6}>
                <h2 className="text-secondary mb-4">My Profile</h2>
                <FormGroup className="position-relative">
                  <Label>Name</Label>
                  <input className="form-control" type="text" />
                  <i className="position-absolute fas fa-user-circle" />
                </FormGroup>
                <FormGroup className="position-relative">
                  <Label>Email</Label>
                  <input className="form-control" type="email" />
                  <i className="position-absolute fas fa-envelope-open" />
                </FormGroup>
                <FormGroup className="position-relative">
                  <Label>Password</Label>
                  <input className="form-control" type="password" />
                  <i className="position-absolute fas fa-lock" />
                </FormGroup>
                <button className="btn p-1">DELETE ACCOUNT</button>
              </Col>
              <Col md={6} lg={6} sm={6} className="mt-4 mb-4">
                <div className="text-center">
                  <img alt={"user dp"} src={imageSrc} className="userDp" />
                  <div className="mt-4 mb-4">
                    <span>Upload a different photo</span>
                    <br></br>
                    <input
                      type="file"
                      className="d-none"
                      id="imageButton"
                      onChange={onImageSelect}
                    />
                    <label
                      className="btn mt-2 mb-2 p-1 text-white"
                      htmlFor="imageButton"
                    >
                      Choose Image
                    </label>

                    <br></br>
                    <small className="text-danger">Remove Image</small>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Container className={"myAccountForSigninform"}>
            <Row>
              <Col md={6} lg={6} sm={6}>
                <h2 className="text-secondary mb-4">Notification</h2>
                <div className={"mt-4 mb-4"}>
                  <span>PIN Transaction status</span>
                  <br />
                  <small>
                    Receive notification for New Transaction on all PIN users
                  </small>
                </div>
              </Col>
              <Col md={6} lg={6} sm={6}>
                <h2 className="text-secondary mb-4">Explorer address URL</h2>
                <div className={"mt-4 mb-4"}>
                  <span>Address</span>
                  <br />
                  <small>
                    <a className="text-primary">
                      cosmos1p0kljdkajine342lk4j3342jl34k2i345e
                    </a>
                  </small>
                </div>
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </div>
  );
}

export default MyProfile;
