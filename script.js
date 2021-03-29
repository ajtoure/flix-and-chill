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
            app.makeArray(jsonResponse);
        })
}


app.makeArray = (finalResponse) => {
    //obtain array
    let results = finalResponse.hits;
    // push the first 20 results onto the empty array
    for (i = 0; i < 20; i++) {
        app.imgArray.push(results[i]);
    }
    // we return the new array
    //app.imgArray;
    // *******FUNCTION -> will select a random index number to extract a random result from out array
    //Here we will pick a random index number
    app.randomPics(app.imgArray);

}


// function to obtain random img, it will iterate through the query result array
/*app.randomPic = (dataResponse) => {
    // push the first 20 results onto the empty array
    for (i = 0; i < 20; i++) {
        app.imgArray.push(dataResponse.hits[i]);
    }
    return app.imgArray;
    // *******FUNCTION -> will select a random index number to extract a random result from out array
    //Here we will pick a random index number
}*/



// here will be our function to display the img
app.showPics = (array) => {
    // querying the doc and find the first div
    const divOne = document.getElementsByClassName('localOne');
    // query to find the second div
    const divTwo = document.getElementsByClassName('localTwo');

    //use the math method to obtain random index

    //for EACH object in the API we will:
    //const imgElement = document.createElement('img');
    //append the new child img element to the parent div
    //imgElement.src = picSelect.imageURL;
    //console.log(imgElement);
    console.log(imgSelection[i]);
}


//function to obtain random image

app.randomPics = (array) => {
    let randomNum = Math.floor(Math.random() * 20);;
    console.log(array[randomNum]);
}





//creating an init method
//first the function that gets pics
//then the function that queries the images with the user location input
//then the function that selects a random one out of the results
//then a function to insert that result into the img element


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
    const movieSubmit = document.getElementById('moviebtn');
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

//header animation effect

// const slide = document.querySelector('html');
// const slideBtn = document.getElementById('startBtn');

// slideBtn.addEventListener('click', function (e){

// })