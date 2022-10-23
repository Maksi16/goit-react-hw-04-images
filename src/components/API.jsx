import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '28415242-e0e8b03e245983e2ec7e6c358';

export const addImages = async (value, page, hitsPerPage) => {
  const response = await axios.get(
    `?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${hitsPerPage}`
  );
  return response.data;
};
