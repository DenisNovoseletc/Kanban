// Перехватываем localStorage, чтобы данные шли в API
const origSet = localStorage.setItem.bind(localStorage);
const origGet = localStorage.getItem.bind(localStorage);

localStorage.setItem = (key, value) => {
  origSet(key, value);
  if (key === 'kanban-cards') {
    fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: value,
    });
  }
};