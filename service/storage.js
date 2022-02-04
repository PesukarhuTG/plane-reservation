export const getStorage = (id) => {
  if (localStorage.getItem(`tour-${id}`)) {
    return JSON.parse(localStorage.getItem(`tour-${id}`)); //приводим к виду обычного массива
  } else {
    return [];
  }
};

export const setStrorage = (id, data) => {
  const storage = getStorage(id);

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

  localStorage.setItem(`tour-${id}`, JSON.stringify(newBooking));
}