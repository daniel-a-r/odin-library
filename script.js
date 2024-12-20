const modal = document.querySelector('dialog');
const openModalButton = document.querySelector('.open-modal');
const closeModalButton = document.querySelector('.close-modal');
const booksContainer = document.querySelector('.books-container');
const readButton = document.querySelector('.read-status');
const addBookButton = document.querySelector('.add-book');

openModalButton.addEventListener('click', () => {
  modal.showModal();
});

closeModalButton.addEventListener('click', () => {
  modal.close();
})

addBookButton.addEventListener('click', () => {
  const title = document.querySelector('#book-title');
  const author = document.querySelector('#book-author');
  const pages = document.querySelector('#book-pages');
  const hasRead = document.querySelector('#book-status');

  if (title.validity.valid && author.validity.valid && pages.validity.valid) {
    const book = new Book(title.value, author.value, pages.value, hasRead.value);
    createBookEntry(book);
    document.querySelector('form').reset();
    modal.close();
  }
});

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = (hasRead == true) ? true : false;
}

// Book.prototype.updateHasRead = function() {
//   this.hasRead = (this.hasRead) ? false : true;
// }

const createBookEntry = (book) => {
  const bookDiv = document.createElement('div');
  bookDiv.className = 'book';

  const bookInfo = createBookInfo(book);
  const bookButtons = createBookButtons(book.hasRead, bookDiv);

  bookDiv.append(bookInfo, bookButtons);
  booksContainer.appendChild(bookDiv);
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

const createBookButtons = (hasRead, bookDiv) => {
  const readStatusButton = createReadStatusButton(hasRead);
  const deleteBookButton = createDeleteBookButton(bookDiv);

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
  addReadStatusEventListner(readStatusButton);
  return readStatusButton;
}

const createDeleteBookButton = (bookDiv) => {
  const deleteBookButton = document.createElement('button');
  deleteBookButton.className = 'delete'
  deleteBookButton.appendChild(document.createTextNode('Delete'));
  deleteBookButton.addEventListener('click', () => {
    bookDiv.remove();
  })

  return deleteBookButton;
}

const addReadStatusEventListner = (readStatusButton) => {
  readStatusButton.addEventListener('click', () => {
    const currentStatus = readStatusButton.classList[1];
  
    const newStatus = (currentStatus === 'not-read') ? 'has-read' : 'not-read';
    readStatusButton.classList.replace(currentStatus, newStatus);
  
    const newTextContent = (currentStatus === 'not-read') ? 'Has Read' : 'Not Read';
    readStatusButton.textContent = newTextContent;
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

bookList.forEach((book) => {
  const bookObj = new Book(book.title, book.author, book.pages, book.hasRead);
  createBookEntry(book);
})



