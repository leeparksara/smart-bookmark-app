// Load bookmarks from localStorage
export function loadBookmarks() {
  const stored = JSON.parse(localStorage.getItem('bookmarks')) || [];
  return stored;
}



// Save bookmark to localStorage so it  doesnt disappear when the user refresh the website
export function saveBookmark(bookmark) {
  const bookmarks = loadBookmarks();
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Delete bookmark from localStorage
export function deleteBookmark(title) {
  let bookmarks = loadBookmarks();
  bookmarks = bookmarks.filter(item => item.titleInput !== title);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Get bookmarks by category
export function getBookmarksByCategory(categoryId, bookmarks) {
  return bookmarks.filter(b => b.categoryId === categoryId);
}



// This function will render the bookmarks for the search bar when they user search for a specific bookmark

export function renderSearchedBookmarks(bookmarks) {
  const wrapper = document.querySelector('.wrapper');
  wrapper.innerHTML = "";

  bookmarks.forEach(b => {
    const item = document.createElement('div');
    item.classList.add('bookmark-item');
    item.style.color = 'white'

    const title = b.titleInput || "No title";
    const category = b.categoryId || "No category";
    const url = b.urlInput || "";

    item.innerHTML=`
    <a href=${url}> 
    <div class="search-result">
    Category :  ${category} </p> 
    <P>${title}</P>
    </div>
    </a>
    <p> 

  `;

    wrapper.appendChild(item);
  });
}
