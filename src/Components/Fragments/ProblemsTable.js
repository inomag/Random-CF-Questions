import React, { Component } from "react";
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
import CustomFilter from "../Fragments/CustomFilter";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import { Typography, Chip } from "@material-ui/core";

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

class ProblemsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Name",
          field: "name",
          filterComponent: (props) => <CustomFilter {...props} />,
          align: "left",
          cellStyle: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
          width: "35%",
          render: (rowData) => (
            <Typography
              variant="body1"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                fontFamily: "sans-serif",
              }}
            >
              {rowData.name}
            </Typography>
          ),
        },
        {
          title: "Index",
          field: "index",
          filterComponent: (props) => <CustomFilter {...props} />,
          align: "center",
          filterCellStyle: {
            textAlign: "center",
          },
          width: "10%",
          render: (rowData) => (
            <Typography
              variant="body1"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                fontFamily: "sans-serif",
              }}
            >
              {rowData.index}
            </Typography>
          ),
        },
        {
          title: "Rating",
          field: "rating",
          type: "numeric",
          filterComponent: (props) => <CustomFilter {...props} />,
          filterCellStyle: {
            textAlign: "center",
          },
          align: "center",
          width: "15%",
          render: (rowData) => (
            <Typography
              variant="body1"
              color="primary"
              style={{
                fontSize: "14px",
                fontWeight: "800",
                fontFamily: "sans-serif",
              }}
            >
              {rowData.rating}
            </Typography>
          ),
        },
        {
          title: "Tags",
          field: "tags",
          render: (rowData) =>
            rowData.tags.map((tag, index) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                color="primary"
                style={{
                  margin: "2px",
                }}
              />
            )),
          filterCellStyle: {
            textAlign: "right",
          },
          filterComponent: (props) => <CustomFilter {...props} />,
          align: "right",
          width: "40%",
        },
      ],
      data: props.data,
    };
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                data: this.props.data,
                isLoading: false
            })
        }
    }

    
  gotoProblem = (rowData) => {
    window.open(
      "https://codeforces.com/problemset/problem/" +
        rowData.contestId +
        "/" +
        rowData.index
    );
  };

  render() {
    return (
      <MaterialTable
        title=""
        icons={tableIcons}
        columns={this.state.columns}
        data={this.state.data}
        options={{
          filtering: true,
          search: false,
          toolbar: false,
          showTitle: false,
          actionsColumnIndex: -1,
          headerStyle: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "Roboto",
            textTransform: "uppercase",
          },
          tableLayout: "auto",
        }}
        localization={{
          header: {
            actions: "",
          },
        }}
        actions={[
          {
            icon: () => (
              <Link
                color="primary"
                style={{
                  transform: "rotate(45deg)",
                }}
              />
            ),
            tooltip: "Link",
            onClick: (event, rowData) => {
              this.gotoProblem(rowData);
            },
          },
        ]}
      />
    );
  }
}

export default ProblemsTable;
