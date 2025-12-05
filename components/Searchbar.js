import { loadBookmarks, renderSearchedBookmarks } from "./Storage";

export function renderSearchBar(){
  const searchbarContainer = document.querySelector('.search-bar-container');

  if(!searchbarContainer) retrun;
// Making sure that the container is clear
searchbarContainer.innerHtml = "";

// Here I create the search input dinamically 
  const searchInput = document.createElement('input');
searchInput.type = 'search';
  searchInput.placeholder = 'Search ...';
searchInput.classList.add('search');


  // This button is to search 
  const searchBtn = document.createElement('button');
  searchBtn.classList.add('search-btn');
  searchBtn.textContent ='⌕';
  
searchBtn.style.fontSize ='2.8rem'
searchBtn.style.color ='#cacacaff'
searchBtn.style.backgroundColor='transparent'
searchBtn.style.border ='none'


  searchbarContainer.append( searchInput, searchBtn);
  

  
  



  searchBtn.addEventListener('click', ()=>{



      const q = (searchInput.value || '').trim().toLowerCase();
// the loadbookmarks is the array from the local storage 

    const all = loadBookmarks();

      if(!Array.isArray(all)|| all.length === 0){
      renderSearchedBookmarks([]);
    
      return;
      
    }
if( q === ''){
  renderSearchedBookmarks(all);
  return;
}
// filter 

const filtered = all.filter(b=>{
  const title = (b.titleInput || '').toLowerCase();
  const category = (b.categoryId || '').toLowerCase();
  const url = (b.urlInput || '').toLowerCase();
  const desc = (b.description || '').toLowerCase();
  

return(
  title.includes(q) ||
  category.includes(q) ||
  url.includes(q) ||
  desc.includes(q)
);

});
renderSearchedBookmarks(filtered)

  })

}

  //searchInput.addEventListener('p')
