import airplane from "./airplane.js";

const readyPlane = (forms, main) => {
  const data = [];

  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();

      //каждую заполняемую форму блокируем после ввода данных
      for (const element of form.elements) {
        element.disabled = true;
      }

      //сохраняем вводимые данные пассажиров
      data.push({
        name: form.name.value,
        ticket: form.ticket.value,
      });

      //когда все формы заполнятся, скрываем формы и запускаем показ самолета
      if (forms.length === data.length) {
        forms.forEach(form => form.remove());
        airplane(main, data);
      }
    });
  })
}

export default readyPlane;