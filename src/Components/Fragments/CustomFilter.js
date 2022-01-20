import React, { Component } from "react";
import { TextField } from "@material-ui/core";

const styles = {
    resize:{
      fontSize:10
    },
}

class CustomFilter extends Component {
  constructor(props) {
      super(props);
      this.state = {
          value: "",
        };
    }
    
    onChange = (event) => {
        this.setState({ value: event.target.value });
        this.props.onFilterChanged(this.props.columnDef.tableData.id, event.target.value);
    };




  render() {
      return (
          <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              color="primary"
              placeholder={this.props.columnDef.title}
              InputProps={{
                  style: {
                      fontSize: 12,
                      textAlign: "center",
                      fontWeight: "bold",
                      fontFamily: "Roboto",
                  }
                }}
              onChange={this.onChange}
              value={this.state.value}
            />
      );
  }
}

export default CustomFilter;
