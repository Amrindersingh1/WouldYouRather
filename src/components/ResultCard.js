import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
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

const YourVoteLabel = () => (
  <Label color="orange" ribbon="right" className="vote">
    <Icon name="check circle outline" size="big" className="compact" />
    <div style={{ float: "right" }}>
      Your
      <br />
      Vote
    </div>
  </Label>
);

export class ResultCard extends Component {
  navBack = () => {
    this.props.history.push("/");
  };

  render() {
    const { questions, user } = this.props;
    const question = questions[this.props.match.params.questionId];
    const userVote = user.answers[this.props.match.params.questionId];
    const total = question.optionOne.votes.length + question.optionTwo.votes.length;

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
                  <Progress value={question.optionOne.votes.length} total={total} progress="ratio" size="large" color='purple'/>
                  <Progress value={question.optionTwo.votes.length} total={total} progress="ratio" size="large" color='pink'/>
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
