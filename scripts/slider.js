// // slider.js

// // Ensure that `sliderData` is available (from data.js included before this script)
// // If `sliderData` is not in data.js, include it here or adjust accordingly.

// document.addEventListener("DOMContentLoaded", function () {
//     const slider = document.getElementById('book-slider');
//     if (!slider) {
//       console.error('Slider element not found');
//       return;
//     }
  
//     // Loop through the sliderData array and create book cells
//     sliderData.forEach((book, index) => {
//       // Create book cell container
//       const bookCell = document.createElement('div');
//       bookCell.classList.add('book-cell');
//       if (book.bookCellClass) {
//         bookCell.classList.add(book.bookCellClass);
//       }
  
//       // Generate unique IDs for rating inputs and labels
//       const fieldsetId = index * 10;
  
//       const rateSection = `
//         <div class="rate">
//           <fieldset class="${book.ratingClass}">
//             ${[5, 4, 3, 2, 1].map(i => `
//               <input type="checkbox" id="star${fieldsetId + i}" name="rating${fieldsetId}" value="${i}" ${i === book.rating ? 'checked' : ''}>
//               <label class="${book.labelClass}" for="star${fieldsetId + i}"></label>
//             `).join('')}
//           </fieldset>
//           <span class="book-voters">${book.voters}</span>
//         </div>
//       `;
  
//       // Build the inner HTML for the book cell
//       bookCell.innerHTML = `
//         <div class="book-img">
//           <img src="${book.img}" alt="${book.title}" class="book-photo">
//         </div>
//         <div class="book-content ${book.bookContentClass}">
//           <div class="book-title">${book.title}</div>
//           <div class="book-author">${book.author}</div>
//           ${rateSection}
//           <div class="book-sum">${book.summary}</div>
//           <div class="${book.buttonClasses}">${book.buttonText}</div>
//         </div>
//       `;
  
//       // Append the book cell to the slider
//       slider.appendChild(bookCell);
//     });
  
//     // Initialize Flickity after adding the cells
//     const flkty = new Flickity(slider, {
//       wrapAround: true,
//       prevNextButtons: true,
//       pageDots: true,
//       // Any other options you need
//     });
//   });
  

// slider.js

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById('book-slider');
    if (!slider) {
      console.error('Slider element not found');
      return;
    }
  
    // Fetch the slider data from slider.json
    fetch('data/slider.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(sliderData => {
        // Process the slider data
        sliderData.forEach((book, index) => {
          // Create book cell container
          const bookCell = document.createElement('div');
          bookCell.classList.add('book-cell');
          if (book.bookCellClass) {
            bookCell.classList.add(book.bookCellClass);
          }
  
          // Generate unique IDs for rating inputs and labels
          const fieldsetId = index * 10;
  
          const rateSection = `
            <div class="rate">
              <fieldset class="${book.ratingClass}">
                ${[5, 4, 3, 2, 1].map(i => `
                  <input type="checkbox" id="star${fieldsetId + i}" name="rating${fieldsetId}" value="${i}" ${i === book.rating ? 'checked' : ''}>
                  <label class="${book.labelClass}" for="star${fieldsetId + i}"></label>
                `).join('')}
              </fieldset>
              <span class="book-voters">${book.voters}</span>
            </div>
          `;
  
          // Build the inner HTML for the book cell
          bookCell.innerHTML = `
            <div class="book-img">
              <img src="${book.img}" alt="${book.title}" class="book-photo">
            </div>
            <div class="book-content ${book.bookContentClass}">
              <div class="book-title">${book.title}</div>
              <div class="book-author">${book.author}</div>
              ${rateSection}
              <div class="book-sum">${book.summary}</div>
              <div class="${book.buttonClasses}">${book.buttonText}</div>
            </div>
          `;
  
          // Append the book cell to the slider
          slider.appendChild(bookCell);
        });
  
        // Initialize Flickity after adding the cells
        const flkty = new Flickity(slider, {
          wrapAround: true,
          prevNextButtons: true,
          pageDots: true,
          // Any other options you need
        });
      })
      .catch(error => {
        console.error('Error fetching slider data:', error);
      });
  });
  