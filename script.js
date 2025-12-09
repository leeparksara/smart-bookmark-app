import { renderSearchBar } from './components/searchbar.js';
import { renderCategoryList } from './components/Category.js';

import { renderCardList } from './components/CardList.js';
import { loadBookmarks, saveBookmark} from './components/storage.js';



const container = document.querySelector('.container');
const wrapper = document.querySelector('.wrapper');
const listsContainer = document.querySelector('.lists-container');
const cardListContainer = document.querySelector('.card-list-container');


listsContainer.style.display ='none'
cardListContainer.style.display ='none'
export function init() {
  renderSearchBar();
  renderCategoryList(onCategoryClick);

}



export function onCategoryClick(categoryId) {

  const form = document.getElementById('bookmark-form');
  form.style.display = 'none';
  const bookmarks = loadBookmarks();
  renderCardList(categoryId, bookmarks, onBookmarkSave);


  if (window.cardListBackButton && typeof window.cardListBackButton === 'function') {
    window.cardListBackButton(() => {
      const containerEl = document.querySelector('.container');
      const cardListEl = document.querySelector('.card-list-container');
      if (cardListEl) cardListEl.style.display = 'none';
      if (containerEl) {
        containerEl.style.display = 'flex';
        containerEl.innerHTML = '';
        renderCategoryList(onCategoryClick);
      }
    });
  }
}

export function onBookmarkSave(bookmark) {
  
  const existing = loadBookmarks();
  existing.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(existing));
  renderCardList(bookmark.categoryId, loadBookmarks(), onBookmarkSave);


}



document.addEventListener('DOMContentLoaded', init);
