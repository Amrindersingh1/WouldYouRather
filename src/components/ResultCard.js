import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  Header,
  Segment,
  Divider,
  Label,
  Grid,
  Icon,
  Container,
  Image,
  Button,
  Progress,
} from "semantic-ui-react";

export class ResultCard extends Component {
  navBack = () => {
    this.props.history.push("/");
  };

  render() {
    const { questions, user } = this.props;
    const question = questions[this.props.match.params.question_id];

    let badPath = false;
    if (question === undefined) {
      badPath = true;
    }

    if (badPath === true) {
      return <Redirect to="/questions/notfound" />;
    }

    const userVote = user.answers[this.props.match.params.question_id];
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const total = optionOneVotes + optionTwoVotes;
    let optionOne =
      question.optionOne.text + " voted by " + optionOneVotes + " users ";
    let optionTwo =
      question.optionTwo.text + " voted by " + optionTwoVotes + " users ";
    if (userVote === optionOne) {
      optionOne += " (Your Answer)";
    } else {
      optionTwo += " (Your Answer)";
    }
    const percent1 = ((100 * optionOneVotes) / total).toFixed(2);
    const percent2 = ((100 * optionTwoVotes) / total).toFixed(2);

    return (
      <Container textAlign="center" size="large">
        <Segment.Group size="small">
          <Header as="h5" textAlign="left" block attached="top">
            {question.author} asks:
          </Header>

          <Grid divided padded>
            <Grid.Row>
              <Grid.Column width={5}>
                <Image src={user.avatarURL} size="small" circular centered />
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
                  <Progress
                    size="large"
                    color="purple"
                    percent={percent1}
                    progress
                  >
                    {optionOne}
                  </Progress>
                  <Progress
                    size="large"
                    color="pink"
                    percent={percent2}
                    progress
                  >
                    {optionTwo}
                  </Progress>
                  <Button
                    basic
                    color="grey"
                    size="medium"
                    fluid
                    negative
                    content="Back"
                    onClick={this.navBack}
                  />
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment.Group>
      </Container>
    );
  }
}

function mapStateToProps({ users, authUser, questions }) {
  const user = users[authUser];
  return {
    user,
    questions,
  };
}

export default withRouter(connect(mapStateToProps)(ResultCard));
