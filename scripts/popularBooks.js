document.addEventListener("DOMContentLoaded", function () {
    const bookCardsContainer = document.getElementById('book-cards');
    const bookTypesContainer = document.querySelector('.book-types');
  
    let allBooks = [];
    let allGenres = new Set();
  
    // Function to render books based on selected genre
    function renderBooks(genre) {
      // Clear current book cards
      bookCardsContainer.innerHTML = '';
  
      // Filter books by genre
      const filteredBooks = genre === 'All Genres'
        ? allBooks
        : allBooks.filter(book => book.genre === genre);
  
      // Generate and display the book cards
      filteredBooks.forEach((book, index) => {
        // Create the book card
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
  
        // Likes section
        let likesHtml = '';
        book.likes.profiles.forEach(profile => {
          likesHtml += `
            <div class="like-profile">
              <img src="${profile.img}" alt="${profile.name || 'User'}" class="like-img">
            </div>
          `;
        });
  
        // Displaying names from the first two profiles if available
        const likeNames = book.likes.profiles
          .filter(profile => profile.name) // Only include profiles with a name
          .map(profile => profile.name)
          .slice(0, 2); // Limit to the first two names
  
        let likeNamesHtml = likeNames.join(' and ');
        if (likeNamesHtml && book.likes.text) {
          likeNamesHtml += ` and ${book.likes.text}`;
        } else if (book.likes.text) {
          likeNamesHtml = book.likes.text;
        }
  
        // Rating section (from value 5 down to 1)
        let ratingHtml = '';
        for (let i = 5; i >= 1; i--) {
          const starId = `star-c${index}-${i}`;
          ratingHtml += `
            <input type="checkbox" id="${starId}" name="rating" value="${i}" ${i <= book.rating ? 'checked' : ''}>
            <label class="full" for="${starId}"></label>
          `;
        }
  
        // Generate the HTML structure for the book card
        bookCard.innerHTML = `
          <div class="content-wrapper">
            <img src="${book.img}" alt="${book.title}" class="book-card-img">
            <div class="card-content">
              <div class="book-name">${book.title}</div>
              <div class="book-by">by ${book.author}</div>
              <div class="rate">
                <fieldset class="rating book-rate">
                  ${ratingHtml}
                </fieldset>
                <span class="book-voters card-vote">${book.voters}</span>
              </div>
              <div class="book-sum card-sum">${book.summary}</div>
            </div>
          </div>
          <div class="likes">
            ${likesHtml}
            <div class="like-name">${likeNamesHtml}</div>
          </div>
        `;
  
        // Append the book card to the container
        bookCardsContainer.appendChild(bookCard);
      });
    }
  
    // Function to render genre links
    function renderGenreLinks() {
      bookTypesContainer.innerHTML = ''; // Clear current links
  
      // Create 'All Genres' link
      const allGenresLink = document.createElement('a');
      allGenresLink.href = '#';
      allGenresLink.classList.add('book-type', 'active');
      allGenresLink.textContent = 'All Genres';
      bookTypesContainer.appendChild(allGenresLink);
  
      // Create links for each genre
      allGenres.forEach(genre => {
        const genreLink = document.createElement('a');
        genreLink.href = '#';
        genreLink.classList.add('book-type');
        genreLink.textContent = genre;
        bookTypesContainer.appendChild(genreLink);
      });
  
      // Add click event listeners to genre links
      const genreLinks = document.querySelectorAll('.book-type');
      genreLinks.forEach(link => {
        link.addEventListener('click', function (e) {
          e.preventDefault();
  
          // Remove active class from all links
          genreLinks.forEach(link => link.classList.remove('active'));
  
          // Add active class to clicked link
          this.classList.add('active');
  
          // Get the selected genre and render books
          const selectedGenre = this.textContent.trim();
          renderBooks(selectedGenre);
        });
      });
    }
  
    // Fetch the book data from books.json
    fetch('data/books.json')
      .then(response => response.json())
      .then(data => {
        allBooks = data; // Store all books for future filtering
  
        // Extract genres from books
        allBooks.forEach(book => allGenres.add(book.genre));
  
        // Render genre links dynamically
        renderGenreLinks();
  
        // Initially display all books
        renderBooks('All Genres');
      })
      .catch(error => console.error('Error fetching the book data:', error));
  });
  