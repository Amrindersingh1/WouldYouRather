import React, { Component } from "react";
import { Menu, Segment, Responsive, Image, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { setAuthUser } from '../actions/authUser';



class NavBar extends Component {
  state = { activeItem: "home" };

  handleLogout = e => {
    e.preventDefault();
    this.props.setAuthUser(null);
  };

  render() {
    const { authUser, users } = this.props;

    return (
      <Responsive as={Menu}  pointing secondary size='large' padded>
        <Menu.Item name="Home" as={NavLink} to="/" exact />
        <Menu.Item name="New poll" as={NavLink} to="/add" />
        <Menu.Item name="Leader Board" as={NavLink} to="/leaderboard" />
        <Menu.Menu position="right">
          <Menu.Item>
            <span>
              <Image
                src={users[authUser].avatarURL}
                avatar
                spaced="right"
                verticalAlign="bottom"
              />
              {users[authUser].name}
            </span>
          </Menu.Item>
          <Menu.Item>
            <Button
              content="Logout"
              labelPosition="right"
              basic
              compact
              icon="log out"
              size="mini"
              onClick={this.handleLogout}
            />
          </Menu.Item>
        </Menu.Menu>
      </Responsive>
    );
  }
}

function mapStateToProps({ users, authUser }) {
    return {
      authUser,
      users
    };
  }
  
  export default connect(
    mapStateToProps,
    { setAuthUser }
  )(NavBar);