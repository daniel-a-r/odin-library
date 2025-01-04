const modal = document.querySelector('dialog');
const openModalButton = document.querySelector('.open-modal');
const closeModalButton = document.querySelector('.close-modal');
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
  library.push(book);
  createBookEntry(book, library.length - 1);
  form.reset();
  modal.close();
});

class Book {
  constructor(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = (hasRead == true) ? true : false;
  }

  updateHasRead() {
    this.hasRead = (this.hasRead) ? false : true;
  }
}

const createLibrary = (library) => {
  library.forEach((book, indx) => {
    createBookEntry(book, indx)
  });
};

const createBookEntry = (book, index) => {
  const booksContainer = document.querySelector('.books-container');
  const bookDiv = document.createElement('div');
  bookDiv.className = 'book';
  bookDiv.dataset.bookId = index;

  const bookInfo = createBookInfo(book);
  const bookButtons = createBookButtons(book.hasRead, index);

  bookDiv.append(bookInfo, bookButtons);
  booksContainer.appendChild(bookDiv);
  addDeleteBookEventListener(index);
  addReadStatusEventListner(index);
};

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
};

const createBookButtons = (hasRead) => {
  const readStatusButton = createReadStatusButton(hasRead);
  const deleteBookButton = createDeleteBookButton();

  const buttonsDiv = document.createElement('div')
  buttonsDiv.className = 'book-buttons';
  buttonsDiv.append(readStatusButton, deleteBookButton);

  return buttonsDiv;
};

const createReadStatusButton = (hasRead) => {
  const readStatusButton = document.createElement('button');
  readStatusButton.classList.add('read-status', getReadStatusButtonClass(hasRead));
  const buttonText = getBookStatusButtonText(hasRead);
  readStatusButton.appendChild(document.createTextNode(buttonText));
  return readStatusButton;
};

const getReadStatusButtonClass = (hasRead) => {
  return (hasRead) ? 'has-read' : 'not-read';
};

const getBookStatusButtonText = (hasRead) => {
  return (hasRead) ? 'Has Read' : 'Not Read';
};

const createDeleteBookButton = () => {
  const deleteBookButton = document.createElement('button');
  deleteBookButton.className = 'delete'
  deleteBookButton.appendChild(document.createTextNode('Delete'));

  return deleteBookButton;
};

const addReadStatusEventListner = (bookId) => {
  const readStatusButton = document.querySelector(`.book[data-book-id="${bookId}"] .read-status`);
  readStatusButton.addEventListener('click', () => {
    const currentStatus = readStatusButton.classList[1];
    const book = library.at(bookId);
    book.updateHasRead();

    let newStatusClass = null;
    let newTextContent = null;

    if (book.hasRead) {
      newStatusClass = 'has-read';
      newTextContent = 'Has Read';
    } else {
      newStatusClass = 'not-read';
      newTextContent = 'Not Read';
    }

    readStatusButton.classList.replace(currentStatus, newStatusClass);
    readStatusButton.textContent = newTextContent;
  });
};

const addDeleteBookEventListener = (bookId) => {
  const deleteBookButton = document.querySelector(`.book[data-book-id="${bookId}"] .delete`);
  const booksContainer = document.querySelector('.books-container');
  deleteBookButton.addEventListener('click', () => {
    while (booksContainer.hasChildNodes()) {
      booksContainer.removeChild(booksContainer.firstChild);
    }
    library.splice(bookId, 1);
    createLibrary(library);
  });  
};

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
};

const book3 = {
  title: 'One Hundred Years of Solitude',
  author: 'Gabriel Garcia Marquez',
  pages: 417,
  hasRead: false
};

const library = [book1, book2, book3];

for (let i = 0; i < library.length; i++) {
  const book = new Book(library[i].title, 
                        library[i].author, 
                        library[i].pages, 
                        library[i].hasRead);
  library[i] = book;
}

createLibrary(library);