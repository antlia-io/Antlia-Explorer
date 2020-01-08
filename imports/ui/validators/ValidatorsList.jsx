import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Nav, NavLink, Card, Input, InputGroup } from "reactstrap";
import List from "./ListContainer.js";
import { Helmet } from "react-helmet";
import i18n from "meteor/universe:i18n";
import qs from "querystring";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import ChainStates from "../components/ChainStatesContainer.js";

const T = i18n.createComponent();

const PriorityEnum = {
  moniker: { code: 0, dirKey: "monikerDir", name: "moniker" },
  expectedSlashing: {
    code: 1,
    dirKey: "expectedSlashingDir",
    name: "expectedSlashing"
  },
  votingPower: { code: 1, dirKey: "votingPowerDir", name: "votingPower" },
  uptime: { code: 2, dirKey: "uptimeDir", name: "uptime" },
  commission: { code: 3, dirKey: "commissionDir", name: "commission" },
  selfDel: { code: 4, dirKey: "selfDelDir", name: "selfDel" },
  status: { code: 5, dirKey: "statusDir", name: "status" },
  jailed: { code: 6, dirKey: "jailedDir", name: "jailed" }
};

const renderToggleIcon = order => (
  <i className="material-icons marginleft">
    {order == 1 ? "arrow_drop_up" : "arrow_drop_down"}
  </i>
);

export default class Validators extends Component {
  constructor(props) {
    super(props);
    let state = {
      monikerDir: 1,
      expectedSlashingDir: -1,
      votingPowerDir: -1,
      uptimeDir: -1,
      commissionDir: 1,
      selfDelDir: 1,
      statusDir: 1,
      jailedDir: 1,
      priority: PriorityEnum.moniker.code
    };
    if (props.location.search) {
      let queryParams = qs.parse(props.location.search.substring(1));
      let sortField = queryParams.sort;
      if (sortField && PriorityEnum[sortField]) {
        state.priority = PriorityEnum[sortField].code;
        if (queryParams.dir && Number(queryParams.dir)) {
          state[PriorityEnum[sortField].dirKey] =
            Number(queryParams.dir) > 0 ? 1 : -1;
        }
      }
    }
    this.state = state;
  }
  state = {
    selected: "validators",
    expanded: false,
    search: ""
  };

  toggleDir(field, e) {
    e.preventDefault();
    if (!PriorityEnum[field]) return;

    let dirKey = PriorityEnum[field].dirKey;
    let newDir = this.state[dirKey] * -1;
    this.setState({
      [dirKey]: newDir,
      priority: PriorityEnum[field].code
    });
    this.props.history.replace({
      search: qs.stringify({
        sort: field,
        dir: newDir
      })
    });
  }

  onSelect = selected => {
    this.setState({ selected: selected });
  };

