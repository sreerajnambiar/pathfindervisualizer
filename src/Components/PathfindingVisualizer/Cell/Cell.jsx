/* eslint-disable */
import React, { Component } from "react";
import "./Cell.css";

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
    };
    this.handleClick = this.handleClick().bind(this);
  }

  handleClick() {
    const { setStartAndEndCell, row, col } = this.props;
    var timeoutID = null;
    let delay = 250;
    return function () {
      if (!timeoutID) {
        timeoutID = setTimeout(function () {
          // console.log("clicked");
          setStartAndEndCell(row, col, "start");
          timeoutID = null;
        }, delay);
      } else {
        timeoutID = clearTimeout(timeoutID);
        setStartAndEndCell(row, col, "end");
      }
    };
  }

  onMouseMoveCaptureHandler = (event) => {
    const { setblockedCell, row, col } = this.props;
    document.addEventListener("dragenter", function (event) {
      event.preventDefault();
    });
    setblockedCell(row, col);
  };

  render() {
    const { row, col, isStart, isEnd, isBlocked } = this.props;

    const classList = isStart
      ? "cell startcell"
      : isEnd
      ? "cell endcell"
      : isBlocked
      ? "cell blockedcell"
      : "cell";

    return (
      <div
        id={`node-${row}-${col}`}
        draggable={true}
        className={classList}
        onClick={this.handleClick}
        onDragEnter={this.onMouseMoveCaptureHandler}
      ></div>
    );
  }
}
