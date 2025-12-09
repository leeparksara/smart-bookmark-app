import { addNewBookmark } from './newBookmark.js';
import { renderBookmarkForm } from './bookmarkForm.js';
import { createDeleteButton } from './deleteOneItem.js';
import { deleteBookmark, loadBookmarks} from './storage.js'; 
import {createDeleteAllButton} from './deleteAll.js'
let currentOnSave = null;
// Tracking current category for back button
export function renderCardList(categoryId, bookmarks, onSave) {
    const form = document.getElementById('bookmark-form');
  const cardListContainer = document.querySelector('.card-list-container');
  const container = document.querySelector('.container');
  const categories = document.querySelector('.category-container');
  const listContainer = document.querySelector('.lists-container');
  const wrapper = document.querySelector('.wrapper')
  listContainer.style.display ='none';
  cardListContainer.innerHTML = '';
 const cardListBackBtn = document.createElement('button');
 cardListBackBtn.classList.add('cards-back-btn');
 cardListBackBtn.textContent = '←';
  listContainer.style.display ='none';

 cardListBackBtn.addEventListener('click', ()=>{
  categories.style.visibility='visible';
categories.style.marginTop= '4rem'
categories.style.marginBottom ='4rem'
  container.style.display = 'flex';

  cardListContainer.style.display ='none'
  form.style.display ='none';


  
 })
 cardListContainer.appendChild(cardListBackBtn);
 
  currentOnSave = onSave;

  const categoryLabel = document.createElement('h2');
  categoryLabel.textContent = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  categoryLabel.classList.add('category-label');
  cardListContainer.appendChild(categoryLabel);

  const filtered = bookmarks.filter(b => b.categoryId === categoryId);
  filtered.forEach(b => {
    const card = document.createElement('ul');
    card.classList.add('list-card');
    card.innerHTML = `<li>
      ${b.imageData ? `<img src="${b.imageData}" alt="${b.titleInput}" />` : ''}
      <h3>${b.titleInput}</h3> </li>
    `;

    card.addEventListener('click', () => {
      displayBookmarkDetails(b);
        const cardListContainer = document.querySelector('.card-list-container');
        listContainer.style.display ='grid';
      cardListContainer.style.display ='none'
      
    });
    cardListContainer.appendChild( card);
  });



  // Show New Bookmark button , and delete all button . only if there saved cards 
  const newBookmarkButton = addNewBookmark(categoryId, onSave);
  if (filtered.length > 0){
    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

  
    const deleteAllBtn = createDeleteAllButton(categoryId, currentOnSave);





    cardListContainer.style.display = 'flex';
      listContainer.style.display ='none';
    cardListContainer.style.flexDirection = 'column'; 
    
    buttonsContainer.append(deleteAllBtn, newBookmarkButton)
  
  cardListContainer.appendChild(buttonsContainer);
    form.style.display = 'none';


    } else {
      // If no cards saved I want to display the category name and add new bookmark button 
      
      form.style.display = 'flex'
renderBookmarkForm(categoryId, onSave);

    }
}











export function displayBookmarkDetails(item) {
  const lists = document.querySelector('.lists');
  const container = document.querySelector('.container');
const listContainer = document.querySelector('.lists-container');

  const cardListContainer = document.querySelector('.card-list-container');

  lists.innerHTML = `
    <li>
    <p>  ℍ Title </p>
      <h3 class='details'> ${item.titleInput}</h3>
      <p >🔗 Url</p>
      <a class='details' href="${item.urlInput}" target="_blank">   ${item.urlInput}</a>
      <p  > 📝 Description </p>
      <p class='details'>  ${item.description}</p>
      <p>📸 Photos</p>
      ${item.imageData ? `<img src="${item.imageData}" alt="${item.titleInput}" />` : ''}
    </li>

  `;

  // append delete button to remove this item and re render saved cards if there is any
  const delBtn = createDeleteButton(item.titleInput, (title) => {
    deleteBookmark(title);
    const refreshed = loadBookmarks();
    renderCardList(item.categoryId, refreshed, currentOnSave);
    lists.innerHTML = '';
const exisitingBackBtn = listContainer.querySelector('.back-btn');
if(exisitingBackBtn) exisitingBackBtn.remove();

  });
  lists.insertBefore(delBtn, lists.firstChild);
  

  const listBackBtn = document.createElement('button');
 listBackBtn .classList.add('back-btn');
listBackBtn .textContent = '←';


 listBackBtn.addEventListener('click', ()=>{


  container.style.display = 'none';
lists.style.display='none'

  cardListContainer.style.display ='flex'
listBackBtn.style.display ='none';
cardListContainer.style.marginTop = '5rem'
  listContainer.style.display ='none';
  
 })

 listContainer.insertBefore(listBackBtn,  listContainer.firstChild);
 lists.style.display ='flex'
}










