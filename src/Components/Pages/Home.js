import React, { Component } from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import ProblemsTable from "../Fragments/ProblemsTable";
import FindQuestion from "../Fragments/FindQuestion";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      currentData: [],
      tags: [],
      tagsCreated: false,
      progress: 0,
    };
  }

  componentDidMount() {
    fetch("https://codeforces.com/api/problemset.problems")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          loading: false,
          data: data.result.problems,
          currentData: data.result.problems,
        });
      });
  }

  render() {
    return (
      <Container
        maxWidth="false"
        style={{
          padding: "8px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 24px",
            height: "100%",
            margin: "10px",
            borderRadius: "4px",
            backgroundColor: "#ffffff",
            position: "sticky",
            boxShadow: "1px 1px 2px #cccccc",
          }}
        >

          {this.state.loading ? (
            <CircularProgress />
          ) :
            <FindQuestion
              data={this.state.currentData}
            />}
          
        </div>

        <div
          style={{
            width: "100%",
            margin: "10px",
            textAlign: "center",
          }}
        >
          <ProblemsTable
            data={this.state.currentData}
            isLoading={this.state.loading}
          />
        </div>
      </Container>
    );
  }
}

export default Home;
