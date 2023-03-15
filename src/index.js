import './css/style.css';
import Notiflix from 'notiflix';
// myFunction FATCH
import { fetchImage } from './fetshForm';
import { createMarkup } from './createMarcup';
// SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// start libery AXIOS
const axios = require('axios').default;
// obj link
const refs = {
  form: document.querySelector('.search-form'),
  myInput: document.querySelector('.search-input'),
  myButton: document.querySelector('.search-buttot'),
  wraperGalery: document.querySelector('.gallery'),
  photoCard: document.querySelector('.photo-card'),
  wraperInfo: document.querySelector('.info'),
  infoItem: document.querySelector('.info-item'),
  loadMore: document.querySelector('.loadMore'),
};
// Destructuring
const {
  form,
  myInput,
  myButton,
  wraperGalery,
  photoCard,
  wraperInfo,
  infoItem,
  loadMore,
} = refs;

let myPage = 1;

//listening
form.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', addImage);

// start SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });
// function click search
async function onSubmit(event) {

	if (myInput.value === '') {
		return
	}

  event.preventDefault();
  wraperGalery.innerHTML = '';
  myPage = 1;
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  const myTextContent = searchQuery.value.trim();
  if (!myTextContent) {
    return console.log('ПУСТИЙ рядок');
  }
  const a = await fetchThen(myTextContent);
  return a
}


// Processing the request
async function fetchThen(value) {
  try {
    const resp = await fetchImage(value);
    const myArr = resp.data.hits;
    const objLength = resp.data.totalHits;

    if (myArr.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMore.hidden = true

      return;
    } else if (objLength > 0) {
      Notiflix.Notify.info(`Hooray! We found ${objLength} images.`);
    }

    createMarkup(myArr, wraperGalery);
    lightbox.refresh();
    loadMore.hidden = false
  } catch (error) {
    console.log(error);
  }
}

// function click addIMG
async function addImage() {
  const value2 = myInput.value;
  let limitAdd;
  myPage += 1;
  try {
    const resp = await fetchImage(value2, myPage, limitAdd);
    createMarkup(resp.data.hits, wraperGalery);
    onPageScrolling();
    lightbox.refresh();

    if (resp.data.hits.length < limitAdd) {
      loadMore.hidden = true;
    }
  } catch (error) {
    console.log(error);
  }
}

// function scrole
function onPageScrolling() {
  const { height: cardHeight } =
    wraperGalery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
