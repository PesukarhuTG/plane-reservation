import createElement from "./createElement.js";
///import declination from "./wordsDeclination.js";
import declOfNum from "./wordsDeclination.js";

const createCockpit = (titleText) => {
  const cockpit = createElement('div', {
    className: 'cockpit',
  });

  const cockpitTitle = createElement('h1', {
    className: 'cockpit-title',
    textContent: titleText,
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

const createSeatBlock = (n, count) => {
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
      const check = createElement('input', {
        name: 'seat',
        type: 'checkbox',
        value: `${i}${letter}`,
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

const createAirplane = (title, scheme) => {
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
      const seatBlock = createSeatBlock(n, typeElem);
      n += typeElem; //кресла с 1...11, потом с 12...23
      return seatBlock;
    }
  });

  plane.append(cockpit, ...elements);
  choisesSeat.append(plane);
  return choisesSeat;
};

const airplane = (main, data) => {
  const title = `Выберите ${declOfNum(data.length)}`;
  const scheme = ['exit', 11, 'exit', 1, 'exit', 17, 'exit']; //схема самолета
  main.append(createAirplane(title, scheme)) //отрисовываем самолет
}

export default airplane;