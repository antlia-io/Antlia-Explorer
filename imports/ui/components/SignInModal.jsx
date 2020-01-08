import React from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, Container } from "reactstrap";

const SignInModal = props => {
  console.log("PROPS:", props);
  return (
    <div>
      <Modal isOpen={props.toggle} toggle={props.toggle}>
        <div className="p-3">
          <i
            className="fas fa-times float-right cursor-pointer"
            onClick={props.onModalClose}
          />
        </div>
        <ModalBody>
          <Container className={"mt-1 mb-4 border"}>
            <Container>
              <div className="border-bottom mt-4 mb-4">
                {" "}
                <h2>Shakil Muhammad</h2>
                <h5 className="text-secondary">ali.rnssol@gmail.com</h5>
              </div>
              <div>
                <div className="d-flex align-items-center mb-4">
                  <i className="fas fa-user-circle  logoutModalIcon"></i>
                  <Link to={"/my-account"} className={"Links"}>
                    <h4 className="ml-4 mb-0">My account</h4>
                  </Link>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <i className="fas fa-user-circle logoutModalIcon"></i>
                  <Link to={"/my-account/pin-list"} className={"Links"}>
                    <h4 className="ml-4 mb-0">Pin list</h4>
                  </Link>
                </div>
                {/* 
                <div className="d-flex align-items-center mb-4">
                  <i
                    className="fas fa-user-circle logoutModalIcon"
                    logoutModalIcon
                  ></i>
                  <Link to={"/my-account/private-notes"} className={"Links"}>
                    <h4 className="ml-4 mb-0">TXN private Notes</h4>
                  </Link>
                </div> */}
                <div className="d-flex align-items-center mb-4">
                  <i className="fas fa-user-circle logoutModalIcon"></i>
                  <Link to={"/my-account/sign-out"} className={"Links"}>
                    <h4 className="ml-4 mb-0">Sign out</h4>
                  </Link>
                </div>
              </div>
            </Container>
          </Container>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SignInModal;
