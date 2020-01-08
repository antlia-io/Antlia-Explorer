import React,{ Component }  from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";

const ForgetPasswordModal= props  => {
    state={
        email: ''
      }
      console.log(props,"=======")
    forgetPasswordFormSubmit = e => {
        e.preventDefault();
      }
      sendResetInstructions = e => {
          e.preventDefault();
        //   props.history
          
      }
      onChange = e => {
        this.setState({
          [e.target.name] : e.target.value
        })
      }
      const {email} = this.state;
        return (
            <div>
            <Modal isOpen={props.modalOpen} toggle={props.modalOpen} className={""}>
              <ModalHeader toggle={props.modalOpen}>Modal title</ModalHeader>
              <ModalBody>
                Forgot Password?
                Enter the email address you used when you joined and we’ll send you instructions to reset your password.

                For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.
                <Form onSubmit={this.forgetPasswordFormSubmit}>
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
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.sendResetInstructions}>Send</Button>
              </ModalFooter>
            </Modal>
          </div>
        )
 
} 

export default ForgetPasswordModal