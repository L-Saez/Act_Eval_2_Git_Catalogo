const titleInput = document.getElementById("titleInput");
const yearInput = document.getElementById("yearInput");
const addBtn = document.getElementById("addBtn");
const movieList = document.getElementById("movieList");

let movies = [];
let nextId = 1;

function renderMovies() {
  movieList.innerHTML = "";
  for (const m of movies) {
    const li = document.createElement("li");
    li.className = "item";
    li.dataset.id = String(m.id);
    
    li.innerHTML = `
      <div>
        <strong>${m.title}</strong>
        <span class="badge">${m.year}</span>
      </div>
      <div class="actions">
        <button class="small edt" data-action="edit">Editar</button>
        <button class="small del" data-action="delete">Eliminar</button>
      </div>
    `;
    movieList.appendChild(li);
  }
}

function addMovie() {
  const title = titleInput.value.trim();
  const year = Number(yearInput.value);
  if (!title || !year) {
    alert("Introduce título y año.");
    return;
  }
  movies.push({ id: nextId++, title, year });
  titleInput.value = "";
  yearInput.value = "";
  renderMovies();
}

function deleteMovieById(id) {
  movies = movies.filter(m => m.id !== id);
  renderMovies();
}

function editMovieById(id) {
  const movie = movies.find(m => m.id === id);
  if (!movie) return;

  const newTitle = prompt("Nuevo título:", movie.title);
  if (newTitle === null) return;

  const newYearStr = prompt("Nuevo año:", String(movie.year));
  if (newYearStr === null) return;

  const newYear = Number(newYearStr);

  if (!newTitle.trim() || !newYear) {
    alert("Datos no válidos.");
    return;
  }

  movie.title = newTitle.trim();
  movie.year = newYear;
  renderMovies();
}

addBtn.addEventListener("click", addMovie);

movieList.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const li = e.target.closest("li.item");
  if (!li) return;

  const id = Number(li.dataset.id);

  if (btn.dataset.action === "delete") {
    deleteMovieById(id);
  } else if (btn.dataset.action === "edit") {
    editMovieById(id);
  }
});