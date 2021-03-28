//creating the app namespace
const app = {};

//creating the url and key variables and namespacing them to the app object
app.imgApiUrl = "https://pixabay.com/api/";
app.imgApiKey = "20890385-997b58abe422f53e03d97cdbf";

//where we will store the img array response
app.imgArray = [];
app.selectedPic = {};

//create a method to get the dataset from the api
app.getPics = () => {
    //here we use the URL constructor to use our URL and set our search parameters to include in our endpoint
    const url = new URL(app.imgApiUrl);
    url.search = new URLSearchParams({
        //passing in the api key
        key: app.imgApiKey,
        //test query
        q: "toronto",
        //only one page of results
        page: 1
    })
    fetch(url)
        .then((response) => {
            //parse this response in JSON
            //return JSON response so that it can be used in the next function
            return response.json();
        })
        //wait for the JSOn response and log out readable data in json format
        .then((jsonResponse) => {
            //finally we use our built showPics method and pass it our readable json data as an parameter
            return jsonResponse;
        })
        .then((finalResponse) => {
            app.randomPic(finalResponse);
        })

}






// here will be our function to display the img
app.showPics = (picData) => {
    // querying the doc and find the first div
    const divOne = document.getElementsByClassName('localOne');
    // query to find the second div
    const divTwo = document.getElementsByClassName('localTwo');
    //for EACH object in the API we will:
    //const imgElement = document.createElement('img');
    //append the new child img element to the parent div
    //imgElement.src = picSelect.imageURL;
    //console.log(imgElement);
}




// function to obtain random img, it will iterate through the query result array
app.randomPic = (dataResponse) => {
    //obtain total amount of hits
    let totalHits = dataResponse.total;
    //obtain array
    let results = dataResponse.hits;
    for (i = 0; i < 20; i++) {
        app.imgArray.push(dataResponse.hits[i]);
    }
    //as long as the array container has fewer items than the total amount of hits...
    /*while (app.imgArray.length < totalHits) {
        // we will pick a random index number within the limits of how many hits we received
        let i = Math.floor(Math.random() * totalHits);
        // we will push these results to the array until we have ten items
        if (app.imgArray < 10) {
            // here we are, pushing the results onto the globally declared array variable
            app.imgArray.push = results[i];
        }
        // we return the new array
        return app.imgArray;
    }*/

    console.log(app.imgArray);
}




//creating an init method
//dateApp.init = () => {
//first the function that gets pics
//dateApp.getPics();
//then the function that queries the images with the user location input
//then the function that selects a random one out of the results
//then a function to insert that result into the img element
//dateApp.resultTotal = dateApp.getPics.data[0].total;
//console.log(dateApp.resultTotal);
//}
/////////////////////////////////////////////////
////// ALL THE MOVIE CODE WILL GO HERE //////////
/////////////////////////////////////////////////



// movie api keys
app.apiKey = "3e2bae0bdf207133adb310d92315a2ec";
app.apiMovie = "https://api.themoviedb.org/3/movie/popular"

// gets the movies to display based on a popular list
app.getMovie = () => {
    for (let i = 1; i <= 20; i++) {
        const movieUrl = new URL(app.apiMovie);
        movieUrl.search = new URLSearchParams({
            api_key: app.apiKey,
            page: i
        })
        fetch(movieUrl)
            .then((x) => {
                return x.json();
            })
            .then((list0fMovies) => {
                app.displayMovies(list0fMovies.results);
            })
    }
}

//Get the data of the movie and populates options dropdown
app.displayMovies = (movieData) => {
    const select = document.querySelector('select');
    for (let i = 0; i <= 19; i++) {
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
    movieSubmit.addEventListener('click', function(event) {
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
    app.getPics();
}

app.init();