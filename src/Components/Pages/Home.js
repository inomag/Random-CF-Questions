import React, { Component } from "react";
import { IconButton } from "@material-ui/core";

import QuestionsFragment from "../Fragments/QuestionsFragment";
import UserFragment from "../Fragments/UserFragment";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import MuiListItem from '@material-ui/core/ListItem';
import PersonIcon from '@material-ui/icons/Person';

import CodeIcon from '@material-ui/icons/Code';

const drawerWidth = 150;

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
  content: {
    flexGrow: 1,
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

  fragmentHandler = () => {
    switch (this.state.fragment) {
      case "USER":
        return <UserFragment />;
      case "PROBLEMS":
        return (
          <QuestionsFragment
            problems={this.state.currentData}
            loading={this.state.loading}
            error={this.state.error}
          />
        );
      default:
        return <UserFragment />;
    }
  };

  render() {
    return (
      <div className={classes.root}>
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
        <div className={classes.content} style={{
          marginLeft: '50px',
        }}>
        {this.fragmentHandler()}
      </div>
    </div>
    );
  }
}

export default Home;
