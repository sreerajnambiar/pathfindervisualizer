import { eucledianDistance } from './distancefunctions'
import _ from 'lodash'

export const visulaizeAstar = (Grid, startCell, endCell) => {
   let closedSet = []
   let openSet = []
   startCell.g = 0
   startCell.h = eucledianDistance([endCell.row, endCell.col], [startCell.row, startCell.col])
   startCell.f = startCell.g + startCell.h
   openSet.push(startCell)
   // console.log(openSet.length)
   while (openSet.length > 0) {
      // find the node with the least f on the open list and pop it from the list and call it current
      let sortedOpenSet = openSet.sort((a, b) => a.f - b.f)
      let current = sortedOpenSet.shift()
      // check whether current cell is the end cell and stop search if yes
      if (current === endCell) return closedSet;
      //get the eighneighbours of the current cell
      let neighbours = getNeighbours(current, Grid)
      for (let neighbour of neighbours) {
         //if neighbour end cell stop search
         if (neighbour.row === endCell.row && neighbour.col === endCell.col) {
            closedSet.push(current)
            return closedSet
         }

         neighbour.previous = current
         neighbour.g = current.g + eucledianDistance([current.row, current.col], [neighbour.row, neighbour.col])
         neighbour.h = eucledianDistance([neighbour.row, neighbour.col], [endCell.row, endCell.col])
         neighbour.f = neighbour.h + neighbour.g

         //check for node with same postion on open list and if yes the check openlist.f < neighbour.f  if yer continue 
         if (checkForNodeWithSamePostion(neighbour, openSet)) {
            let neighbourinopensetIndex = openSet.findIndex((ele) => { return (ele.col === neighbour.col && ele.row === neighbour.row) })
            if (openSet[neighbourinopensetIndex].f < neighbour.f) continue;
            else {
               openSet[neighbourinopensetIndex] = neighbour
               continue
            }
         }

         //check for node with same postion on cosed list and if yes the check closedList.f < neighbour.f  if yer continue 
         if (checkForNodeWithSamePostion(neighbour, closedSet)) {
            let neighbourinclosedsetIndex = closedSet.findIndex((ele) => { return (ele.col === neighbour.col && ele.row === neighbour.row) })
            if (closedSet[neighbourinclosedsetIndex].f < neighbour.f) continue;
         }
         openSet.push(neighbour)

      }
      closedSet.push(current)
   }
}

const getNeighbours = (cell, Grid) => {
   let neighbours = []
   const { row, col } = cell
   let neighbourcells = [[row + 1, col], [row, col + 1], [row, col - 1], [row - 1, col]]
   neighbourcells.forEach((ele) => {
      const [row, col] = ele
      if (!(row < 0 || col < 0 || col > Grid[0].length - 1 || row > Grid.length - 1)) {
         let neighbour = _.cloneDeep(Grid[row][col])
         if (!neighbour.isBlocked) neighbours.push(neighbour)
      }
   })
   return neighbours
}

const checkForNodeWithSamePostion = (node, nodelist) => {
   for (let checknode of nodelist) {
      if (checknode.col === node.col && checknode.row === node.row) return true
   }
   return false
}

export function getNodesInShortestPathOrderAstar(finishNode) {
   let nodesInShortestPathOrder = [];
   let currentNode = finishNode;
   while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      let nextNode = _.cloneDeep(currentNode.previous);
      currentNode.previous = null
      currentNode = nextNode
   }
   return nodesInShortestPathOrder;
}

