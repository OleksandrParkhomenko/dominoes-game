export const shuffleArray = (array: any[]) => {
  for (let _i = array.length - 1; _i > 0; _i--) {
    const _j = Math.floor(Math.random() * (_i + 1));
    [array[_i], array[_j]] = [array[_j], array[_i]];
  }
};

export const removeElementFromArray = (array: any[], element: any) => {
  const index = array.indexOf(element);
  array.splice(index, 1);
};
