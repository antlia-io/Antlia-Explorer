import React, { Component } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Card, Nav, NavLink } from "reactstrap";
import i18n from "meteor/universe:i18n";
import { Link, Route } from "react-router-dom";
const T = i18n.createComponent();
import MyProfile from "./MyProfile";
import PinList from "./PinList";
import PinListModal from "./PinListModal";
import SignOut from "./SignOut";
export default class MyProfileMain extends Component {
  state = {
    selected: "dashboard",
    expanded: false,
    toggle: false
  };

  onSelect = selected => {
    this.setState({ selected: selected });
  };

  onToggle = expanded => {
    this.setState({ expanded: expanded });
  };
  // when pin list tab button is clicked

  onPinListTabClick = e =>
    this.setState(prev => ({ toggle: !this.state.toggle }));
  //  pin list modal open function
  onModalClose = e => this.setState({ toggle: !this.state.toggle });
  render() {
    const { expanded, selected, toggle } = this.state;
    return (
      <div
        id="home"
        style={{
          marginLeft: expanded ? 200 : 64,
          padding: "15px 20px 0 20px"
        }}
      >
        <div className="topbar">
          <h1>{"Account Overview"}</h1>
          <div className="chainstate">{/* <Consensus /> */}</div>
        </div>
        <Card>
          <Nav pills={true} className="status-switch">
            <NavItem>
              <NavLink
                tag={Link}
                to="/my-account"
                active={this.props.match.url == "/my-account"}
                className="vnav-item"
              >
                <T>myProfile.myProfile</T>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                to="/my-account/pin-list"
                active={this.props.match.url.indexOf("pin-list") > 0}
                className="vnav-item"
                onClick={this.onPinListTabClick}
              >
                <T>myProfile.pinList</T>
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                tag={Link}
                to="/my-account/private-notes"
                active={this.props.match.url.indexOf("private-notes") > 0}
                className="vnav-item"
              >
                <T>myProfile.txn</T>
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink
                tag={Link}
                to="/my-account/sign-out"
                active={this.props.match.url.indexOf("sign-out") > 0}
                className="vnav-item"
              >
                <T>myProfile.signOut</T>
              </NavLink>
            </NavItem>
          </Nav>
        </Card>
        <SideNav
          className="sidenav position-fixed"
          onSelect={this.onSelect}
          onToggle={this.onToggle}
        >
          <SideNav.Toggle />
          <SideNav.Nav selected={selected} defaultSelected="dashboard">
            <NavItem title="Explorer">
              <NavIcon className="explorer">
                {/* <i className="fa fa-fw fa-th" /> */}
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
        <Route exact path={"/my-account"} render={() => <MyProfile />} />
        <Route path={"/my-account/pin-list"} render={() => <PinList />} />
        <Route
          path={"/my-account/private-notes"}
          render={() => <h1>private notes</h1>}
        />
        <Route path={"/my-account/sign-out"} render={() => <SignOut />} />

        {/*  pin list modal */}
        <PinListModal toggle={toggle} onModalClose={this.onModalClose} />
      </div>
    );
  }
}
