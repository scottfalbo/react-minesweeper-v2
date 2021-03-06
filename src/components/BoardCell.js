import React from 'react';

const BoardCell = ({ cell, clicks }) => {

  // Handle MouseUp event for left / right / shift
  const handleClick = (event) => {
    event.preventDefault();
    if (event.shiftKey) { clicks.shiftClick(cell); }
    else if (event.button === 0 && !cell.clicked && cell.view !== 'F') {
      clicks.leftClick(cell);
    }
    else if (event.button === 2 && (cell.view === 'F' || cell.view === '.')) {
      clicks.rightClick(cell);
    }
  }
  // MouseDown event with shift to highlight adjacent cells
  const shiftHighlight = (event) => {
    event.preventDefault();
    if (event.shiftKey) { clicks.shiftHighlight(cell); }
  }
  // Removes highlight if mouse leaves original target cell
  const leaveHighlight = (event) => {
    event.preventDefault();
    clicks.leaveHighlight(cell);
  }

  // Add classes to set number colors
  const cellNumberColor = (cell) => {
    for (let i = 1; i <= 8; i++) {
      if (cell.view === i) { return `c${i} cell-button` }
    }
    if (cell.view === 0) { return "no-text black-box cell-button" }
    if (cell.view === '.') { return "no-text cell-button" }
    if (cell.view === 'F') { return "no-text cell-button" }
    if (cell.view === 'X') { return "no-text cell-button" }
    if (cell.view === 'L') { return "no-text cell-button" }
  }
  // Add images to cells based on view state
  const cellImage = (cell) => {
    if (cell.view === '.') { return "https://github.com/scottfalbo/react-minesweeper-v2/blob/main/public/images/spacer.png?raw=true" }
    else if (cell.view === 'F') { return "https://github.com/scottfalbo/react-minesweeper-v2/blob/main/public/images/flag_icon.png?raw=true" }
    else if (cell.view === 'X') { return "https://github.com/scottfalbo/react-minesweeper-v2/blob/main/public/images/bomb.png?raw=true" }
    else if (cell.view === 'L') { return "https://github.com/scottfalbo/react-minesweeper-v2/blob/main/public/images/bomb-X.png?raw=true" }
    else { return "https://github.com/scottfalbo/react-minesweeper-v2/blob/main/public/images/spacer.png?raw=true" }
  }

  return (
    <td>
      <div className={cell.highlight ? "highlighted" : ""}></div>
      <button className={cellNumberColor(cell)}
        onMouseUp={handleClick}
        onMouseDown={shiftHighlight}
        onMouseLeave={leaveHighlight}
      >
        <p>{cell.view}</p>
        <img src={cellImage(cell)} alt=" " />
      </button>
    </td>
  );
}

export default BoardCell;