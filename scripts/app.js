document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/books.json')
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('book-list');
            data.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.innerHTML = `<a href="book.html?id=${book.id}">${book.title}</a>`;
                bookList.appendChild(bookItem);
            });
        });
});