import createElement from "./createElement.js";

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

const createAirplane = (title, scheme) => {
  const choisesSeat = createElement('form', {
    className: 'choises-seat',
  });

  const plane = createElement('fieldset', {
    className: 'plane',
    name: 'plane',
  });

  const cockpit = createCockpit(title);

  //создание мест из массива схемы самолета
  const elements = scheme.map(typeElem => {
    if (typeElem === 'exit') return createExit();
  });

  plane.append(cockpit, ...elements);
  choisesSeat.append(plane);
  return choisesSeat;
};

const airplane = (main, data) => {
  const title = 'Выберите места';
  const scheme = ['exit', 11, 'exit', 1, 'exit', 17, 'exit']; //схема самолета

  main.append(createAirplane(title, scheme)) //отрисовываем самолет
}

export default airplane;