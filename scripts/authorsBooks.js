document.addEventListener("DOMContentLoaded", function () {
    // Fetch the author and book data from the JSON file
    fetch('data/authorsBooks.json')
      .then(response => response.json())
      .then(data => {
        // Dynamically populate Authors of the Week
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

        // Dynamically populate Books of the Year
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
      .catch(error => console.error('Error fetching the authors and books:', error));
});
