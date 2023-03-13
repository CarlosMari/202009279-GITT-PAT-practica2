const bookISBNs = ["9780198788607", "9781250318541", "9780765382030","9798987722602","9780545791434"];
const projectsContainer = document.querySelector('.proyectos');

bookISBNs.forEach((isbn, index) => {
  fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`, { method: 'GET' })
  .then(res =>{
      if(res.ok) {
          return res.json();
      } else {
          throw res;
      }
  })
  .then(book => {
    const project = document.createElement('div');
    project.classList.add('sampleproject');
    project.id = `sampleproject${index + 1}`;

    const content = document.createElement('div');
    content.classList.add('content');
    project.appendChild(content);

    const coverImage = document.createElement('img');
    coverImage.classList.add('projectimage');
    coverImage.alt = 'coverImage';
    coverImage.src = book[`ISBN:${isbn}`].cover.medium;
    content.appendChild(coverImage);

    const samplecontent = document.createElement('div');
    samplecontent.classList.add('samplecontent');
    project.appendChild(samplecontent);

    const genre = document.createElement('span');
    genre.innerText = book[`ISBN:${isbn}`].subjects[0].name;
    samplecontent.appendChild(genre);

    const title = document.createElement('h2');
    title.innerText = book[`ISBN:${isbn}`].title;
    samplecontent.appendChild(title);

    const author = document.createElement('p');
    author.innerText = book[`ISBN:${isbn}`].authors[0].name;
    samplecontent.appendChild(author);

    projectsContainer.appendChild(project);
  })
  .catch(err => {
    console.log(err);
  });
});
