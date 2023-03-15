import './css/style.css';
import Notiflix from 'notiflix';
// myFunction FATCH
import { fetchImage } from "./fetshForm";
import { createMarkup } from "./createMarcup";
// Описаний в документації
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// start libery AXIOS
const axios = require('axios').default;

const refs = {
	form: document.querySelector('.search-form'),
	myInput: document.querySelector('.search-input'),
	myButton: document.querySelector('.search-buttot'),
	wraperGalery: document.querySelector('.gallery'),
	photoCard: document.querySelector('.photo-card'),
	wraperInfo: document.querySelector('.info'),
	infoItem: document.querySelector('.info-item'),
	loadMore: document.querySelector('.loadMore'),
}
// console.log(refs);
const { form, myInput, myButton, wraperGalery, photoCard, wraperInfo, infoItem, loadMore } = refs

let myPage = 1
//listening form

form.addEventListener("submit", onSubmit);
loadMore.addEventListener("click", addImage); 


const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 }); 

function onSubmit(event) {
	event.preventDefault();
	wraperGalery.innerHTML = '';
	myPage = 1
	const {
		elements: { searchQuery, }
	} = event.currentTarget;
	const myTextContent = searchQuery.value.trim()
	if (!myTextContent) {
		return console.log("ПУСТИЙ рядок");
	}
	fetchThen(myTextContent)	
	
}

  // обробка запиту
  async function fetchThen(value) {
	try {
	  const resp = await fetchImage(value);
	  const myArr = resp.data.hits;
	  const objLength = resp.data.totalHits;
	  
	  if (myArr.length === 0) {
		  Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
		  loadMore.hidden = true;
		  loadMore.classList.remove('styleLoadMore')
		return;
	  } else if (objLength > 0) {
		Notiflix.Notify.info(`Hooray! We found ${objLength} images.`);
	  }
	  
	  createMarkup(myArr, wraperGalery);
	  lightbox.refresh();
	  loadMore.hidden = false;
	  loadMore.classList.add('styleLoadMore')
	} catch (error) {
	  console.log(error);
	}
  }
  

  async function addImage() {
	const value2 = myInput.value
	let limitAdd 
	myPage+=1
	try {
		const resp = await fetchImage(value2, myPage, limitAdd)
			createMarkup(resp.data.hits, wraperGalery)
			onPageScrolling()
			lightbox.refresh()
	
			if (resp.data.hits.length < limitAdd) {
				loadMore.hidden = true
			}
	} catch (error) {
		console.log(error);	
	}
	}
  

  function onPageScrolling() {
	const { height: cardHeight } =
	wraperGalery.firstElementChild.getBoundingClientRect();
	window.scrollBy({
	  top: cardHeight * 2,
	  behavior: 'smooth',
	});
  }


