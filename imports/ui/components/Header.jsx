import React, { Component } from 'react';
import { HTTP } from 'meteor/http'
import { Badge, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import i18n from 'meteor/universe:i18n';
import ToggleMenu from './ToggleMenu.jsx'

const T = i18n.createComponent();
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            network: ''
        }
    }

    handleLanguageSwitch = (lang, e) => {
        i18n.setLocale(lang)
    }

    componentDidMount() {


        let url = Meteor.settings.public.networks
        if (!url) return
        try {
            HTTP.get(url, null, (error, result) => {
                if (result.statusCode == 200) {
                    let networks = JSON.parse(result.content);
                    if (networks.length > 0) {
                        this.setState({
                            networks: <DropdownMenu>{
                                networks.map((network, i) => {
                                    return <span key={i}>
                                        <DropdownItem header><img src={network.logo} /> {network.name}</DropdownItem>
                                        {network.links.map((link, k) => {
                                            return <DropdownItem key={k} disabled={link.chain_id == Meteor.settings.public.chainId}>
                                                <a href={link.url} target="_blank">{link.chain_id} <Badge size="xs" color="secondary">{link.name}</Badge></a>
                                            </DropdownItem>
                                        })}
                                        {(i < networks.length - 1) ? <DropdownItem divider /> : ''}
                                    </span>

                                })
                            }</DropdownMenu>
                        })
                    }
                }
            })
        }
        catch (e) {
            console.warn(e);
        }
    }

    render() {
        return (
            <Navbar className="background" dark expand="lg" fixed="top" id="header">

                <ToggleMenu className="displayres"/>

                <NavLink className="navbar-brand" to="/"><img src="/img/antlia.svg" className="img-fluid logo" /></NavLink>
                {/* <UncontrolledDropdown className="d-inline text-nowrap">
                    <DropdownToggle caret={(this.state.networks !== "")} tag="span" size="sm" id="network-nav">{Meteor.settings.public.chainId}</DropdownToggle>
                    {this.state.networks}
                </UncontrolledDropdown> */}
                <div className="rightbar">

                    <SearchBar id="header-search" className="form-control" history={this.props.history} />


                    <UncontrolledDropdown inNavbar>
                        <DropdownToggle nav caret>
                            {Meteor.settings.public.chainId}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>Cosmoshub2</DropdownItem>
                            <DropdownItem>Cosmoshub2</DropdownItem>
                            <DropdownItem>Cosmoshub2</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <UncontrolledDropdown inNavbar>
                        <DropdownToggle nav caret>
                            <T>navbar.lang</T>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={(e) => this.handleLanguageSwitch('en-US', e)}><T>navbar.english</T></DropdownItem>
                            <DropdownItem onClick={(e) => this.handleLanguageSwitch('zh-Hant', e)}><T>navbar.chinese</T></DropdownItem>
                            <DropdownItem onClick={(e) => this.handleLanguageSwitch('zh-Hans', e)}><T>navbar.simChinese</T></DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown inNavbar>
                        <DropdownToggle nav caret>
                            <img src="/img/user.png" className="img-fluid usericon" />
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>User Profile</DropdownItem>
                            <DropdownItem>Views</DropdownItem>
                            <DropdownItem>Sign Out</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>


            </Navbar>
        );
    }
}