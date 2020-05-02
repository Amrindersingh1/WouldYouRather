import React, { Component } from "react";
import {
  Segment,
  Header,
  Grid,
  Image,
  Divider,
  Button,
  Radio,
  Form,
  Container,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { handleAddAnswerToQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

class UserCard extends Component {
  state = {
    value: "",
    viewResult: false,
  };

  handleSelection = (e, { value }) => this.setState({ value });

  handleAnsSubmit = (e) => {
    e.preventDefault();
    if (this.state.value !== "") {
      const { authUser, question, handleAddAnswerToQuestion } = this.props;
      handleAddAnswerToQuestion(authUser, question.id, this.state.value);
      this.setState({
        viewResult: true,
      });
    }
  };

  handleResultSubmit = (e) => {
    this.setState({
      viewResult: true,
    });
  };

  render() {
    const { question, users, unanswered } = this.props;
    const disabled = this.state.value === "" ? true : false;
    if (this.state.viewResult === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
      <Container textAlign="center" size="large">
        <Segment.Group size="small">
          <Header as="h5" textAlign="left" block attached="top">
            {question.author} asks:
          </Header>

          <Grid divided padded>
            <Grid.Row>
              <Grid.Column width={5}>
                <Image
                  src={users[question.author].avatarURL}
                  size="small"
                  circular
                  centered
                />
              </Grid.Column>
              <Divider />
              <Grid.Column width={11}>
                <Grid.Row centered>
                  <Header as="h3" textAlign="center" color="purple">
                    Would you Rather ?
                  </Header>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                  {unanswered && (
                    <UnasweredForm
                      question={question}
                      disabled={disabled}
                      handleSelection={this.handleSelection}
                      handleAnsSubmit={this.handleAnsSubmit}
                      value={this.state.value}
                    />
                  )}
                  {!unanswered && (
                    <AnsweredCard
                      handleResultSubmit={this.handleResultSubmit}
                      question={question}
                    />
                  )}
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment.Group>
      </Container>
    );
  }
}

const AnsweredCard = ({ question, handleResultSubmit }) => {
  return (
    <Form onSubmit={handleResultSubmit}>
      <Form.Field>
        <h4>{question.optionOne.text}</h4>
        <Divider horizontal>Or</Divider>
        <h4>{question.optionTwo.text}</h4>
        <Button
          basic
          color="green"
          size="medium"
          fluid
          positive
          content="View Results"
        />
      </Form.Field>
    </Form>
  );
};

const UnasweredForm = ({
  question,
  disabled,
  handleSelection,
  handleAnsSubmit,
  value,
}) => {
  return (
    <Form onSubmit={handleAnsSubmit}>
      <Form.Field>
        <Segment compact>
          <Radio
            label={question.optionOne.text}
            name="radioGroup"
            value="optionOne"
            checked={value === "optionOne"}
            onChange={handleSelection}
          />
        </Segment>
        <Segment compact>
          <Radio
            label={question.optionTwo.text}
            name="radioGroup"
            value="optionTwo"
            checked={value === "optionTwo"}
            onChange={handleSelection}
          />
        </Segment>
      </Form.Field>
      <Form.Field>
        <Button
          basic
          color="purple"
          size="large"
          fluid
          positive
          disabled={disabled}
          content="Submit"
        />
      </Form.Field>
    </Form>
  );
};

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleAddAnswerToQuestion })(
  UserCard
);
