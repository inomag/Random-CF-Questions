import React, { Component,forwardRef } from "react";
import {Container, TextField, Button,Box} from "@mui/material";
import { Typography,ListItem } from "@material-ui/core";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Link from "@material-ui/icons/Link";


import HourglassFullRoundedIcon from '@material-ui/icons/HourglassFullRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};


class UserFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "User",
      userData:this.props.userData?this.props.userData:[],
      tmpUser: localStorage.getItem("username")?localStorage.getItem("username"):"",
      loading:false,
      error:false,
    }
  }


  componentDidMount() { 
    // CHECK USERNAME FROM LOCALSTORAGE
    if (this.state.tmpUser!=="") { 
      this.fetchData();
    }
  }

  generateData = () => {
    console.log("Generating data...");
  }

  fetchData = () => { 
    this.setState({
      loading: true,
    });
    // FETCH DATA FROM API
    this.props.fetchData(this.state.tmpUser, (userData) => {
      this.setState({
        userData: userData,
        username: this.state.tmpUser,
        loading: false,
      });
      // SAVE USERNAME TO LOCALSTORAGE
      localStorage.setItem("username", this.state.tmpUser);
      this.generateData();
    }, () => {
      this.setState({
        error: true,
        loading: false,
      });
    })
  }

  gotoSubmission = (id) => { 

  }

  render() {
    return (
      <Container maxWidth="false"
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
      }}>

        <div
          style={{
            alignSelf: "flex-end",
            width: "100%",
            padding: "4px",
            verticalAlign: "middle",
            display: "inline-flex",
            justifyContent: "end",
        }}>
        <TextField
        variant="outlined"
        size="small"
        id="outlined-basic"
        label="Username"
            key="username"
            value={this.state.tmpUser}
            borderColor="primary"
            onChange={(e) => {
              this.setState({
                tmpUser: e.target.value,
              });
            }}
        InputProps={{
          style: {
            padding: "2px",
            fontSize: "14px",
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "Roboto",
            color:"rgb(63, 81, 181)"
          },
        }}
        InputLabelProps={{
          style: {
            fontSize:'14px',
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "Roboto",
          }
        }}   
      />
          <Button
            variant="contained"
            color="primary"
            onClick={this.fetchData}
            style={{
              marginLeft: "10px",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "bold",
              fontFamily: "Roboto",
              backgroundColor: "rgb(63, 81, 181)",
              color: "white",
            }}>
            Search
          </Button>
        </div>

        <Container
          maxWidth="false"
          style={{
            height: "100%",
            width: "100%",
            padding: "10px auto",
        }}>

          <div style={{
            fontSize: "24px",
            fontWeight: "300",
            fontFamily: "Roboto",
            margin:"16px 0px",
          }}>
            <span style={{
              fontSize: "32px",
              fontWeight: "600",
              fontFamily: "Roboto",
              marginRight: "2px"
            }}>{ this.state.username}</span> Submissions
          </div>
          

          <MaterialTable
          title="Basic Grouping Preview"
          columns={[
            {
              title: 'Name',
              field: 'problem.name',
              sorting: false,
              filterCellStyle: {
                textAlign: "center",
              },
              align: "center",
              width: "60%",
              render: (rowData) => (
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    fontFamily: "sans-serif",
                  }}
                >
                  {rowData.problem.name}
                </Typography>
              ),
            },
            {
              title: 'Language',
              field: 'programmingLanguage',
              sorting: false,
              filterCellStyle: {
                textAlign: "center",
              },
              align: "center",
              cellStyle: {
                textAlign: "center",
                fontSize: "12px",
                fontWeight: "500",
                fontFamily: "sans-serif",
              },
            },
            {
              title: 'Time Consumed',
              field: 'timeConsumedMillis',
              type: 'numeric',
              sorting: false,
              filterCellStyle: {
                textAlign: "center",
              },
              align: "center",
              render: (rowData) => (
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    fontFamily: "sans-serif",
                  }}
                >
                  {rowData.timeConsumedMillis} ms
                </Typography>
              ),
            },
            {
              title: 'Memory Used',
              field: 'memoryConsumedBytes',
              type: 'numeric',
              sorting: false,
              filterCellStyle: {
                textAlign: "center",
              },
              align: "center",
              render: (rowData) => (
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    fontFamily: "sans-serif",
                  }}
                >
                  {rowData.memoryConsumedBytes/1024} KB
                </Typography>
              ),
            },
            {
              title: 'Date',
              field: 'submissionDate',
              customSort: (a, b) => a.creationTimeSeconds - b.creationTimeSeconds,
              type: 'date',
              filterCellStyle: {
                textAlign: "center",
              },
              align: "center",
              render: (rowData) => (
                <Typography
                  variant="body1"
                  color="primary"
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    fontFamily: "sans-serif",
                  }}
                >
                  {new Date(rowData.creationTimeSeconds*1000).toDateString()}
                </Typography>
              ),
            },
            {
              title: 'Verdict',
              field: 'verdict',
              cellStyle: {
                textAlign: "center",
              },
              align: "center",
              render: (rowData) => {
                switch (rowData.verdict) { 
                  case "OK":
                    return <CheckCircleRoundedIcon
                      tooltip="Accepted"
                      style={{ color: "#16c79a" }} />
                  case "TESTING":
                    return <HourglassFullRoundedIcon
                      tooltip="Testing"
                      style={{ color: "#f58634" }} />
                  case "PARTIAL":
                    return <CheckCircleRoundedIcon
                      tooltip="Partial"
                      style={{ color: "#f58634" }} />
                  case "WRONG_ANSWER":
                    return <CancelRoundedIcon
                      tooltip="Wrong Answer"
                      style={{ color: "#c70039" }} />
                  default:
                    return <ErrorRoundedIcon
                      tooltip="CE, RE, TLE"
                      style={{ color: "#c70039" }} />
                }
              },
            },
          ]}
          data={this.state.userData}        
            options={{
              search: false,
          toolbar: false,
            showTitle: false,
            headerStyle: {
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Roboto",
              color:"rgb(63, 81, 181)",
              textTransform: "uppercase",
              },
            }}
            cellStyle={{
              padding: "4px",
            }}
            icons={tableIcons}
            isLoading={this.state.loading}
        />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            
            
          

            
          
          </div>

          
        </Container>
      </Container>
    );
  }
}

export default UserFragment;