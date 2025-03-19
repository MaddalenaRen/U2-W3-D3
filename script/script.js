

const getBooks = function () {
    const libraryUrl = "https://striveschool-api.herokuapp.com/books";
    fetch(libraryUrl)
        .then((response) => {
            if (response.ok) {
                console.log('perfetto!', response);
                return response.json()
            } else {
                throw new Error('Il server non ha risposto correttamente')
            }
        })
        .then((data) => {
            console.log('DATA', data)
            const row = document.getElementById("book-container");
            row.classList.add("d-flex", "flex-wrap")
            data.forEach((book) => {
                const col = document.createElement("div");
                col.classList.add("col-md-4", "col-lg-3", "mb-4", "d-flex");

                col.innerHTML = `
                    <div class="card card d-flex flex-column flex-fill">
                        <img src="${book.img}" class="card-img-top" alt="${book.title}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">Prezzo: €${book.price.toFixed(2)}</p> 
                             <div class="mt-auto">
                            <button class="btn btn-danger remove-btn  w-100">Scarta</button>
                             <button class="btn btn-primary add-to-cart w-100 mt-2">Compra ora</button>
                        </div>
                    </div>
                `;
                row.appendChild(col);

                const removeBtn = col.querySelector(".remove-btn");
                removeBtn.addEventListener("click", () => {
                    col.remove();
                });
                const addToCart = col.querySelector(".add-to-cart")

                addToCart.addEventListener("click", function (event) {
                    event.preventDefault();

                    let carrell = localStorage.getItem("carrell");
                    if (carrell === undefined || carrell === null) {
                        carrell = []
                    }
                    else {
                        carrell = JSON.parse(carrell);
                    }

                    carrell.push(book.title);

                    localStorage.setItem("carrell", JSON.stringify(carrell));
                    let lista = document.getElementById("lista")
                    const newLi = document.createElement('li')
                    newLi.classList.add('list-group-item')
                    newLi.innerText = book.title + " " + book.price.toFixed(2) + "€"
                    lista.appendChild(newLi)

                    console.log(carrell);
                })



            });





        })
        .catch((err) => {
            console.log('Errore', err);
        });
}

getBooks();