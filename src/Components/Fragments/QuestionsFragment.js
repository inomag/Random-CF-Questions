import React, { Component } from 'react';
import { Container, Box, CircularProgress } from "@mui/material";
import ProblemsTable from "../Fragments/ProblemsTable";
import FindQuestion from "../Fragments/FindQuestion";


export class QuestionsFragment extends Component {
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
            <div
            style={{
              padding: "12px 4px",
              height: "100%",
              margin: "10px",
              borderRadius: "4px",
              backgroundColor: "#ffffff",
              boxShadow: "1px 1px 2px #dddddd, -1px -1px 2px #dddddd",
            }}
          >
    
            {this.state.loading ? (
              <CircularProgress />
            ) :
              <FindQuestion
                data={this.state.currentData}
              />}
            
          </div>
    
          </Container>
        );
      }
}

export default QuestionsFragment;
