import React, { Component } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Chip,
  Typography,
  Slider,
    Backdrop,
    Container,
} from "@mui/material";
import Button from '@mui/material/Button';
import ShuffleIcon from '@mui/icons-material/Shuffle';


class FindQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      tags: new Set(),
      indices: new Set(),
      filteredData: props.data,
      filter: {
        tags: [],
        indices: [],
        ratings: [0, 5000],
        loading: false,
        title: props.data.length + " Questions Found",
      },
      completed: this.props.completed,
    };

    // eslint-disable-next-line array-callback-return
    this.state.data.map((problem) => {
      this.state.indices.add(problem.index);
      for (const tag of problem.tags) {
        this.state.tags.add(tag);
      }
    });
  }

  onTagChoosed = (event, value) => {
    this.state.filter.tags = value;
    this.filterProblems();
  };

  onIndexChoosed = (event, value) => {
    this.state.filter.indices = value;
    this.filterProblems();
  };

  onRatingChanged = (event, value) => {
    this.state.filter.ratings = value;
    this.filterProblems();
  };

  ratingsToString = (value) => {
    return value[0] + "-" + value[1];
  };

  filterProblems = () => {
      this.setState({
          filter: {
              ...this.state.filter,
              loading: true,
              title: "Filtering...",
          },
        });

    let result = [];
    for (const problem of this.state.data) {
      if (
        this.state.filter.indices.length !== 0 &&
        !this.state.filter.indices.includes(problem.index)
      ) {
        continue;
      }

      if (
        problem.rating < this.state.filter.ratings[0] ||
        problem.rating > this.state.filter.ratings[1]
      ) {
        continue;
      }
      if (this.state.filter.tags.length === 0) {
        result.push(problem);
      } else {
        for (const tag of this.state.filter.tags) {
          if (problem.tags.includes(tag)) {
            result.push(problem);
            break;
          }
        }
      }
    }
      this.setState({
          filter: {
              ...this.state.filter,
              loading: false, 
              title: result.length + " Questions Found",
          },
          filteredData: result,
        });
    };
    
  openRandomProblem = () => {
    const leftProblems = this.state.filteredData.filter(
      (problem) => !this.state.completed.includes(problem.contestId + problem.index)
    );
    if (leftProblems.length === 0) { 
      alert("No more problems left in this filter!");
      return;
    }
      const problem = leftProblems[Math.floor(Math.random() * this.state.filteredData.length)];
        window.open(
            "https://codeforces.com/problemset/problem/" +
            problem.contestId +
            "/" +
            problem.index
        );
    };

  render() {
    return (
        <Container>
        <Typography
          variant="h6"
          style={{
            fontWeight: "500",
            fontSize: "12px",
            margin: "8px 4px",
            fontFamily: "roboto",
          }}
        >
          Select Problem Tags
        </Typography>
        <Autocomplete
          multiple
          options={Array.from(this.state.tags)}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                color="primary"
                size="small"
                {...getTagProps({ index })}
              />
            ))
          }
          onChange={this.onTagChoosed}
          style={{
            minWidth: "240px",
            maxWidth: "280px",
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Tags"
                  color="primary"
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                      textAlign: "center",
                      fontWeight: "bold",
                      fontFamily: "Roboto",
                  }, 
               }}
            />
          )}
        />

        <br />

        <Typography
          variant="h6"
          style={{
            fontWeight: "500",
            fontSize: "12px",
            margin: "8px 4px",
            fontFamily: "roboto",
          }}
        >
          Select Problem Index
        </Typography>

        <Autocomplete
          multiple
          options={Array.from(this.state.indices)}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                color="primary"
                size="small"
                {...getTagProps({ index })}
              />
            ))
          }
          onChange={this.onIndexChoosed}
          style={{
            minWidth: "240px",
            maxWidth: "280px",
          }}
          renderInput={(params) => (
            <TextField
                  {...params}
              variant="outlined"
              color="primary"
                  label="Index"
                  InputLabelProps={{
                      style: {
                        fontSize: 14,
                        textAlign: "center",
                        fontWeight: "bold",
                        fontFamily: "Roboto",
                    }, 
                 }}
            />
          )}
        />

        <br />
        <Typography
          variant="h6"
          style={{
            fontWeight: "500",
            fontSize: "12px",
            margin: "8px 4px",
            fontFamily: "roboto",
          }}
        >
          Select Ratings Range
        </Typography>

        <Slider
          getAriaLabel={() => "Temperature range"}
          value={this.state.filter.ratings}
          onChange={this.onRatingChanged}
          valueLabelDisplay="auto"
          step={100}
          getAriaValueText={this.ratingsToString}
          max={5000}
          min={0}
          color="primary"
        />
        <br />
        <Typography
          variant="h6"
          style={{
            fontWeight: "bold",
            fontSize: "14px",
            margin: "8px auto",
              fontFamily: "roboto",
            textAlign: "center",
          }}
        >
          {this.state.filter.title}
            </Typography>
            <br />
            <Button fullWidth variant="contained" endIcon={<ShuffleIcon />}
                style={{
                    backgroundColor: "#3f51b5",
                    color: "white",
                    fontSize: "12px",
                    fontFamily: "roboto",
                    fontWeight: "bold",
                    margin: "8px auto",
                    padding: "8px",
                    width: "100%",
                    borderRadius: "4px",
                }}
                onClick={ this.openRandomProblem }>
                RANDOM QUESTION
            </Button>

      </Container>
    );
  }
}

export default FindQuestion;
