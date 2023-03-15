// розмітка початкова
export function createMarkup(arr, wraper) {
  const markap = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
	  <a class="link" href="${largeImageURL}"><img class ="gallary-image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
	  <div class="info">
		<p class="info-item">
		  <b>Likes ${likes}</b>
		</p>
		<p class="info-item">
		  <b>Views ${views}</b>
		</p>
		<p class="info-item">
		  <b>Comments ${comments}</b>
		</p>
		<p class="info-item">
		  <b>Downloads ${downloads}</b>
		</p>
	  </div>
	</div>`
    )
    .join('');
  // закидаєм розмітку
  wraper.insertAdjacentHTML('beforeend', markap);
}
