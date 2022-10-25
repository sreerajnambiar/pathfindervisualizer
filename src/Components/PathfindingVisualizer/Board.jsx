/* eslint-disable */
import React, { Component } from "react";
import Cell from "./Cell/Cell";
import "./Board.css";
import {
  visulaizeAstar,
  getNodesInShortestPathOrderAstar,
} from "./Algrithms/Astaalgo";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import RouteIcon from '@mui/icons-material/Route';

class Board extends Component {
  constructor(props) {
    super(props);
    this.updateDimention = this.updateDimention.bind(this);
    this.state = {
      Grid: [],
      startCell: null,
      endCell: null,
      numRows: null,
      numColumns: null,
    };
  }

  componentWillMount() {
    this.updateDimention();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimention);
    this.makeGrid();
  }
  //state Altering functions
  setStartAndEndCell = (row, col, type) => {
    const { Grid, startCell, endCell } = this.state;
    let newGrid = Grid;
    let newCell = newGrid[row][col];
   
      if (type === "start") {
        if (startCell) {
          if (startCell.col === newCell.col && startCell.row === newCell.row) {
            return;
          } else {
            startCell.isStart = false;
            newGrid[startCell.row][startCell.col] = startCell;
          }
        }
        newCell.isStart = !newCell.isStart;
        newCell.isBlocked = false;
        newCell.isEnd = false;
        newGrid[row][col] = newCell;
        this.setState({ Grid: newGrid, startCell: newCell });
      } else if (type === "end") {
        if(endCell){
          if (endCell.col === newCell.col && endCell.row === newCell.row) {
            return;
          } else {
            endCell.isEnd = false;
            newGrid[endCell.row][endCell.col] = endCell;
          }
        }
        newCell.isEnd = !newCell.isEnd;
        newGrid[row][col] = newCell;
        newCell.isBlocked = false;
        newCell.isStart = false;
        this.setState({ Grid: newGrid, endCell: newCell });
      }
    
  };

  setblockedCell = (row, col) => {
    const { Grid } = this.state;
    let Cell = Grid[row][col];
    if (!Cell.isEnd || !Cell.isStart) Cell.isBlocked = !Cell.isBlocked;
    let newGrid = Grid;
    newGrid[row][col] = Cell;
    this.setState({
      blockedCells: newGrid,
    });
  };

  makeGrid = async () =>  {
    let rows = [];
    const { numRows, numColumns } = this.state;
    for (let i = 0; i < numRows; i++) {
      let cols = [];
      for (let j = 0; j < numColumns; j++) {
        cols.push(this.createCell(i, j));
      }
      rows.push(cols);
    }
    await this.setState({ Grid: rows } );
  }

  createCell = (row, col) => {
    return {
      row: row,
      col: col,
      isStart: null,
      isEnd: null,
      isBlocked: null,
      previous: null,
      f: 0,
      g: 0,
      h: 0,
    };
  };

  resetCell = (cell) => {
    cell.isBlocked= null
    cell.previous= null
    cell.f= 0
    cell.g= 0
    cell.h= 0
    return cell
  };

  visulizeAstar = () => {
    const { Grid, startCell, endCell } = this.state;
    var ret = visulaizeAstar(Grid, startCell, endCell);
    var path = getNodesInShortestPathOrderAstar(ret[ret.length - 1]);
    this.animateAlgorithm(path);
  };

  createMaze = () =>{
    console.log("create maze clicked ")
  }

  resetBlocks = () =>{
    console.log("insres")
    let {Grid} = this.state
    let rows = [];
    const { numRows, numColumns } = this.state;
    for (let i = 0; i < numRows; i++) {
      let cols = [];
      for (let j = 0; j < numColumns; j++) {
        cols.push(this.resetCell(Grid[i][j]));
      }
      rows.push(cols);
    }
    this.setState({ Grid: rows } , () => {
      this.resetPath();
    });
    
  }

  resetPath = () =>{
    const  {Grid} = this.state
    for (let i = 0; i <= Grid.length - 1; i++) {
      for (let j = 0; j <= Grid[i].length - 1; j++) {
      document.getElementById(`node-${Grid[i][j].row}-${Grid[i][j].col}`).classList.remove("node-visited");
    }
  }
  }

  animateAlgorithm = (nodesInShortestPathOrder) => {
    nodesInShortestPathOrder.shift();
    for (let i = 0; i <= nodesInShortestPathOrder.length - 1; i++) {
      let node = nodesInShortestPathOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "cell node-visited";
    }
  };

  updateDimention = () => {
    let width = window.innerWidth;
    let numRows = Math.floor(30);
    let numColumns = 0;
    if (width > 1500) {
      numRows = 30;
      numColumns = 60;
    } else if (width > 1250) {
      numRows = 30;
      numColumns = 40;
    } else if (width > 1000) {
      numColumns = 30;
      numRows = 30;
    } else if (width > 750) {
      numColumns = 30;
      numRows = 30;
    }else if (width > 500) {
      numColumns = 18;
      numRows = 26;
    }
    else if (width > 400) {
      numColumns = 16;
      numRows = 32;
    } else if (width > 250) {
      numColumns = 14;
      numRows = 28;
    } else if (width > 0) {
      numColumns = 0;
    }

    this.setState({
      numRows: numRows,
      numColumns: numColumns,
    });
    this.makeGrid();
  };

  render() {
    let { Grid } = this.state;
    return (
      <>
        <AppBar>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                textAlign: "left",
                display: { xs: "none", sm: "block" },
              }}
            >
              PATHFINDER VISUALIZER
            </Typography>
                        <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={this.createMaze}
            >
              <RouteIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={this.resetBlocks}
            >
              <CleaningServicesOutlinedIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={this.visulizeAstar}
            >
              <PlayArrowIcon />
            </IconButton>

            
          </Toolbar>
        </AppBar>

        <div className="board-wrapper">
          <div id="board">
            {Grid.map((row, rowId) => {
              return (
                <div className="row" key={`row-${rowId}`}>
                  {row.map((col, colId) => {
                    let cell = col;
                    return (
                      <Cell
                        row={cell.row}
                        col={cell.col}
                        key={`cell-${rowId - colId}`}
                        setStartAndEndCell={this.setStartAndEndCell}
                        setblockedCell={this.setblockedCell}
                        isStart={cell.isStart}
                        isEnd={cell.isEnd}
                        isBlocked={cell.isBlocked}
                      ></Cell>
                    );
                  })}
                </div>
              );
            })}
          </div>
        
        </div>
      </>
    );
  }
}
export default Board;
