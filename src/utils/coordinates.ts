export const letterArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ROW_COUNT = 8;
export const colorArray: any = () => {
  let colorArr: any = [];
  let toggler = false;
  for (let i = 1; i <= ROW_COUNT; i++) {      
    for (let j = 0; j < letterArray.length; j++) {
      if (toggler) {
        colorArr.push(j % 2 === 1 ? "white" : "black")
      } else {
        colorArr.push(j % 2 === 1 ? "black" : "white")
      } 
    }
    toggler = !toggler;
  }
  return colorArr;
}
export const coordArray: any = () => {
  let coords: any = [];
  for (let i: any = ROW_COUNT; i >= 1; i--) {
    for (let j:any = 0; j < letterArray.length; j++) {      
      const coord: any = `${letterArray[j]}${i}`;
      coords.push(coord);
    }
  }
  return coords;
}