import React, { Component } from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import ProblemsTable from "../Fragments/ProblemsTable";
import FindQuestion from "../Fragments/FindQuestion";
import LoadingAnim from "../Fragments/LoadingAnim";

class QuestionsFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      currentData: this.props.problems,
      tags: [],
      tagsCreated: false,
      progress: 0,
      error: this.props.error,
    };
  }

  // componentDidMount() {
  //   fetch("https://codeforces.com/api/problemset.problems")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       this.setState({
  //         loading: false,
  //         currentData: data.result.problems,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       this.setState({
  //         error: true,
  //       });
  //     });
  // }

  componentDidUpdate(prevProps, prevState) { 
    if (prevProps.loading !== this.props.loading) {
      this.setState({
        loading: this.props.loading,
      });
    }
    if (prevProps.error !== this.props.error) {
      this.setState({
        error: this.props.error,
      });
    }
    if (prevProps.problems !== this.props.problems) {
      this.setState({
        currentData: this.props.problems,
      });
    }
  }

  render() {
    return (
      <Container maxWidth="false">
        {this.state.loading ? (
          <LoadingAnim loading={this.state.loading} error={ this.state.error}/>
        ) : (
          <div
            style={{
              padding: "8px 0px",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                  marginRight: "10px",
                  marginTop: "10px",
                  marginBottom: "10px",
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
