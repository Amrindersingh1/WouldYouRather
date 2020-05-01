import React, { Component ,Fragment} from "react";
import logo from "./logo.svg";
import "./App.css";
import { handleInitialData } from "./actions/shared";
import { connect } from "react-redux";
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Home from './components/Home';
import NewPoll from './components/NewPoll';
import Leaderboard from './components/LeaderBoard';


class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authUser } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          {authUser === null ? (
            <Route
              render={() => (
                <Login />
              )}
            />
          ) :  (
            <Fragment>
              <NavBar />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/add" component={NewPoll} />
                  <Route path="/leaderboard" component={Leaderboard} />
                </Switch>
            </Fragment>
          )}
        </div>
      </BrowserRouter>
    );
  }
}


function mapStateToProps({ authUser , users}) {
  return {
    authUser
  };
}

export default connect(mapStateToProps, { handleInitialData })(App);
