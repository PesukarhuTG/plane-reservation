export const getStorage = () => {
  if (localStorage.getItem('tour')) {
    return JSON.parse(localStorage.getItem('tour')); //приводим к виду обычного массива
  } else {
    return [];
  }
};

export const setStrorage = (data) => {
  const storage = getStorage();

  //если сохранили билет, а потом с этим же номером билета снова регистрируется человек,
  //то билет дважды НЕ добавится, а произойдет обновление места пассажира на другое
  const filterBooking = storage.filter(item => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].ticket === item.ticket) {
        return false;
      }
    }
    return item;
  });

  const newBooking = [...filterBooking, ...data];

  localStorage.setItem('tour', JSON.stringify(newBooking));
}