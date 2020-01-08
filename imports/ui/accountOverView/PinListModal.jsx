import React from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalBody,
  Container,
  Label,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "reactstrap";

const PinListModal = props => {
  return (
    <div>
      <Modal isOpen={props.toggle} toggle={props.toggle}>
        <div className="p-3 d-flex justify-content-between">
          <h5>Add a new address to your PIN list</h5>
          <i
            className="fas fa-times float-right cursor-pointer"
            onClick={props.onModalClose}
          />
        </div>
        <ModalBody>
          <Container className={" mb-4  myAccountForSigninform pinList "}>
            <Container className={"mt-4 mb-4"}>
              <Row className="justify-content-center align-items-center mb-3">
                <Col className="col-4">
                  <Label>ANT Address</Label>
                </Col>
                <Col className="col-8">
                  <input className="form-control" />
                </Col>
              </Row>
              <Row className="justify-content-center align-items-center mb-3">
                <Col className="col-4">
                  <Label>Description</Label>
                </Col>
                <Col className="col-8">
                  <input className="form-control" />
                </Col>
              </Row>
              <div className="text-secondary mb-3 text-center">
                <small>
                  you can monitor and receive alert when address on you pin list
                  receives an incoming ANT Transaction
                </small>
              </div>

              <div>
                <div className="mb-3">
                  <strong>Select your notification type</strong>
                </div>
                <div className="d-flex align-items-center mb-1">
                  <input type="checkbox" className="rounded" />
                  <span className="ml-4">No notification</span>
                </div>
                <div className="d-flex align-items-center mb-1">
                  <input type="checkbox" className="rounded" />
                  <span className="ml-4">
                    Notify on Incoming & Outgoing Txnxs
                  </span>
                </div>
                <div className="d-flex align-items-center mb-1">
                  <input type="checkbox" className="rounded" />
                  <span className="ml-4">
                    Notify on Incoming (Receive) Txns Only
                  </span>
                </div>
                <div className="d-flex align-items-center mb-1">
                  <input type="checkbox" className="rounded" />
                  <span className="ml-4">
                    Notify on Outgoig (Sent) Txns Only
                  </span>
                </div>
                <button className="btn confirmBtn pt-1 pb-1 pl-3 pr-3 mt-1">
                  Confirm
                </button>
              </div>
            </Container>
          </Container>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PinListModal;
