document.addEventListener("DOMContentLoaded", function () {
    const bookCardsContainer = document.getElementById('book-cards');
  
    // Fetch the book data from book.json
    fetch('data/book.json')
      .then(response => response.json())
      .then(data => {
        data.forEach((book, index) => {
          // Create the book card
          const bookCard = document.createElement('div');
          bookCard.classList.add('book-card');
  
          // Likes section (first 2 profiles + names)
          let likesHtml = '';
          book.likes.forEach(like => {
            likesHtml += `
              <div class="like-profile">
                <img src="${like.img}" alt="" class="like-img">
              </div>
            `;
          });
          const likeNames = book.likes.map(like => like.name).join(' and ');
  
          // Rating section
          let ratingHtml = '';
          for (let i = 1; i <= 5; i++) {
            ratingHtml += `
              <input type="checkbox" id="star-${index}-${i}" name="rating-${index}" value="${i}" ${i <= book.rating ? 'checked' : ''}>
              <label class="full" for="star-${index}-${i}"></label>
            `;
          }
  
          // Generate the HTML structure for the book card
          bookCard.innerHTML = `
            <div class="content-wrapper">
              <img src="${book.img}" alt="${book.title}" class="book-card-img">
              <div class="card-content">
                <div class="book-name">${book.title}</div>
                <div class="book-by">${book.author}</div>
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
              <div class="like-name"><span>${likeNames}</span> like this</div>
            </div>
          `;
  
          // Append the book card to the container
          bookCardsContainer.appendChild(bookCard);
        });
      })
      .catch(error => console.error('Error fetching the book data:', error));
  });
  