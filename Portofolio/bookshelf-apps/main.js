document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook')
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function addBook() {
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;
    const generateID = generateId();
    const bookObject = generateBookObject(generateID, bookTitle, bookAuthor, bookYear, isComplete);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

const books = [];
const RENDER_EVENT = 'render-book';


function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}

document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    incompleteBookshelfList.innerHTML = '';

    const completeBookshelfList = document.getElementById('completeBookshelfList');
    completeBookshelfList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isComplete) {
            incompleteBookshelfList.append(bookElement);
        } else {
            completeBookshelfList.append(bookElement);
        }
    }
})

function makeBook(bookObject) {
    const textBook = document.createElement('h3');
    textBook.innerText = bookObject.title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = 'Penulis : ' + bookObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = 'Tahun : ' + bookObject.year;

    const textArticle = document.createElement('article');
    textArticle.classList.add('book_item');
    textArticle.setAttribute('id', `book-${bookObject.id}`);
    textArticle.append(textBook, textAuthor, textYear);

    if (bookObject.isComplete) {
        const action = document.createElement('div');
        action.classList.add('action');

        const buttonInComplete = document.createElement('button');
        buttonInComplete.innerText = 'Belum selesai di Baca';
        buttonInComplete.classList.add('green');

        buttonInComplete.addEventListener('click', function () {
            undoBookFromComplete(bookObject.id);
        })

        const buttonRemove = document.createElement('button');
        buttonRemove.innerText = 'Hapus buku';
        buttonRemove.classList.add('red');

        buttonRemove.addEventListener('click', function () {
            removeTask(bookObject.id);
        })

        action.append(buttonInComplete, buttonRemove);
        textArticle.append(action);

    } else {
        const action = document.createElement('div');
        action.classList.add('action');

        const buttonComplete = document.createElement('button');
        buttonComplete.innerText = 'Selesai dibaca';
        buttonComplete.classList.add('green');

        buttonComplete.addEventListener('click', function () {
            addBookToComplete(bookObject.id);
        })

        const buttonRemove = document.createElement('button');
        buttonRemove.innerText = 'Hapus buku';
        buttonRemove.classList.add('red');

        buttonRemove.addEventListener('click', function () {
            removeTask(bookObject.id);
        })

        action.append(buttonComplete, buttonRemove);
        textArticle.append(action);
    }

    return textArticle;
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

function addBookToComplete(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();

}

function undoBookFromComplete(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function removeTask(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELP_APPS';

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const serialData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serialData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}