import start from "./modules/start.js";

const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);
  const { main, firstForm } = start(app, title);
};

init('.app', 'Выберите тур');