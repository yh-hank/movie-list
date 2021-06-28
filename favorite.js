const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const movies = JSON.parse(localStorage.getItem('favoriteMovies'))


const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

function renderMovieList(data) {
  let rawHTML = ''
  data.forEach((item) => {

    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <img src="${POSTER_URL + item.image
      }" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${item.id
      }">More</button>
          <button class="btn btn-danger btn-add-delete" data-id="${item.id
      }">x</button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
}

function showMovieModal(id) {

  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')


  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results

    modalTitle.innerText = data.title
    modalDate.innerText = 'Release date: ' + data.release_date
    modalDescription.innerText = data.description
    modalImage.innerHTML = `<img src="${POSTER_URL + data.image
      }" alt="movie-poster" class="img-fluid">`
  })
}
// 刪除
function removeFormFavorite(id) {
  console.log(id)
  // .find():回傳找到的元素;.findIndex()回傳元素的索引值
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  // 使用陣列的 splice 方法來移除該項目 .splice(從哪移除,移除個數)
  movies.splice(movieIndex, 1)
  
  localStorage.setItem('favoriteMovies', JSON.stringify(movies))
  renderMovieList(movies)
}

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
    // .dataset回傳是字串，所以用Number()轉為數值讀取id值
  } else if (event.target.matches('.btn-add-delete')) {
    removeFormFavorite((Number(event.target.dataset.id)))
  }
})

// 呼叫存入的電影清單
renderMovieList(movies)