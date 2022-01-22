import React, { Component } from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import ProblemsTable from "../Fragments/ProblemsTable";
import FindQuestion from "../Fragments/FindQuestion";
import LoadingAnim from "../Fragments/LoadingAnim";

class QuestionsFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentData: [],
      tags: [],
      tagsCreated: false,
      progress: 0,
      error: false,
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

  render() {
    return (
      <Container maxWidth="false">
        {this.state.loading ? (
          <LoadingAnim loading={this.state.loading} error={ this.state.error}/>
        ) : (
          <div
            style={{
              padding: "8px",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                width: "100%",
                  margin: "10px",
                textAlign: "center",
              }}
            >
              <ProblemsTable
                data={this.state.currentData}
              />
            </div>
            <div
              style={{
                padding: "12px 4px",
                height: "100%",
                margin: "10px",
                borderRadius: "4px",
                  backgroundColor: "#ffffff",
                  position: "sticky",
                boxShadow: "1px 1px 2px #dddddd, -1px -1px 2px #dddddd",
              }}
            >
              <FindQuestion data={this.state.currentData} />
            </div>
          </div>
        )}
      </Container>
    );
  }
}

export default QuestionsFragment;
