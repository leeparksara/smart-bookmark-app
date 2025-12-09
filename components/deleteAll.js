import { deleteAllBookmarks, loadBookmarks } from "./storage";
import { renderCardList } from "./CardList";
import { renderBookmarkForm } from "./bookmarkForm";
export function createDeleteAllButton(categoryId, onSave) {
  const cardListContainer = document.querySelector('.card-list-container');
  const listContainer = document.querySelector('.lists-container');
    const deleteAllBtn = document.createElement('button');
    deleteAllBtn.textContent = 'Delete all';
    deleteAllBtn.classList.add('delete-all-btn');
  
    deleteAllBtn.addEventListener('click', () => {
      const confirmModal = confirm("Are you sure you want to delete ALL saved bookmarks?");
      if (!confirmModal) return;

      deleteAllBookmarks();

      
      if (cardListContainer) cardListContainer.innerHTML = '';
      if (listContainer) listContainer.innerHTML = '';


      const refreshed = loadBookmarks();
      cardListContainer.style.display ='none'
    
      renderBookmarkForm(categoryId, refreshed, onSave)
    });

    
    return deleteAllBtn;
}