  onToggle = expanded => {
    this.setState({ expanded: expanded });
  };
  handleInput = e => {
    this.setState({
      search: e.target.value
    });
  };
  render() {
    const { expanded, selected } = this.state;
    let title = <T>validators.active</T>;
    let desc = <T>validators.listOfActive</T>;
    if (this.props.inactive) {
      title = <T>validators.inactive</T>;
      desc = <T>validators.listOfInactive</T>;
    }

    return (
      <div>
        <div
          id="validator-list"
          style={{
            marginLeft: expanded ? 200 : 64,
            padding: "15px 20px 0 20px"
          }}
        >
          <Helmet>
            <title>Validators on Antlia Explorer | Antlia</title>
            <meta
              name="description"
              content="Here is a list of Antlia Validators"
            />
          </Helmet>
          <div className="topbar">
            <h1>{title}</h1>
            <div className="chainstate">
              <ChainStates />
            </div>
          </div>
          <Card>
            <Nav pills={true} className="status-switch">
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/validators"
                  active={this.props.match.url == "/validators"}
                  className="vnav-item"
                >
                  <T>validators.navActive</T>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/validators/inactive"
                  active={this.props.match.url.indexOf("inactive") > 0}
                  className="vnav-item"
                >
                  <T>validators.navInactive</T>
                </NavLink>
              </NavItem>
              <NavItem>
                <InputGroup id="vnav-searchbar" className="d-none d-lg-flex">
                  <Input
                    placeholder="Search..."
                    id="queryString"
                    className="vnav-search"
                    value={this.state.search}
                    onChange={this.handleInput}
                    // placeholder={i18n.__('common.searchPlaceholder')}
                    // onKeyDown={this.handleSearch}
                  />
                  <img src="/img/searchicon.png" className="searchicon" />
                </InputGroup>
              </NavItem>
            </Nav>
          </Card>
          <p className="lead">{/* {desc} */}</p>
          <Card>
            <Row className="validator-list">
              <Col md={12}>
                <Card body>
                  <Row className="text-nowrap validator-tablehead-border">
                    <Col className="field counter" xs={12} sm={6} md={6} lg={1}>
                      <i className="fas fa-hashtag"></i>
                      <p className="text-justify">List</p>
                    </Col>
                    <Col
                      className="moniker field"
                      xs={12}
                      sm={6}
                      md={6}
                      lg={2}
                      onClick={e => this.toggleDir("moniker", e)}
                    >
                      <i className="material-icons">perm_contact_calendar</i>
                      <span className="hlabel">
                        {/* <T>validators.moniker</T> */}Validators
                      </span>
                      {renderToggleIcon(this.state.monikerDir)}
                    </Col>
                    <Col
                      className="field"
                      xs={12}
                      sm={6}
                      md={6}
                      lg={2}
                      onClick={e => this.toggleDir("expectedSlashing", e)}
                    >
                      <i className="material-icons">power</i>
                      <span className="hlabel">
                        {/* <T>common.votingPower</T> */}Expected Slashing
                      </span>
                      {renderToggleIcon(this.state.expectedSlashingDir)}
                    </Col>
                    <Col
                      className="field"
                      xs={12}
                      sm={6}
                      md={6}
                      lg={2}
                      onClick={e => this.toggleDir("votingPower", e)}
                    >
                      <i className="material-icons">power</i>
                      <span className="hlabel">
                        <T>common.votingPower</T>
                      </span>
                      {renderToggleIcon(this.state.votingPowerDir)}
                    </Col>
                    <Col
                      className="field"
                      xs={12}
                      sm={6}
                      md={6}
                      lg={1}
                      onClick={e => this.toggleDir("selfDel", e)}
                    >
                      <i className="material-icons">equalizer</i>
                      <span className="hlabel">
                        {/* <T>validators.selfPercentage</T> */}
                        Share %
                      </span>
                      {renderToggleIcon(this.state.selfDelDir == 1)}{" "}
                    </Col>
                    {!this.props.inactive ? (
                      <Col
                        className="field"
                        xs={12}
                        sm={6}
                        md={6}
                        lg={2}
                        onClick={e => this.toggleDir("commission", e)}
                      >
                        <i className="material-icons">call_split</i>
                        <span className="hlabel">
                          <T>validators.commission</T>
                        </span>
                        {renderToggleIcon(this.state.commissionDir == 1)}
                      </Col>
                    ) : (
                      ""
                    )}
                    {!this.props.inactive ? (
                      <Col
                        className="field"
                        xs={12}
                        sm={6}
                        md={6}
                        lg={2}
                        onClick={e => this.toggleDir("uptime", e)}
                      >
                        <i className="material-icons">flash_on</i>
                        <span className="hlabel">
                          <T>validators.uptime</T> (
                          {Meteor.settings.public.uptimeWindow}
                          <i className="fas fa-cube"></i>)
                        </span>{" "}
                        {renderToggleIcon(this.state.uptimeDir == 1)}
                      </Col>
                    ) : (
                      ""
                    )}
                    {this.props.inactive ? (
                      <Col
                        className="last-seen field"
                        xs={12}
                        sm={6}
                        md={6}
                        lg={2}
                      >
                        <i className="fas fa-clock"></i>{" "}
                        <span className="hlabel">
                          <T>validators.lastSeen</T> (UTC)
                        </span>
                      </Col>
                    ) : (
                      ""
                    )}
                    {this.props.inactive ? (
                      <Col
                        className="bond-status field"
                        xs={12}
                        sm={6}
                        md={6}
                        lg={1}
                        onClick={e => this.toggleDir("status", e)}
                      >
                        <i className="material-icons">toggle_on</i>{" "}
                        <span className="hlabel">
                          <T>validators.status</T>
                        </span>{" "}
                        {renderToggleIcon(this.state.statusDir)}{" "}
                      </Col>
                    ) : (
                      ""
                    )}
                    {this.props.inactive ? (
                      <Col
                        className="jail-status field"
                        xs={12}
                        sm={6}
                        md={6}
                        lg={1}
                        onClick={e => this.toggleDir("jailed", e)}
                      >
                        <i className="material-icons">lock</i>{" "}
                        <span className="hlabel">
                          <T>validators.jailed</T>
                        </span>{" "}
                        {renderToggleIcon(this.state.jailedDir)}{" "}
                      </Col>
                    ) : (
                      ""
                    )}
                  </Row>
                </Card>
                {this.props.inactive ? (
                  <List
                    inactive={this.props.inactive}
                    monikerDir={this.state.monikerDir}
                    expectedSlashingDir={this.state.expectedSlashingDir}
                    votingPowerDir={this.state.votingPowerDir}
                    uptimeDir={this.state.uptimeDir}
                    commissionDir={this.state.commissionDir}
                    selfDelDir={this.state.selfDelDir}
                    statusDir={this.state.statusDir}
                    jailedDir={this.state.jailedDir}
                    priority={this.state.priority}
                    status={this.props.status}
                    searchValid={this.state.search}
                  />
                ) : (
                  <List
                    monikerDir={this.state.monikerDir}
                    expectedSlashingDir={this.state.expectedSlashingDir}
                    votingPowerDir={this.state.votingPowerDir}
                    uptimeDir={this.state.uptimeDir}
                    commissionDir={this.state.commissionDir}
                    selfDelDir={this.state.selfDelDir}
                    priority={this.state.priority}
                    searchValid={this.state.search}
                  />
                )}
              </Col>
            </Row>
          </Card>
        </div>

        <SideNav
          className="sidenav position-fixed"
          onSelect={this.onSelect}
          onToggle={this.onToggle}
        >
          <SideNav.Toggle />
          <SideNav.Nav selected={selected} defaultSelected="validators">
            <NavItem title="Explorer">
              <NavIcon className="explorer">
                <span className="ex">EX</span>
              </NavIcon>
              <NavText>
                <span className="explorer">PLORER</span>
              </NavText>
            </NavItem>
            <NavItem
              eventKey="dashboard"
              onClick={e => this.props.history.push("/")}
              title="Dashboard"
            >
              <NavIcon>
                <i className="fa fa-fw fa-home" />
              </NavIcon>
              <NavText>Dashboard</NavText>
            </NavItem>
            <NavItem
              eventKey="validators"
              onClick={e => this.props.history.push("/validators")}
              title="Validators"
            >
              <NavIcon>
                <i className="fa fa-fw fa-spinner" />
              </NavIcon>
              <NavText>Validators</NavText>
            </NavItem>
            <NavItem
              eventKey="blocks"
              onClick={e => this.props.history.push("/blocks")}
              title="Blocks"
            >
              <NavIcon>
                <i className="fa fa-fw fa-cube" />
              </NavIcon>
              <NavText>Blocks</NavText>
            </NavItem>
            <NavItem
              eventKey="transactions"
              onClick={e => this.props.history.push("/transactions")}
              title="Transactions"
            >
              <NavIcon>
                <i className="fa fa-fw fa-random" />
              </NavIcon>
              <NavText>Transactions</NavText>
            </NavItem>
            <NavItem
              eventKey="proposals"
              onClick={e => this.props.history.push("/proposals")}
              title="Proposals"
            >
              <NavIcon>
                <i className="fa fa-fw fa-edit" />
              </NavIcon>
              <NavText>Proposals</NavText>
            </NavItem>
            <NavItem
              eventKey="voting-power-distribution"
              onClick={e =>
                this.props.history.push("/voting-power-distribution")
              }
              title="Voting Power"
            >
              <NavIcon>
                <i className="fa fa-fw fa-chart-bar" />
              </NavIcon>
              <NavText>Voting Power</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </div>
    );
  }
}
