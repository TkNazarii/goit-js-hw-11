const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34365657-ad7721298800c8b8bb259833a';

export async function fetchImage(name, page = 1, limit = 20) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation =horizontal&safesearch =true&page=${page}&per_page=${limit}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

// export function fetchImage(name, page = 1, limit = 20) {

// 	return fetch(`${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation =horizontal&safesearch =true&page=${page}&per_page=${limit}`)
// 	  .then((response) => {
// 		// console.log(response)
// 		  if (!response.ok) {
// 			 throw new Error(response.statusText)
// 			}
// 		return response.json();
// 	  })
// }
