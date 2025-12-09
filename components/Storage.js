import { displayBookmarkDetails } from "./CardList";

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

// Delete all the saved bookmarks

export function deleteAllBookmarks(){
  localStorage.removeItem('bookmarks')
}

// Get bookmarks by category
export function getBookmarksByCategory(categoryId, bookmarks) {
  return bookmarks.filter(b => b.categoryId === categoryId);
}



// This function will render the bookmarks for the search bar when they user search for a specific bookmark

export function renderSearchedBookmarks(bookmarks) {
  const wrapper = document.querySelector('.wrapper');
    
    const searchResultContainer = document.createElement('div');
    searchResultContainer.classList.add('result-container');
    const searchTitle = document.createElement('p');
    searchTitle.classList.add('search-title')
searchTitle.textContent = `${bookmarks.length} found`

  wrapper.innerHTML = "";

  const searchBackBtn = document.createElement('button');
 searchBackBtn.classList.add('back-btn');
searchBackBtn.textContent = '←';
searchBackBtn.style.marginTop ='20px'
searchBackBtn.style.marginBottom ='10px'

  bookmarks.forEach(b => {
  const item = document.createElement('div');
    item.classList.add('bookmark-item');
    item.style.color = 'white'

    const title = b.titleInput || "No title";
    const category = b.categoryId || "No category";
  

    item.innerHTML=`
  
    
    <div class="search-result">
    <p class="category-title">Category: ${category}</p>
    <P> Bookmark:  ${title}</P>
    </div>
    
    <p> 

  `; 


searchResultContainer.append("", item )
    wrapper.appendChild( searchResultContainer);
  });

 searchBackBtn.addEventListener('click', ()=>{
  // Hide the search results
  searchResultContainer.style.display = 'none';
  

  const wrapper = document.querySelector('.wrapper');
  wrapper.innerHTML = ''; 
  location.reload(); 
 })  

 wrapper.prepend(searchBackBtn);

  searchResultContainer.insertBefore(searchTitle, searchResultContainer.firstChild);
  wrapper.style.rowGap= "1rem"
  wrapper.style.alignItems = 'flex-start'
  wrapper.style.marginLeft = '1rem';

}
