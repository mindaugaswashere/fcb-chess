export const letterArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ROW_COUNT = 8;
export const colorArray: any = () => {
  const colorArr: any = [];
  let toggler = false;
  for (let i = 1; i <= ROW_COUNT; i += 1) {
    for (let j = 0; j < letterArray.length; j += 1) {
      if (toggler) {
        colorArr.push(j % 2 === 1 ? 'white' : 'black');
      } else {
        colorArr.push(j % 2 === 1 ? 'black' : 'white');
      }
    }
    toggler = !toggler;
  }
  return colorArr;
};

export const coordArray: any = () => {
  const coords: any = [];
  for (let i: any = ROW_COUNT; i >= 1; i -= 1) {
    for (let j: any = 0; j < letterArray.length; j += 1) {
      const coord: any = `${letterArray[j]}${i}`;
      coords.push(coord);
    }
  }
  return coords;
};
