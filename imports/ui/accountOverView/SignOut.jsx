import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";

export default function SignOut() {
  return (
    <div className="signOutComponent">
      <Card>
        <CardBody>
          <Row className="m-auto text-center">
            <Col>
              <h2 className="text-secondary mt-3 mb-4">Account Overview</h2>
              <div className="text-center">
                <img
                  alt={"user dp"}
                  src={"/img/userDp.png"}
                  className="userDp"
                />
                <div className="mt-4 mb-4"></div>
              </div>
            </Col>
          </Row>
          <div className="text-center">
            <input type="email" />
            <br></br>
            <button className={"btn logOutBtn pt-2 pb-2 pl-4 pr-4 mt-3 mb-4"}>
              LOGOUT
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
