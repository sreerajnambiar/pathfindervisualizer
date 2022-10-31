import _ from "lodash"

const getRdfsMaze = (Grid) => {

    // console.log(Grid)
    const totalrows = Grid.length
    const totalcols = Grid[0].length
    const randcol = Math.floor(Math.random() * (totalcols - 0 + 1)) + 0
    const randrows = Math.floor(Math.random() * (totalrows - 0 + 1)) + 0
    for (let i = 0; i < totalrows; i++) {
        for (let j = 0; j < totalcols; j++) {
            Grid[i][j].isBlocked = true;
            Grid[i][j].isVisited = false;

        }
    }
    let startingNode = Grid[randrows][randcol]
    let openStack = [startingNode]
    let currentNode = startingNode
    while (openStack.length > 0) {
        if(!currentNode) break
        Grid[currentNode.row][currentNode.col].isBlocked = false
        Grid[currentNode.row][currentNode.col].isVisited = true

        //    check whether new neighbour has less than 2 univisted node 
        let newNeighbour = getNextNeighbour(currentNode , Grid)
        if (newNeighbour) {
            openStack.push(newNeighbour)
            currentNode = newNeighbour
        }
        else {
            let { newOpenStack, newBacktracedNeighbour } = backTrackforNeighbour(openStack, Grid)
            openStack = newOpenStack
            newNeighbour = newBacktracedNeighbour
            if(!openStack.length ===0) openStack.push(newBacktracedNeighbour)
            currentNode = newBacktracedNeighbour

        }
    }
    return Grid


}



const getNeighbours = (cell, Grid) => {
    let neighbours = []
    const { row, col } = cell
    let neighbourcells = [[row + 1, col], [row, col + 1], [row, col - 1], [row - 1, col]]
    neighbourcells.forEach((ele) => {
        const [row, col] = ele
        if (!(row < 0 || col < 0 || col > Grid[0].length - 1 || row > Grid.length - 1)) {
            let neighbour = _.cloneDeep(Grid[row][col])
           neighbours.push(neighbour)
        }
    })
    return neighbours
}



const backTrackforNeighbour = (openStack , grid) => {
    let oldneighbour = openStack
    if(oldneighbour.length === 0) return  { newOpenStack: [], newBacktracedNeighbour: null }
    let checkValidneighbours = getNextNeighbour(oldneighbour[oldneighbour.length -1] , grid)
    if (!checkValidneighbours) {
        openStack.pop()
        let { newOpenStack, newBacktracedNeighbour } = backTrackforNeighbour(openStack , grid)
        return { newOpenStack: newOpenStack, newBacktracedNeighbour: newBacktracedNeighbour }
    }
    else {
        return { newOpenStack: openStack, newBacktracedNeighbour: checkValidneighbours }
    }
}

const getNextNeighbour = (currentNode, grid) => {
    let neighbours = getNeighbours(currentNode, grid)
    let validNeighbours = []
    for (let neighbour of neighbours) {
        if (!neighbour.isVisited) {
            let newNeighbours = getNeighbours(neighbour ,grid)
            let possibleNewNeighbours = []
            let visitedPossibleNewNeighbours = []
            for(let newNeighbour of newNeighbours){
                if (!newNeighbour.isVisited) possibleNewNeighbours.push(newNeighbour)
                else visitedPossibleNewNeighbours.push(newNeighbour)
            }
            if(newNeighbours.length-1 > visitedPossibleNewNeighbours.length && newNeighbours.length !== 2 ) {
                if(visitedPossibleNewNeighbours.length ===2 ){
                    if(visitedPossibleNewNeighbours[0].row === visitedPossibleNewNeighbours[1].row || visitedPossibleNewNeighbours[0].col === visitedPossibleNewNeighbours[1].col) validNeighbours.push(neighbour)
                }
                else{
                    validNeighbours.push(neighbour)
                }
            }
            else if(newNeighbours.length === 2 && possibleNewNeighbours.length === 1 ) validNeighbours.push(neighbour)
        }
    }
    return validNeighbours[Math.floor(Math.random()*validNeighbours.length)];

}

export { getRdfsMaze }