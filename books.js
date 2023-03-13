
async function fetchBookInfo(bookCode) {
    const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${bookCode}&jscmd=data&format=json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  
  async function displayBookInfo(bookCode) {
    try {
      const bookData = await fetchBookInfo(bookCode);
      const bookInfo = bookData[`ISBN:${bookCode}`];
      const proyectosDiv = document.querySelector(".proyectos");
  
      const div = document.createElement("div");
      div.classList.add("sampleproject");
      div.setAttribute("id", `sampleproject${bookCode}`);
  
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("content");
      const img = document.createElement("img");
      img.classList.add("projectimage");
      img.setAttribute("alt", "coverImage");
      img.setAttribute("src", bookInfo.cover.large || "https://picsum.photos/200");
      contentDiv.appendChild(img);
      div.appendChild(contentDiv);
  
      const sampleContentDiv = document.createElement("div");
      sampleContentDiv.classList.add("samplecontent");
      const span = document.createElement("span");
      span.textContent = bookInfo.subjects[0].name || "N/A";
      sampleContentDiv.appendChild(span);
      const h2 = document.createElement("h2");
      h2.textContent = bookInfo.title;
      sampleContentDiv.appendChild(h2);
      const p = document.createElement("p");
      p.textContent = bookInfo.authors[0].name || "N/A";
      sampleContentDiv.appendChild(p);
      div.appendChild(sampleContentDiv);
  
      proyectosDiv.appendChild(div);
    } catch (error) {
      console.error(error);
    }
  }
  

  const bookISBNs = ["9780198788607", "9781250318541", "9780765382030","9798987722602","9780545791434"];
  bookISBNs.forEach((isbn, index) => {
  displayBookInfo(isbn)});