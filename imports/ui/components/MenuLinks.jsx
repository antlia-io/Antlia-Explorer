import React, { Component } from 'react';


export default class MenuLinks extends React.Component {
  constructor(props) {
    super(props);
    // Any number of links can be added here
    this.state = {
      links: [
        {
          text: 'Dashborad',
          link: '/',
          icon: 'fa fa-home'
        },
        {
          text: 'Validators',
          link: '/validators',
          icon: 'fa fa-spinner'
        },
        {
          text: 'Blocks',
          link: '/blocks',
          icon: 'fa fa-cube'
        },
        {
          text: 'Transactions',
          link: '/transactions',
          icon: 'fa fa-random'
        },
        {
          text: 'Proposals',
          link: '/proposals',
          icon: 'fa fa-edit'
        },
        {
          text: 'Voting Power',
          link: '/voting-power-distribution',
          icon: 'fa fa-chart-bar'
        },
      ]
    }
  }
  render() {
    let links = this.state.links.map((link, i) => <li ref={i + 1}><i aria-hidden="true" className={`fa ${link.icon}`}></i><a href={link.link}>{link.text}</a></li>);

    return (
      <div className={this.props.menuStatus} id='menu'>
        <ul>
          <li>Explorer</li>
          {links}

        </ul>
      </div>
    )
  }
}