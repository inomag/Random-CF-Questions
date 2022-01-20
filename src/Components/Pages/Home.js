import React, { Component } from "react";
import { Container } from "@mui/material";
import QuestionsFragment from "../Fragments/QuestionsFragment";

class Home extends Component {
  render() {
    return (
      <Container maxWidth="false" style={{ padding: "8px" }}>
        <QuestionsFragment />
      </Container>
    );
  }
  
}

export default Home;
