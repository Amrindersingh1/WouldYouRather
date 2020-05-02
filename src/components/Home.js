import React, { Component } from "react";
import { Tab, Container } from "semantic-ui-react";
import { Panes } from "./Panes";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { questionData, users } = this.props;

    return (
      <Container textAlign="center" size="medium">
        <Tab panes={Panes({ questionData, users })} className="tab" />
      </Container>
    );
  }
}

function mapStateToProps({ authUser, users, questions }) {
  const answerIds = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter((question) => !answerIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((question) => answerIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    questionData: {
      answered,
      unanswered,
    },
    users,
  };
}

export default connect(mapStateToProps)(Home);
