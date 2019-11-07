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
          icon: 'fa fa-th'
        },
        {
          text: 'Validators',
          link: '/validators',
          icon: 'fa fa-user'
        },
        {
          text: 'Blocks',
          link: '/blocks',
          icon: 'fa fa-clone'
        },
        {
          text: 'Transactions',
          link: '/transactions',
          icon: 'fa fa-random'
        },
        {
          text: 'Proposals',
          link: '/proposals',
          icon: 'fa fa-file'
        },
        {
          text: 'Voting Power',
          link: '/voting-power-distribution',
          icon: 'fa fa-star'
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