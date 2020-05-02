import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Grid,
  Header,
  Image,
  Label,
  Divider,
  Container,
  Card
} from "semantic-ui-react";

const colors = ["yellow", "grey", "orange"];

class LeaderBoard extends Component {
  render() {
    const { usersData } = this.props;
    return (
      <Container textAlign="center">
        <Segment.Group horizontal>
          {usersData.map((user, i) => (
            <Segment.Group key={user.id}>
              <Label corner="left" icon="trophy" color={colors[i]} />
              <Grid divided padded>
                <Grid.Row>
                  <Grid.Column verticalAlign="middle">
                    <Image src={user.image} size="small" centered circular />
                  </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row centered>
                  <Header as="h3" textAlign="center" color='pink'>
                    {user.name}
                  </Header>
                </Grid.Row>
                <Divider />
                <Grid.Row  centered>
                  <Grid.Column width="6"  >
                    <Header as="h5">
                      Answered Questions: {user.answers}
                    </Header>
                  </Grid.Column>
                  <Divider />
                  <Grid.Column width="6"  >
                  <Header as="h5">
                      Posted Questions: {user.questions}
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                    <Grid.Column>
                    <Card color='purple'>
                        <Card.Content header='Score' />
                        <Card.Content description={user.total} />
                    </Card>
                    </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment.Group>
          ))}
        </Segment.Group>
      </Container>
    );
  }
}

function mapStateToProps({ users }) {
  const usersData = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      image: user.avatarURL,
      answers: Object.values(user.answers).length,
      questions: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);
  return {
    usersData,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
