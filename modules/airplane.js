import createElement from "./createElement.js";
import declOfNum from "./wordsDeclination.js";
import { setStrorage, getStorage } from "../service/storage.js";

const createCockpit = (titleText) => {
  const cockpit = createElement('div', {
    className: 'cockpit',
  });

  const cockpitTitle = createElement('h1', {
    className: 'cockpit-title',
    innerHTML: titleText,
  });

  const cockpitButton = createElement('button', {
    className: 'cockpit-confirm',
    type: 'submit',
    textContent: 'Подтвердить',
  });

  cockpit.append(cockpitTitle, cockpitButton);
  return cockpit;
}

const createExit = () => {
  const fuselage = createElement('div', {
    className: 'exit fuselage',
  });

  return fuselage;
}

const createSeatBlock = (n, count, bookingSeat) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  const fuselage = createElement('ol', {
    className: 'fuselage',
  });

  for (let i = n; i < count + n; i++) {
    const rowWrapper = createElement('li');
    const seats = createElement('ol', {
      className: 'seats',
    });

    const seatsRow = letters.map(letter => {
      const seat = createElement('li', {
        className: 'seat',
      })

      const checkWrapper = createElement('label');
      const seatValue = `${i}${letter}`;
      const check = createElement('input', {
        name: 'seat',
        type: 'checkbox',
        value: seatValue,
        disabled: bookingSeat.includes(seatValue),
      });

      checkWrapper.append(check);
      seat.append(checkWrapper);
      return seat;
    });

    seats.append(...seatsRow);
    rowWrapper.append(seats);
    fuselage.append(rowWrapper);
  }
  return fuselage;
}

const createAirplane = (title, tourData) => {
  const scheme = tourData.scheme;
  const bookingSeat = getStorage(tourData.id).map(item => item.seat);

  const choisesSeat = createElement('form', {
    className: 'choises-seat',
  });

  const plane = createElement('fieldset', {
    className: 'plane',
    name: 'plane',
  });

  const cockpit = createCockpit(title);

  let n = 1; //отчет кол-ва мест в ряду
  //создание мест из массива схемы самолета
  const elements = scheme.map(typeElem => {
    if (typeElem === 'exit') return createExit();
    if (typeof typeElem === 'number') {
      const seatBlock = createSeatBlock(n, typeElem, bookingSeat);
      n += typeElem; //кресла с 1...11, потом с 12...23
      return seatBlock;
    }
  });

  plane.append(cockpit, ...elements);
  choisesSeat.append(plane);
  return choisesSeat;
};

const checkSeat = (form, data, id) => {
  const bookingSeat = getStorage(id).map(item => item.seat);

  form.addEventListener('change', () => {
    const formData = new FormData(form);
    const checked = [...formData].map(([, value]) => value);

    if (checked.length === data.length) {
      [...form].forEach(item => {
        if (item.checked === false && item.name === 'seat') {
          item.disabled = true; //выбрали место - остальные заблокировались
        }
      })
    } else {
      [...form].forEach(item => {
        if (!bookingSeat.includes(item.value)) {
          item.disabled = false; //передумали, сняли выделение с места - остальные разблокировались
        }
      })
    }
  });

  //после выбора мест дополняем наши данные выбранными местами
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const booking = [...formData].map(([, value]) => value);

    for (let i = 0; i < data.length; i++) {
      data[i].seat = booking[i];
    }

    setStrorage(id, data);

    //после фиксирования данных форму скрываем
    form.remove();

    document.body.innerHTML = `
      <h1 class="title">Спасибо, хорошего полёта!</h1>
      <h2 class="title">${booking.length === 1 ? `Ваше место ${booking}` : `Ваши места ${booking.join(', ')}`}</h2>
    `;
  })

};

const airplane = (main, data, tourData) => {
  const title = `Выберите ${declOfNum(data.length, ['место', 'места', 'мест'])}`;

  /*const scheme = ['exit', 11, 'exit', 1, 'exit', 17, 'exit'];*/
  //схема самолета передавалась ниже вместо tourData до подключения API
  const choiseForm = createAirplane(title, tourData)

  checkSeat(choiseForm, data, tourData.id);//проверка, сколько мест человек бронирует. Чтобы на схеме не щелкалось больше указанного

  main.append(choiseForm); //отрисовываем самолет
};

export default airplane;