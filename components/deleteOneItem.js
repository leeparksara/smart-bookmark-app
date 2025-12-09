// This button component is to delete one saved bookmark 
export function createDeleteButton(title, onDelete) {
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = '🗑️';
  deleteBtn.addEventListener('click', () => onDelete(title));


  return deleteBtn;
}
