'use strict';

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Открыть меню');
  navigation.classList.remove('open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
matchMedia('(min-width: 741px)').addEventListener('change', closeMenu);

const grid = document.querySelector('.event-grid');
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(filter => {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
    grid.classList.toggle('filtered', category !== 'all');
  });
});

const descriptions = {
  theatre: {title: 'Вечер с другим сценарием', label: 'Театр', text: 'Драматические спектакли, новые постановки и знакомые истории с неожиданной стороны. Можно не знать ни одного режиссёра — просто прийти и почувствовать, что происходит на сцене.'},
  art: {title: 'Посмотреть по-новому', label: 'Выставки', text: 'Живопись, современное искусство и новые способы смотреть на привычные вещи. Здесь не требуется «правильное» мнение: можно удивляться, задавать вопросы и находить своё.'},
  music: {title: 'Услышать вживую', label: 'Музыка', text: 'Камерные вечера, классическая музыка и живой звук. Сменить плейлист на концертный зал, услышать знакомый инструмент иначе и забрать с собой новое впечатление.'}
};
const eventDialog = document.querySelector('#event-dialog');
function showDialog(dialog) {
  dialog.showModal();
  document.body.classList.add('modal-open');
}
document.querySelectorAll('[data-event]').forEach(button => {
  button.addEventListener('click', () => {
    const event = descriptions[button.dataset.event];
    document.querySelector('#dialog-title').textContent = event.title;
    document.querySelector('#dialog-eyebrow').textContent = event.label;
    document.querySelector('#dialog-copy').textContent = event.text;
    showDialog(eventDialog);
  });
});
document.querySelector('.privacy-open').addEventListener('click', () => showDialog(document.querySelector('#privacy-dialog')));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
});
