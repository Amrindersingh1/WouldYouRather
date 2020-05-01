import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { setAuthUser } from "../actions/authUser";
import {  Segment,  Grid,  Header,  Image,  Form,  Loader,  Dimmer,} from "semantic-ui-react";

class Login extends Component {

  state = {
    loading: false,
    disabled: true,
    authUser: null,
  };

  getUsers() {
    const { users } = this.props;

    return users.map(user => ({
        key: user.id,
        text: user.name,
        value: user.id,
        image: { avatar: true, src: user.avatarURL }
      }));

  }


  setLoading = () => {
    this.setState({ loading: true });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { setAuthUser } = this.props;
    const authUser = this.state.authUser;

    new Promise((res, rej) => {
      this.setLoading();
      setTimeout(() => res(), 500);
    }).then(() => setAuthUser(authUser));
  };

  onUserSelect = (e, {value}) => {
    this.setState({authUser: value, disabled: false})
  }

  render() {
    const { loading, disabled, selectedUser } = this.state;
    return (
      <div className="loginCard">
        <Grid padded='vertically' columns={1} centered >
          <Header as="h3" block attached="top" textAlign="center">
            <Header.Content>Welcome to the Would You Rather App!</Header.Content>
            <Header.Subheader>Please sign in to continue</Header.Subheader>
          </Header>
          <Grid padded >
            <Grid.Row className="login">
              <Grid.Column width={15}>
                {loading === true && (
                  <Dimmer active inverted>
                    <Loader inverted content="Loading" />
                  </Dimmer>
                )}
                <Image src="/images/loginHero.jpg" size="medium" centered />
                <br />
                <Form onSubmit={this.handleLogin}>
                  <Header as="h2" color="pink">
                    Sign In
                  </Header>
                  <Form.Dropdown
                    placeholder="Select a User"
                    fluid
                    selection
                    scrolling
                    options={this.getUsers()}
                    value={selectedUser}
                    onChange={this.onUserSelect}
                    required
                  />
                  <Form.Button
                    content="Login"
                    basic
                    color='purple'
                    disabled={disabled}
                    fluid
                  />
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid>
        <footer className="footer">
          <a href="https://www.freepik.com/free-photos-vectors/kids">
            Kids vector created by freepik - www.freepik.com
          </a>
        </footer>
      </div>
    );
  }
}



function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}

export default connect(mapStateToProps, { setAuthUser })(Login);
