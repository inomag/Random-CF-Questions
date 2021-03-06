import React, { Component } from "react";
import { IconButton } from "@material-ui/core";

import QuestionsFragment from "../Fragments/QuestionsFragment";
import UserFragment from "../Fragments/UserFragment";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import { CssBaseline } from "@material-ui/core";

import MuiListItem from '@material-ui/core/ListItem';
import PersonIcon from '@material-ui/icons/Person';

import CodeIcon from '@material-ui/icons/Code';

const drawerWidth = 100;

const classes = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'primary',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "white",
    },
  },
  selected: {}
})(MuiListItem);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentData: [],
      loading: true,
      error: false,
      fragment: "USER",
      userData: [],
      completed: [],
    };
  }

  componentDidMount() {
    fetch("https://codeforces.com/api/problemset.problems")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          loading: false,
          currentData: data.result.problems,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: true,
        });
      });
  }

  toggleOpen = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  fetchUserData = (username, onSuccess, onError) => {
    fetch(`https://codeforces.com/api/user.status?handle=${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "FAILED") {
          onError();
        } else {
          this.setState({
            userData: data.result,
          });
          onSuccess(data.result);
          this.getCompletedProblems();
        }
      }).catch((error) => { 
        onError();
      });
  };

  getCompletedProblems = () => { 
    let completed = new Set();
    this.state.userData.forEach((element) => {
      if (element.verdict === "OK") {
        completed.add(element.problem.contestId + element.problem.index);
      }
    });
    this.setState({
      completed: [...completed],
    });
  }

  fragmentHandler = () => {
    switch (this.state.fragment) {
      case "USER":
        return <UserFragment fetchData={this.fetchUserData} userData={this.state.userData}/>;
      case "PROBLEMS":
        return (
          <QuestionsFragment
            problems={this.state.currentData}
            loading={this.state.loading}
            error={this.state.error}
            completed={this.state.completed}
          />
        );
      default:
        return <UserFragment />;
    }
  };

  render() {
    return (
      <div className={classes.root}
        style={{
          height: '100vh',
          maxWidth: '100%',
      }}>
        <CssBaseline />
      <Drawer
          className={classes.drawer}
          variant="permanent"
          PaperProps={{
            style: {
              backgroundColor: 'rgb(63, 81, 181)',
              borderRightColor: '#ffffff',
            },
          }}>
          <div className={classes.drawerContainer}>
            <List>
              <ListItem
                disableGutters="true"
                selected={this.state.fragment === "USER"}
              button onClick={() => {
              this.setState({
                fragment: "USER",
              });
              }}>
                <IconButton
                disableRipple="true">
                  {this.state.fragment === "USER" ? <PersonIcon color="primary"/> : <PersonIcon style={{color:'white'}}/>}
              </IconButton>
              </ListItem>
              
              
              <ListItem
                disableGutters="true"
                selected={this.state.fragment === "PROBLEMS"}
              button onClick={() => {
              this.setState({
                fragment: "PROBLEMS",
              });
              }}>
                <IconButton
                  disableRipple="true"
                  disableFocusRipple="true">
                  {this.state.fragment==="PROBLEMS" ? <CodeIcon color="primary"/> : <CodeIcon style={{ color: 'white' }}/>}
              </IconButton>
              </ListItem>
          </List>
        </div>
      </Drawer>
        <main className={classes.content}
          style={{
          display: 'inline-flex',
            height: '100%',
            width: '100%',
        }}>
          <Toolbar />
        {this.fragmentHandler()}
      </main>
    </div>
    );
  }
}

export default Home;
