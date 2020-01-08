import React, { Component } from "react";
import PinListModal from "./PinListModal";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Button,
  Table
} from "reactstrap";

export default class PinList extends Component {
  state = {
    tableContent: [{ index: 0 }, { index: 1 }, { index: 2 }],
    toggleIndex: null,
    toggle: false,
    pageNumber: 1,
    totlaPages: 10
  };

  onChevronIconClick = index => {
    this.setState(prev => ({
      toggleIndex: index
    }));
  };

  // when ellipsis icon is clicked
  onEllipsisClick = e => this.setState({ toggle: true });

  // on modal close button clicked
  onModalClose = e => this.setState({ toggle: !this.state.toggle });

  //  when page up is clicked

  onPageUpClick = e => {
    const { totlaPages, pageNumber } = this.state;
    if (pageNumber == totlaPages) {
      return;
    }
    this.setState(prev => ({ pageNumber: pageNumber + 1 }));
  };
  //  when page down is clicked

  onPageDownClick = e => {
    const { totlaPages, pageNumber } = this.state;
    if (pageNumber == 1) {
      return;
    }
    this.setState(prev => ({ pageNumber: pageNumber - 1 }));
  };
  render() {
    const {
      tableContent,
      toggleIndex,
      toggle,
      pageNumber,
      totlaPages
    } = this.state;
    return (
      <div>
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between">
              <div>
                {" "}
                <Button color={"primary"}>ADD PIN ADDRESS</Button>
              </div>
              <div>
                <small className="mr-3">{`Page   ${pageNumber}  of  ${totlaPages}`}</small>
                <span className="mr-2">
                  <i
                    className="fas fa-chevron-left"
                    onClick={this.onPageDownClick}
                  />
                </span>
                <span className="ml-2">
                  <i
                    className="fas fa-chevron-right"
                    onClick={this.onPageUpClick}
                  />
                </span>
              </div>
            </div>
            <Table className="mt-4 pinListTable">
              <thead>
                <tr>
                  <th className="d-flex align-items-center">
                    <input type="checkbox" className="mr-2" />
                    Address
                  </th>
                  <th>Balance</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableContent.map((val, index) => {
                  return (
                    <>
                      {" "}
                      <tr className="mt-3 mb-3 border">
                        <td className="d-flex align-items-center">
                          <input type="checkbox" className="mr-2" />
                          <small className="text-primary smallTd">
                            213123311223
                          </small>
                        </td>
                        <td>
                          <div>
                            <small>0.0000 ANT ($0.01)</small>
                            <br></br>
                            <small>
                              <small className="smallTd">
                                0.0000 ANT ($0.01)
                              </small>
                            </small>
                          </div>
                        </td>
                        <td>
                          <small>Added on 1991-12-20</small>
                        </td>
                        <td>
                          <div className="row">
                            <div className="col-2">
                              <i class="far fa-envelope-open"></i>
                            </div>
                            <div className="col-10">
                              {" "}
                              <small className="text-secondary">
                                Outgoing Txns
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="row">
                            <div className="col-4">
                              {" "}
                              <i
                                className="fas fa-ellipsis-v"
                                onClick={this.onEllipsisClick}
                              ></i>
                            </div>
                            <div className="col-4">
                              <i className="fas fa-trash trash"></i>
                            </div>
                            <div className="col-4">
                              <i
                                className={
                                  toggleIndex == index
                                    ? "fas fa-chevron-down"
                                    : "fas fa-chevron-up"
                                }
                                onClick={e => this.onChevronIconClick(index)}
                              ></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                      {toggleIndex == index && (
                        <tr className="text-center pt-4 pb-4">
                          <td colSpan={"5"}>Some Text</td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <PinListModal toggle={toggle} onModalClose={this.onModalClose} />
      </div>
    );
  }
}
