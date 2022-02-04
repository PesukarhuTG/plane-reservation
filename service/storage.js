export const getStorage = () => {
  if (localStorage.getItem('tour')) {
    return JSON.parse(localStorage.getItem('tour')); //приводим к виду обычного массива
  } else {
    return [];
  }
};

export const setStrorage = (data) => {
  localStorage.setItem('tour', JSON.stringify(data));
}