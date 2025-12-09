import{showMessage} from './confirm'
export function renderBookmarkForm(categoryId, onSave) {
  const form = document.getElementById('bookmark-form');
  const cardListContainer = document.querySelector('.card-list-container');
  const container = document.querySelector('.container');
    const categories = document.querySelector('.category-container');

  form.innerHTML = '';
  form.style.display = 'flex';

  const titleInput = document.createElement('input');
  titleInput.classList.add('title');
  titleInput.placeholder = 'Title';
  
  const urlInput = document.createElement('input');
  urlInput.classList.add('url');
  urlInput.placeholder = 'URL';
  
  const description = document.createElement('textarea');
  description.classList.add('description');
  description.placeholder = 'Description';
  
  const imageFileInput = document.createElement('input');
  imageFileInput.classList.add('image-file');
  imageFileInput.type = 'file';
  imageFileInput.accept = 'image/*';

  const btnContainer = document.createElement('div');
  btnContainer.classList.add('button-container');

  const saveBtn = document.createElement('button');
  saveBtn.classList.add('save-btn'); 
  saveBtn.textContent = 'Save'; 
  
  const cancelBtn = document.createElement('button'); 
  cancelBtn.classList.add('cancel-btn');
  cancelBtn.textContent = 'Cancel';


 const formBackBtn = document.createElement('button');
 formBackBtn.classList.add('back-btn');
 formBackBtn.textContent = '←';
 formBackBtn.style.marginLeft = 0;



  
  btnContainer.append( cancelBtn, saveBtn);
  form.append(formBackBtn,titleInput, urlInput, imageFileInput, description, btnContainer);

  saveBtn.addEventListener('click', () => {

    if (!titleInput.value.trim()) {
      alert('Please fill the title');
      return;
    }

    const file = imageFileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 300;
          const scale = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const resizedData = canvas.toDataURL('image/jpeg', 0.7);

          onSave({
            categoryId,
            titleInput: titleInput.value,
            urlInput: urlInput.value,
            description: description.value,
            imageData: resizedData
          });
          
          form.style.display = 'none';
          cardListContainer.style.display = 'flex';
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      onSave({
        categoryId,
        titleInput: titleInput.value,
        urlInput: urlInput.value,
        description: description.value,
        imageData: null
      });
      
      
      form.style.display = 'none';
      cardListContainer.style.display = 'flex';
    }
    
    showMessage("✅ Bookmark Saved!", 3000);


  });

  cancelBtn.addEventListener('click', () => {
    form.style.display = 'none';

    cardListContainer.style.display = 'none';
    categories.style.marginTop ='4rem'
  container.style.display='flex';
  });



  formBackBtn.addEventListener('click', ()=>{
    form.style.display = 'none';
    categories.style.display = 'grid';
    container.style.display ='flex';
    categories.style.marginTop = '4rem';
  })
}