import start from "./modules/start.js";
import getFormPerson from "./modules/formPerson.js";
import readyPlane from "./modules/readyPlane.js";

const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);
  const { main, firstForm } = start(app, title);

  //когда заполнили первую форму с кол-вом пассажиров...
  firstForm.addEventListener('submit', e => {
    e.preventDefault();

    //удаляем первую форму со страницы...
    firstForm.remove();

    //создаем новые формы в зависимости от кол-ва человек и показываем на странице
    const forms = getFormPerson(firstForm.count.value);
    main.append(...forms);

    //запускаем проверку заполнения форм для дальнейшего показа самолета
    readyPlane(forms, main);
  });
};

init('.app', 'Выберите тур');