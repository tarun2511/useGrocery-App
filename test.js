let arr = [1,3,4];
let j = arr.join("-");

arr.slice(0,1);

arr.splice(0, 1, 23, 4);

arr.filter(el => el < 2);

const initialState = 0;


arr.reduce((accumulator, currentValue) => 
accumulator + currentValue, 
initialValue)