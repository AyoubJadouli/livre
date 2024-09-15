document.addEventListener("DOMContentLoaded", function () {
    // Fetch authors of the week from authorsOfTheWeek.json
    fetch('data/authorsOfTheWeek.json')
      .then(response => response.json())
      .then(data => {
        const authorsContainer = document.querySelector('.week');
        data.authorsOfTheWeek.forEach(author => {
          const authorDiv = document.createElement('div');
          authorDiv.classList.add('author');
          authorDiv.innerHTML = `
            <img src="${author.img}" alt="${author.name}" class="author-img">
            <div class="author-name">${author.name}</div>
          `;
          authorsContainer.appendChild(authorDiv);
        });
      })
      .catch(error => console.error('Error fetching the authors:', error));

    // Fetch books of the year from booksOfTheYear.json
    fetch('data/booksOfTheYear.json')
      .then(response => response.json())
      .then(data => {
        const booksContainer = document.querySelector('.week.year');
        data.booksOfTheYear.forEach(book => {
          const bookDiv = document.createElement('div');
          bookDiv.classList.add('year-book');
          bookDiv.innerHTML = `
            <img src="${book.img}" alt="${book.title}" class="year-book-img">
            <div class="year-book-content">
              <div class="year-book-name">${book.title}</div>
              <div class="year-book-author">${book.author}</div>
            </div>
          `;
          booksContainer.appendChild(bookDiv);
        });
      })
      .catch(error => console.error('Error fetching the books:', error));
});
