// Dentro de renderMovies, el bloque li.innerHTML debe ser solo este:
li.innerHTML = `
  <div>
    <strong>${m.title}</strong>
    <span class="badge">${m.year}</span>
  </div>
  <div class="actions">
    <button class="small edt" data-action="edit">Editar</button>
  </div>
`;