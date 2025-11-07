const wrapper = document.querySelector('.wrapper')
const lists = document.querySelector('.lists');
const bookmarkForm = document.getElementById('bookmark-form');
const cards = document.querySelector('.cards');
const btnContainer = document.createElement('div');
btnContainer.classList.add('button-container')

const searchContainer = document.querySelector('.search-bar-container')
const searchBar = document.createElement('input')

searchBar.placeholder ='Search for saved bookmarks'
searchBar.classList.add('search')
searchContainer.appendChild(searchBar)
const category = document.querySelectorAll('.category')

const container = document.querySelector('.container');
const addBtn = document.createElement('button')
addBtn.textContent = 'New bookmark ';
addBtn.classList.add('add-btn');




// The empty array to push the new inputs items
let newBookmark = [];


//  This function will create the form that will displayed when one of the categories is clicked
function renderForm(categoryId){
  

const titleInput = document.createElement('input');
titleInput.classList.add('title');
titleInput.placeholder = 'Title';
const urlInput = document.createElement('input');
urlInput.classList.add('url');
urlInput.placeholder = 'URL';

const description = document.createElement('textarea');
description.classList.add('description');
description.placeholder = 'Description';

const picInput = document.createElement('input');
picInput.type ='file';
picInput.accept = "image/*"

const saveBtn = document.createElement('button');
saveBtn.classList.add('save-btn');
saveBtn.textContent = 'Save';

const cancelBtn = document.createElement('button');
cancelBtn.classList.add('cancel-btn');
cancelBtn.textContent = 'Cancel';
bookmarkForm.append(titleInput, urlInput, picInput, description, saveBtn, cancelBtn)
wrapper.appendChild(bookmarkForm);

// save button click event

saveBtn.addEventListener('click', ()=>{

if(!titleInput.value.trim()){
  alert('Please fill the title');
  return;
}

const file = picInput.files[0]
if(file){
const reader = new FileReader();
reader.onload = (e)=>{
const imageData = e.target.result;
saveFormData(categoryId, titleInput.value, urlInput.value, imageData, description.value)

};
reader.readAsDataURL(file)
} else{

  saveFormData(categoryId, titleInput.value, urlInput.value, null, description.value);
      const pic = document.getElementById('bookmark-pic')
pic.style.visibility ='hidden'
  
}


cards.style.display = 'flex';
wrapper.appendChild(addBtn)
addBtn.style.display ='block'
bookmarkForm.style.visibility ='hidden';
bookmarkForm.innerHTML = '';


});


}




//This function should save the input feilds values


function saveFormData(categoryId, titleInput, urlInput,picInput, description){



const newData = {categoryId, titleInput, urlInput, picInput, description}
newBookmark.push(newData);
console.log('saved items', newData)

localStorage.setItem('bookmarks', JSON.stringify(newBookmark));


createCard(newData)


}



// function to display the UI of saved input values 
function displaySavedBookmark(item){

  lists.innerHTML = ''; 
const savedBooks = document.createElement('div');

savedBooks.classList.add('saved-books');
savedBooks.innerHTML = `

<li class="saved-books-container">
<h3>${item.titleInput}</h3>
<a href=${item.urlInput}>${item.urlInput}</a>
<p>${item.description}</p>
<img id='bookmark-pic' src=${item.picInput} alt=${item.titleInput}/> 
</li>
<button class="delete-btn">x</button>


`

lists.appendChild(savedBooks);
bookmarkForm.style.display ='none';
cards.style.display = 'none'
wrapper. appendChild(addBtn)


}


function createCard(item){
const wrapper = document.querySelector('.wrapper');
const card = document.createElement('div');

card.innerHTML = `

<div class="list-card">

<li id="thumb-nail">
<img id='bookmark-pic' src=${item.picInput} alt=${item.titleInput}/> 
<h3>${item.titleInput}</h3>
</li>

</div>

`


cards.appendChild(card);

wrapper.appendChild(cards);

card.addEventListener('click', () => {
    displaySavedBookmark(item);

    cards.style.display ='none';
    bookmarkForm.style.display = 'none';
    addBtn.style.display ='block'
  
  });


}




// This forEach will iterate over the categories 
category.forEach(cat => {

cat.addEventListener('click', ()=>{
  const categoryLabel = document.createElement('h3');

  categoryLabel.textContent = cat.id

wrapper.appendChild(categoryLabel)
container.innerHTML = '';
renderForm(  cat.id);
displayCategoryBookmarks(cat.id);

if(cards.children.length === 0){
  bookmarkForm.style.display ='flex';

}else{
bookmarkForm.style.display ='none'
searchContainer.style.visibility='visible';
addBtn.style.display ='block'
wrapper.appendChild(addBtn)

}


})
})


window.addEventListener('DOMContentLoaded', () => {
  const stored = JSON.parse(localStorage.getItem('bookmarks')) || [];
  newBookmark = stored;

});






function displayCategoryBookmarks(categoryId) {
  const lists = document.querySelector('.lists');
  lists.innerHTML = ''; // clear before showing

  const filtered = newBookmark.filter(item => item.categoryId === categoryId);

  filtered.forEach(item => createCard(item) );
}


// this addEventListener is for the add new bookmark button

addBtn.addEventListener('click', ()=>{
bookmarkForm.style.display ='flex';
searchContainer.style.display ='none';
addBtn.style.display ='none';
cards.style.display ='none';
lists.style.display = 'none';
bookmarkForm.style.marginTop = '80px'
})



lists.addEventListener('click', (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const title = e.target.closest('.saved-books').querySelector('h3').textContent;
    newBookmark = newBookmark.filter(item => item.titleInput !== title);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmark));
    e.target.closest('.saved-books').remove();
  }
});

  // if there is no saved cards then i want to hide the form and display the saved cards




  