import { renderCardList } from "./CardList";

// this component is to render the categories 
export function renderCategoryList(onCategoryClick) {
  
    const categoryContainer = document.querySelector('.container')
  const categories = document.querySelectorAll('.category');
  
  categories.forEach(cat => {
    cat.addEventListener('click', () => {
      onCategoryClick(cat.id);
  
    categoryContainer.style.display = 'none';

    });
  });
}
