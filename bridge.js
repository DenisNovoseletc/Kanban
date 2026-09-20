// Перехватываем localStorage, чтобы данные шли в API
const origSet = localStorage.setItem.bind(localStorage);
const origGet = localStorage.getItem.bind(localStorage);

localStorage.setItem = (key, value) => {
  origSet(key, value);
  if (key === 'kanban-cards') {
    console.log('[bridge] sending to backend:', value);
    fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: value,
    })
    .then(r => console.log('[bridge] response:', r.status))
    .catch(err => console.warn('[bridge] backend not available:', err.message));
  }
};
