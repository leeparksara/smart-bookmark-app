import { renderBookmarkForm } from "./bookmarkForm";

export function addNewBookmark(categoryId, onSave){

  const form = document.getElementById('bookmark-form');
  const cardListContainer = document.querySelector('.card-list-container');
  const container = document.querySelector('.container');
  
  const addBtn = document.createElement('button');
  addBtn.textContent = 'New bookmark ';
  addBtn.classList.add('add-btn');
  
  addBtn.addEventListener('click', ()=>{
    form.style.display = 'flex';
    addBtn.style.display = 'none';
    cardListContainer.style.display = 'none';
    renderBookmarkForm(categoryId, onSave);
  
  });
  
  return addBtn;
}