document.addEventListener("DOMContentLoaded", function () {
    fetch('./data/slider.json')
      .then(response => response.json())
      .then(data => {
        const slider = document.getElementById('book-slider');
  
        data.forEach((book, index) => {
          // Create book cell using template literals
          const bookCell = document.createElement('div');
          bookCell.classList.add('book-cell');
          bookCell.innerHTML = `
            <div class="book-img">
              <img src="${book.img}" alt="${book.title}" class="book-photo">
            </div>
            <div class="book-content">
              <div class="book-title">${book.title}</div>
              <div class="book-author">by ${book.author}</div>
              <div class="rate">
                <fieldset class="rating">
                  ${[5, 4, 3, 2, 1].map(i => `
                    <input type="checkbox" id="star${index * 5 + i}" name="rating" value="${i}" ${i <= book.rating ? 'checked' : ''}>
                    <label class="full" for="star${index * 5 + i}"></label>
                  `).join('')}
                </fieldset>
                <span class="book-voters">${book.voters} voters</span>
              </div>
              <div class="book-sum">${book.summary}</div>
              <div class="${book.buttonClass}">${book.buttonText}</div>
            </div>
          `;
  
          // Append book cell to slider
          slider.appendChild(bookCell);
        });
  
        // Initialize Flickity after adding the cells
        var flkty = new Flickity(slider, {
          wrapAround: true
        });
      })
      .catch(error => {
        console.error('Error loading the slider:', error);
        document.getElementById('book-slider').textContent = "Failed to load books. Please try again later.";
      });
  });
  