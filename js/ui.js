const books = document.querySelector(".books");

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add book form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

// render book data
const renderBook = (data, id) => {

  const html = `
    <div class="card-panel book white row" data-id="${id}">
      <img src="/img/book.png" alt="book thumb">
      <div class="book-details">
        <div class="book-title">${data.title}</div>
        <div class="book-author">${data.author}</div>
      </div>
      <div class="book-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;

  books.innerHTML += html;
};

// remove book from DOM
const removeBook = id => {
  const book = document.querySelector(`.book[data-id="${id}"]`);
  book.remove();
}