const modal = document.querySelector('dialog');
const openModalButton = document.querySelector('.open-modal');
const closeModalButton = document.querySelector('.close-modal');
const booksContainer = document.querySelector('.books-container');
const readButton = document.querySelector('.read-status');
const addBookButton = document.querySelector('.add-book');
const form = document.querySelector('form');

openModalButton.addEventListener('click', () => {
  modal.showModal();
});

closeModalButton.addEventListener('click', () => {
  modal.close();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = event.target;
  const title = formData[0].value;
  const author = formData[1].value;
  const pages = formData[2].value;
  const hasRead = formData[3].value;

  const book = new Book(title, author, pages, hasRead);
  console.log(book);
  createBookEntry(book);
  form.reset();
  modal.close();
});

class Book {
  static #counter = 0;

  constructor(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = (hasRead == true) ? true : false;
    this.id = Book.#counter;
    
    Book.#counter++;
  }

  updateHasRead() {
    this.hasRead = (this.hasRead) ? false : true;
  }
}

const createBookEntry = (book) => {
  const bookDiv = document.createElement('div');
  bookDiv.className = 'book';
  bookDiv.dataset.bookId = book.id;

  const bookInfo = createBookInfo(book);
  const bookButtons = createBookButtons(book.hasRead, book.id);

  bookDiv.append(bookInfo, bookButtons);
  booksContainer.appendChild(bookDiv);
  addDeleteBookEventListener(book.id);
  addReadStatusEventListner(book.id);
  bookMap.set(book.id, book);
  console.log(bookMap);
}

const createBookInfo = (book) => {
  const title = document.createElement('span');
  title.className = 'title'
  title.appendChild(document.createTextNode(book.title));
  
  const author = document.createElement('span');
  author.className = 'author';
  author.appendChild(document.createTextNode(book.author));
  
  const pages = document.createElement('span');
  pages.className = 'pages';
  pages.appendChild(document.createTextNode(`${book.pages} pages`));
  
  const bookInfo = document.createElement('div');
  bookInfo.className = 'book-info';
  bookInfo.append(title, author, pages);

  return bookInfo;
}

const createBookButtons = (hasRead) => {
  const readStatusButton = createReadStatusButton(hasRead);
  const deleteBookButton = createDeleteBookButton();

  const buttonsDiv = document.createElement('div')
  buttonsDiv.className = 'book-buttons';
  buttonsDiv.append(readStatusButton, deleteBookButton);

  return buttonsDiv;
}

const getReadStatusButtonClass = (hasRead) => {
  return (hasRead) ? 'has-read' : 'not-read';
}

const getBookStatusButtonText = (hasRead) => {
  return (hasRead) ? 'Has Read' : 'Not Read';
}

const createReadStatusButton = (hasRead) => {
  const readStatusButton = document.createElement('button');
  readStatusButton.classList.add('read-status', getReadStatusButtonClass(hasRead));
  const buttonText = getBookStatusButtonText(hasRead);
  readStatusButton.appendChild(document.createTextNode(buttonText));
  return readStatusButton;
}

const createDeleteBookButton = () => {
  const deleteBookButton = document.createElement('button');
  deleteBookButton.className = 'delete'
  deleteBookButton.appendChild(document.createTextNode('Delete'));

  return deleteBookButton;
}

const addReadStatusEventListner = (bookId) => {
  const readStatusButton = document.querySelector(`.book[data-book-id="${bookId}"] .read-status`);
  readStatusButton.addEventListener('click', () => {
    const currentStatus = readStatusButton.classList[1];
  
    const newStatus = (currentStatus === 'not-read') ? 'has-read' : 'not-read';
    readStatusButton.classList.replace(currentStatus, newStatus);
  
    const newTextContent = (currentStatus === 'not-read') ? 'Has Read' : 'Not Read';
    readStatusButton.textContent = newTextContent;

    const bookObj = bookMap.get(bookId);
    bookObj.updateHasRead();

    console.log(bookMap);
  });
}

const addDeleteBookEventListener = (bookId) => {
  const deleteBookButton = document.querySelector(`.book[data-book-id="${bookId}"] .delete`);
  deleteBookButton.addEventListener('click', () => {
    const bookDiv = document.querySelector(`.book[data-book-id="${bookId}"]`);
    bookDiv.remove();
    bookMap.delete(bookId);
    console.log(bookMap);
  });  
}

const book1 = {
  title: 'Pride and Prejudice',
  author: 'Jane Austen',
  pages: 279,
  hasRead: false
};

const book2 = {
  title: '1984',
  author: 'George Orwell',
  pages: 298,
  hasRead: true
}

const book3 = {
  title: 'One Hundred Years of Solitude',
  author: 'Gabriel Garcia Marquez',
  pages: 417,
  hasRead: false
}

const bookList = [book1, book2, book3];
const bookMap = new Map();

bookList.forEach((book) => {
  const bookObj = new Book(book.title, book.author, book.pages, book.hasRead);
  createBookEntry(bookObj);
})

