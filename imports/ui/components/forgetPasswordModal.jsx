import React,{ Component, useState }  from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";
import { withRouter } from "react-router-dom";

const ForgetPasswordModal= props  => {
    state={
        email: ''
      }
    forgetPasswordFormSubmit = e => {
        e.preventDefault();
      }
      sendResetInstructions = e => {
          e.preventDefault();
      }
      onChange = e => {
        this.setState({
          [e.target.name] : e.target.value
        })
      }
      const {email} = this.state;
        return (
            <div>
            <Modal isOpen={props.modalOpen}>
              <ModalHeader toggle={props.onModalClose}>Forgot Password?</ModalHeader>
              <ModalBody>
                Enter the Email / Phone you used when you joined and we’ll send you instructions to reset your password.
                <br />
                <br />
                For security reasons, we do NOT store your password. So rest assured that we will never send your password via Email / Phone.
                <br />
                <br />
                <Form onSubmit={this.forgetPasswordFormSubmit}>
                  <FormGroup>
                    <Label for="email">Email / Phone</Label>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      value={email}
                      onChange={this.onChange}
                      className="forgotPasswordEmailInput"
                      placeholder="Enter Email / Phone"
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <div className="container mb-3">
                <Button className="btn-block" color="success">
                    SEND
                </Button>
              </div>
            </Modal>
          </div>
        )
 
} 

export default withRouter((ForgetPasswordModal))