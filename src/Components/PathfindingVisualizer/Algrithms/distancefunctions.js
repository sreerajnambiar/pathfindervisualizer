

const eucledianDistance = (point1 , point2 ) =>{
    const [ x1, y1 ]= point1
    const [x2, y2 ]= point2 
    var x = Math.pow((x2 - x1), 2)+Math.pow((y2 - y1), 2)
    let distance = Math.sqrt(x)
    return distance
}

const ManhattenDistance = (point1, point2 ) =>{
      const [ x1, y1 ]= point1
    const [x2, y2 ]= point2 
    var x = Math.pow((x2 - x1), 2)+Math.pow((y2 - y1), 2)
    let distance = Math.sqrt(x)
    return distance
}

export {eucledianDistance , ManhattenDistance};