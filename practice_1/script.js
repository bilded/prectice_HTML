document.addEventListener('DOMContentLoaded', () => {
  const homeBtn = document.getElementById('homeBtn');
  const cameraBtn = document.getElementById('cameraBtn');
  const messageBtn = document.getElementById('messageBtn');
  const cakeBtn = document.getElementById('cakeBtn');
  const homeSection = document.getElementById('homeSection');
  const cameraSection = document.getElementById('cameraSection');
  const messageSection = document.getElementById('messageSection');
  const cakeSection = document.getElementById('cakeSection');

  homeBtn.addEventListener('click', () => {
    hideAllSections();
    homeSection.classList.remove('hidden');
  });

  cameraBtn.addEventListener('click', () => {
    hideAllSections();
    cameraSection.classList.remove('hidden');
  });

  messageBtn.addEventListener('click', () => {
    hideAllSections();
    messageSection.classList.remove('hidden');
  });

  cakeBtn.addEventListener('click', () => {
    hideAllSections();
    cakeSection.classList.remove('hidden');
  });

  function hideAllSections() {
    homeSection.classList.add('hidden');
    cameraSection.classList.add('hidden');
    messageSection.classList.add('hidden');
    cakeSection.classList.add('hidden');
  }
});
