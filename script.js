const app = {};
// movie api keys
app.apiKey = "3e2bae0bdf207133adb310d92315a2ec";
app.apiMovie ="https://api.themoviedb.org/3/movie/popular"

// gets the movies to display based on a popular list
app.getMovie = () =>{
    for( let i = 1 ; i <= 20; i++){
        const movieUrl = new URL(app.apiMovie);
        movieUrl.search = new URLSearchParams({
            api_key: app.apiKey,
            page : i
        })
        fetch(movieUrl)
        .then((x) =>{
            return x.json();
        })
        .then( (list0fMovies) =>{
            app.displayMovies(list0fMovies.results);
        })
    }
}

//Get the data of the movie and populates options dropdown
app.displayMovies = (movieData) =>{
    const select = document.querySelector('select');
    for(let i = 0; i <= 19; i ++){
        const optionElement = document.createElement("option");
        optionElement.value = movieData[i].poster_path;
        optionElement.innerHTML = movieData[i].original_title;
        select.appendChild(optionElement);
    }
}

//Adds poster image to img tag to display posters
app.submitting = () => {
    const movieSubmit = document.querySelector('button');
    //event listener on submit button
    movieSubmit.addEventListener('click', function(event){
        //dynamically change html page by adding to img tag to display poster
        const selected = document.getElementById("movieList");
        const inputValue = selected.value;
        const ul = document.querySelector('ul');
        const imgElement = document.getElementById("poster")
        imgElement.src = `https://image.tmdb.org/t/p/w400/${inputValue}`;
        ul.appendChild(imgElement);
      });
}



// initializing fetch api to get data
app.init = () => {
    app.getMovie();
    app.submitting();
}

app.init();

