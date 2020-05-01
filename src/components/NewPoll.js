import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import { handleAddQuestion } from "../actions/questions";
import {
  Segment,
  Grid,
  Header,
  Loader,
  Dimmer,
  Divider,
  Container,
  Form,
} from "semantic-ui-react";

class NewPoll extends Component {
  state = {
    isLoading: false,
    optionA: "",
    optionB: "",
    redirectToHome: false
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmitQuestion = e => {
    e.preventDefault();
    const { authUser, handleAddQuestion } = this.props;
    const { optionA, optionB } = this.state;

    new Promise((res, rej) => {
      this.setState({ isLoading: true });
      handleAddQuestion(optionA, optionB, authUser);
      setTimeout(() => res('success'), 500);
    }).then(() => {
      this.setState({
        optionA: '',
        optionB: ''
      });
    });
    this.setState({redirectToHome: true});
  };

  render() {
    const { isLoading, redirectToHome } = this.state;
    const disabled = this.state.optionA === "" || this.state.optionB === "";
    if(redirectToHome) {
        return <Redirect to="/" />;
    }
    return (
      <Container textAlign="center" size="medium">
        <Segment.Group>
          <Header as="h2" textAlign="center" block attached="top">
            Create a New Poll
          </Header>
          <Grid padded>
            <Grid.Column>
              {isLoading && (
                <Dimmer active inverted>
                  <Loader content="Adding..." />
                </Dimmer>
              )}
              <h3>Complete the question:</h3>
              <p>
                <strong>Would you rather...</strong>
              </p>
              <Form onSubmit={this.handleSubmitQuestion}>
                <Form.Input
                  id="optionA"
                  placeholder="Enter option one..."
                  value={this.state.optionA}
                  onChange={this.handleChange}
                  required
                />
                <Divider horizontal>Or</Divider>
                <Form.Input
                  id="optionB"
                  placeholder="Enter option two..."
                  value={this.state.optionB}
                  onChange={this.handleChange}
                  required
                />
                <Form.Button positive size="tiny" fluid disabled={disabled}>
                  Submit
                </Form.Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Segment.Group>
      </Container>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleAddQuestion })(NewPoll);
