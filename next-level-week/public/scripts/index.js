const searchButton = document.querySelector('#page-home main a');
const openModal = document.querySelector('#modal');
const closeModal = document.querySelector('#modal .header a');

searchButton.addEventListener('click', () => {
    openModal.classList.remove('hide');
});

closeModal.addEventListener('click', () => {
    openModal.classList.add('hide')
})