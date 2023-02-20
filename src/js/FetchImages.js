import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33772053-27567f6e35609c7f2c2f0645c';

export default class FetchImages {
  constructor() {
    this.querySearch = '';
    this.page = 1;
    this.perPage = 40;
    this.totalHits = null;
    this.totalPage = this.getPerPageValue();
  }

  get query() {
    return this.querySearch;
  }

  set query(newQuery) {
    this.querySearch = newQuery;
  }

  updatePage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  getPageValue() {
    return this.page;
  }

  getPerPageValue() {
    return this.perPage;
  }

  setPerPageValue(newValue) {
    this.perPage = newValue;
  }

  getTotalPage() {
    return this.totalPage;
  }

  updateTotalPage() {
    this.totalPage += this.perPage;
  }

  async getImage() {
    const params = new URLSearchParams({
      key: API_KEY,
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.getPageValue(),
      per_page: this.getPerPageValue(),
    });

    const { data } = await axios.get(`${BASE_URL}?${params}`);

    this.totalHits = data.totalHits;
    if (this.totalPage === 480) this.setPerPageValue(20);
    return data;
  }
}