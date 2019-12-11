import React, { Component } from "react";
import { Badge, Progress, Row, Col, Card, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { Meteor } from "meteor/meteor";
import numbro from "numbro";
import Avatar from "../components/Avatar.jsx";


//semi circle progress bar
import SemiCircleProgressBar from "react-progressbar-semicircle";
const ValidatorRow = props => {
  let moniker =
    props.validator.description && props.validator.description.moniker
      ? props.validator.description.moniker
      : props.validator.address;
  let identity =
    props.validator.description && props.validator.description.identity
      ? props.validator.description.identity
      : "";
  return (
    <Card body>
      <Row className="validator-info">
        <Col className="d-none d-md-block counter data mb" xs={12} sm={6} md={2} lg={1}>
        <i className="fas fa-hashtag d-lg-none  d-md-none">
                      </i>
          <div className="validator-listindex mb"> {props.index + 1}</div>
        </Col>
        <Col xs={12} sm={6} md={4} lg={1} className="data mb">
        <i className="material-icons d-lg-none  d-md-none">
                        perm_contact_calendar
                      </i>
          <Link to={"/validator/" + props.validator.operator_address}>
            <Avatar
              moniker={moniker}
              identity={identity}
              address={props.validator.address}
              list={true}
            />
            <span className="moniker">{moniker}</span>
          </Link>
        </Col>
        <Col
          className="voting-power data mb"
          xs={12}
          sm={6}
          md={3}
          lg={2}
        >
          <i className="material-icons d-md-none">power</i>
          <SemiCircleProgressBar
            percentage={(props.validator.voting_power / props.totalPower) * 100}
            diameter={75}
            className="table-semi-circle"
            stroke="#660099"
          />
          <span>
            {/* {props.validator.voting_power
              ? numbro(props.validator.voting_power).format("0,0")
              : 0} */}
            {props.validator.voting_power
              ? numbro(props.validator.voting_power / props.totalPower).format(
                "0.00%"
              )
              : "0.00%"}
          </span>
        </Col>
        <Col
          className="voting-power data mb"
          xs={12}
          sm={6}
          md={3}
          lg={2}
        >
          <i className="material-icons d-md-none">power</i>
          <SemiCircleProgressBar
            percentage={(props.validator.voting_power / props.totalPower) * 100}
            diameter={75}
            className="table-semi-circle"
            stroke="#FFBA00"
          />
          <span className="vtable-votingtext">
            {props.validator.voting_power
              ? numbro(props.validator.voting_power).format("0,0")
              : 0}
            <br />
            {props.validator.voting_power
              ? numbro(props.validator.voting_power / props.totalPower).format(
                "0.00%"
              )
              : "0.00%"}
          </span>
        </Col>
        <Col
          className="self-delegation data mb"
          xs={12}
          sm={6}
          md={4}
          lg={2}
        >
          <i className="material-icons d-md-none">equalizer</i>
          <span>
            {props.validator.self_delegation
              ? numbro(props.validator.self_delegation).format("0.00%")
              : "N/A"}
          </span>
        </Col>
        {!props.inactive ? (
          <Col
            className="commission data mb"
            xs={12}
            sm={6}
            md={4}
            lg={2}
          >
            <i className="material-icons d-md-none">call_split</i>
            <span>
              {numbro(props.validator.commission.rate).format("0.00%")}
            </span>
          </Col>
        ) : (
            ""
          )}
        {!props.inactive ? (
          <Col className="uptime data mb" xs={{ size: 12, order: "last" }} md={2}>
            {/* <Progress animated value={props.validator.uptime}> */}
            <i className="material-icons d-md-none">flash_on</i>
            <span className="d-md-inline">
              {props.validator.uptime ? props.validator.uptime.toFixed(2) : 0}%
            </span>
            {/* </Progress> */}
          </Col>
        ) : (
            ""
          )}
        {/* <span className="d-md-none">&nbsp;</span> */}
        {props.inactive ? (
          <Col
            className="last-seen data"
            xs={{ size: 12, offset: 0 }}
            md={{ size: 2, offset: 0 }}
          >
            {props.validator.lastSeen
              ? moment
                .utc(props.validator.lastSeen)
                .format("D MMM YYYY, h:mm:ssa")
              : ""}
          </Col>
        ) : (
            ""
          )}
        {props.inactive ? (
          <Col className="bond-status data" xs={2} md={1}>
            {props.validator.status == 0 ? (
              <Badge color="secondary">
                <span>
                  U<span className="d-none d-md-inline">nbonded</span>
                </span>
              </Badge>
            ) : (
                <Badge color="warning">
                  <span>
                    U<span className="d-none d-md-inline">nbonding</span>
                  </span>
                </Badge>
              )}
          </Col>
        ) : (
            ""
          )}
        {props.inactive ? (
          <Col className="jail-status data" xs={2} md={1}>
            {props.validator.jailed ? (
              <Badge color="danger">
                <span>
                  J<span className="d-none d-md-inline">ailed</span>
                </span>
              </Badge>
            ) : (
                ""
              )}
          </Col>
        ) : (
            ""
          )}
      </Row>
    </Card>
  );
};

export default class List extends Component {
  constructor(props) {
    super(props);
    if (Meteor.isServer) {
      if (this.props.validators.length > 0 && this.props.chainStatus) {
        this.state = {
          validators: this.props.validators.map((validator, i) => {
            return (
              <ValidatorRow
                key={validator.address}
                index={i}
                validator={validator}
                address={validator.address}
                totalPower={this.props.chainStatus.activeVotingPower}
                inactive={this.props.inactive}
              />
            );
          })
        };
      }
    } else {
      this.state = {
        validators: ""
      };
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.validators != prevProps.validators &&
      !prevProps.searchValid
    ) {
      if (this.props.validators.length > 0 && this.props.chainStatus) {
        this.setState({
          validators: this.props.validators.map((validator, i) => {
            return (
              <ValidatorRow
                key={validator.address}
                index={i}
                validator={validator}
                address={validator.address}
                totalPower={this.props.chainStatus.activeVotingPower}
                inactive={this.props.inactive}
              />
            );
          })
        });
      } else {
        this.setState({
          validators: ""
        });
      }
    }
    if (prevProps.searchValid !== this.props.searchValid) {
      return new Promise(resolve => {
        let data = this.props.validators;
        if (this.props.searchValid !== "") {
          data = data.filter(
            item =>
              item.description.moniker
                .toUpperCase()
                .includes(this.props.searchValid.toUpperCase())
            // ||
            // item.Email.toUpperCase().includes(searchText.toUpperCase()) ||
            // item.Phone.toUpperCase().includes(searchText.toUpperCase())
          );
          this.setState({
            validators: data.map((validator, i) => {
              return (
                <ValidatorRow
                  key={validator.address}
                  index={i}
                  validator={validator}
                  address={validator.address}
                  totalPower={this.props.chainStatus.activeVotingPower}
                  inactive={this.props.inactive}
                />
              );
            })
          });
        } else {
          this.setState({
            validators: this.props.validators.map((validator, i) => {
              return (
                <ValidatorRow
                  key={validator.address}
                  index={i}
                  validator={validator}
                  address={validator.address}
                  totalPower={this.props.chainStatus.activeVotingPower}
                  inactive={this.props.inactive}
                />
              );
            })
          });
        }
        resolve();
      });
    }
  }

  render() {
    if (this.props.loading) {
      return <Spinner type="grow" color="primary" />;
    } else {
      return this.state.validators;
    }
  }
}
