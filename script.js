const app = {};
// movie api 
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
            // app.displayMovies(list0fMovies)
            app.displayMovies(list0fMovies);
        })
    }
}

app.displayMovies = (datas) =>{
    const select = document.querySelector('select');
    for(let i = 0; i <= 19; i ++){
        const optionElement = document.createElement("option");
        optionElement.value = datas.results[i].id;
        optionElement.innerHTML = datas.results[i].original_title;
        select.appendChild(optionElement);
    }
}



app.init = () => {
    // app.getGenres();
    app.getMovie();
}

app.init();

