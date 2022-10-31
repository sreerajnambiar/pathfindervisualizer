import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./MainHeader.scss";

class MainHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} className="main-header">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "8%",
              }}
            >
              <div>Start Cell :</div>
              <div className="cell startcell"></div>
              <img
                src="singleClick.svg"
                alt=""
                width="24px"
                height="24px"
              ></img>
            </div>
             <div className="ruler">
             </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-evenly",
                width: "8%",
              }}
            >
            <div>End Cell:</div>
              <div className="cell endcell"></div>
              <img
                src="doubleClick.svg"
                alt=""
                width="24px"
                height="24px"
              ></img>
            </div>
            <div className="ruler">
             </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-evenly",
                width: "8%",
              }}
            >
                <div>Blocked Cell:</div>
              <div className="cell blockedcell"></div>
              <img
                src="drag.svg"
                alt=""
                width="24px"
                height="24px"
              ></img>
            </div>
            <div className="ruler">
             </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default MainHeader;
