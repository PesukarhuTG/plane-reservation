import start from "./modules/start.js";
import getFormPerson from "./modules/formPerson.js";
import readyPlane from "./modules/readyPlane.js";
import getData from "./service/getTour.js";

const init = async (selectorApp, title) => {
  const app = document.querySelector(selectorApp);
  const data = await getData();
  const { main, firstForm, h1 } = start(app, title, data);

  //когда заполнили первую форму с кол-вом пассажиров...
  firstForm.addEventListener('submit', e => {
    e.preventDefault();

    //улучшение после подключения API
    const tourData = data.find(item => item.id === firstForm.tour.value);
    h1.textContent = tourData.tour;

    //удаляем первую форму со страницы...
    firstForm.remove();

    //создаем новые формы в зависимости от кол-ва человек и показываем на странице
    const forms = getFormPerson(firstForm.count.value);
    main.append(...forms);

    //запускаем проверку заполнения форм для дальнейшего показа самолета
    readyPlane(forms, main, tourData);
  });
};

init('.app', 'Выберите тур');