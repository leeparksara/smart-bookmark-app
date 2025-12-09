
export function showMessage(message, duration = 3000){

  const confirmText = document.getElementById('confirm-message');
 confirmText.textContent = message;
if (!confirmText) return;
 confirmText.classList.add ('show-text');
 confirmText.classList.remove('hide-text');

 setTimeout(()=>{
  confirmText.classList.remove('show-text');
  confirmText.classList.add('hide-text');
 }, duration)
  
}
