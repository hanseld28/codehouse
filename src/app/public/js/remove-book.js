let booksTable = document.querySelector('#booksTable');

booksTable.addEventListener('click', (event) => {

    let clickedElement = event.target;
    const method = clickedElement.dataset.method;

    if (method === 'DELETE') {
        
        let bookId = clickedElement.dataset.id;
        let url = `http://localhost:3000/books/${bookId}`;

        fetch(url, { method })
            .then(response => {

                let tr = clickedElement.closest(`#book_${bookId}`);
                tr.remove();
            })
            .catch(error => console.error(error));
    }
})