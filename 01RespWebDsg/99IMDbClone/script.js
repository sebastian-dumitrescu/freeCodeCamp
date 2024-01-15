document.getElementById('search-button').addEventListener('click', function(event) {
    event.preventDefault();
    performSearch();
});

document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        performSearch();
    }
});

function performSearch() {
    const searchTerm = document.getElementById('search-input').value;
    searchOMDbAPI(searchTerm);
}

function searchOMDbAPI(searchTerm) {
    const url = 'https://www.omdbapi.com/?apikey=93f8f36b&s=' + encodeURIComponent(searchTerm);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => displayResults(data))
        .catch(error => console.error('Fetch error:', error));
}

function displayResults(data) {
    console.log(data);
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    if (data.Response === "True") {
        data.Search.forEach(movie => {
            const movieElement = document.createElement('div');

            createInnerHTMLMovieCard(movieElement, movie)
            
            resultsContainer.appendChild(movieElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found</p>';
    }
}

function createInnerHTMLMovieCard(movieElement, movie) {

    var innerHTMLText = `<h3>${movie.Title}</h3><h2>${movie.Year}</h2>`;

    if (movie.Poster != 'N/A') {
        innerHTMLText = innerHTMLText + `<img src="${movie.Poster}"></img>`;
    }

    movieElement.innerHTML = innerHTMLText;
}


