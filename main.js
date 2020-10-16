// $(".search-button").on("click", function () {
//   $.ajax({
//     url:
//       "http://www.omdbapi.com/?apikey=8cff34ad&s=" + $(".input-keyword").val(),
//     success: (result) => {
//       const movies = result.Search;
//       let cards = "";
//       movies.forEach((m) => {
//         cards += showMovie(m);
//       });

//       $(".movie-container").html(cards);

//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url:
//             "http://www.omdbapi.com/?apikey=8cff34ad&i=" +
//             $(this).data("imdbid"),
//           success: (m) => {
//             const movieDetail = modalBoxMovie(m);
//             $(".modal-body").html(movieDetail);
//           },
//           error: (e) => {
//             console.log("data detail tidak terambil" + e);
//           },
//         });
//         // console.log($(this).data("imdbid"));
//       });

//       // ketike tombol di klik
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

  const searchButton = document.querySelector('.search-button')
  searchButton.addEventListener('click', function() {
    searchMovie()
  })

  const node = document.querySelector('.search-key');
    node.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        searchMovie()
      }
    });

  function searchMovie() {
    const inputKeyVal = document.querySelector('.input-keyword')
    // console.log(inputKeyVal)
    fetch('http://www.omdbapi.com/?apikey=8cff34ad&s=' + inputKeyVal.value)
    .then(responsive => responsive.json())
    .then(data =>  {
      const movies = data.Search;
      let cards = '';
      movies.forEach(m => cards += showMovie(m));
      // console.table(movies)
      const movieContainer = document.querySelector('.movie-container');
      movieContainer.innerHTML = cards;

      // ketika tombol di click 
      const modalDetailButton = document.querySelectorAll('.modal-detail-button');
      modalDetailButton.forEach( btn => {
        btn.addEventListener('click', function() {
          const valImbdId = this.dataset.imdbid
          // console.log(valImbdId)
          fetch('http://www.omdbapi.com/?apikey=8cff34ad&i=' + valImbdId)
          .then( response => response.json())
          .then(m => {
            const movieDetail = modalBoxMovie(m);
            const modalBody = document.querySelector('.modal-body')
            modalBody.innerHTML = movieDetail;
            console.log(modalBody)
          })
        })
      })
    })
  }

function modalBoxMovie(m) {
  return `<div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <img src="${m.Poster}" alt="" class="img-fluid" />
    </div>
    <div class="col-md">
      <ul class="list-group">
        <li class="list-group-item">
        <h4>${m.Title} (${m.Year})</h4>
        </li>
        <li class="list-group-item"><strong>Director : ${m.Director}</strong</li>
        <li class="list-group-item"><strong>Artis : ${m.Actors}</strong></li>
        <li class="list-group-item"><strong>Writers : </strong>${m.Writer}</li>
        <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
      </ul>
    </div>
  </div>
</div>`;
}

function showMovie(m) {
  return `<div class="col-md-4 my-2">
  <div class="card">
    <img src="${m.Poster}" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">${m.Title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
      <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal"
      data-target="#exampleModal" data-imdbid="${m.imdbID}">Show Details</a>
    </div>
  </div>
</div>`;
}
