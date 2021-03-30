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
    //Here we will pick a random index number using the randomizer function declared below
    app.randomPics(app.imgArray);
}

//function to obtain random image
app.randomPics = (array) => {
    let randomNum1 = Math.floor(Math.random() * 20);
    app.randomImg1 = array[randomNum1];

    let randomNum2 = Math.floor(Math.random() * 20);
    app.randomImg2 = array[randomNum2];

    app.showPics(app.randomImg1, app.randomImg2);
}



// here will be our function to display the img
app.showPics = (imgObject1, imgObject2) => {
    // querying the doc and find the first div
    const divOne = document.querySelector('#localOne');
    divOne.innerHTML = '';
    // query to find the second div 
    const divTwo = document.querySelector('#localTwo');
    divTwo.innerHTML = '';


    //here we create the first img element
    const image1 = document.createElement('img');
    image1.src = imgObject1.webformatURL;

    const image2 = document.createElement('img');
    image2.src = imgObject2.webformatURL;
    //append the new child img element to the parent div
    divOne.appendChild(image1);
    divTwo.appendChild(image2);
    //imgElement.src = picSelect.imageURL;
    //console.log(imgElement);
    console.log(divOne);
    console.log(divTwo);
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
    let counter = 0;
    movieData.forEach((movieObject) => {
        if (counter <= 19) {
            const optionElement = document.createElement("option");
            optionElement.value = movieData[counter].poster_path;
            optionElement.innerHTML = movieData[counter].original_title;
            select.appendChild(optionElement);
        }
        counter += 1;
    })
}

//Adds poster image to img tag to display posters
app.submitting = () => {
    const movieSubmit = document.getElementById('moviebtn');
    //event listener on submit button
    movieSubmit.addEventListener('click', function(event) {
        //dynamically change html page by adding to img tag to display poster
        const selected = document.getElementById("movieList");
        const inputValue = selected.value;
        const imgElement = document.getElementById("poster")
        imgElement.src = `https://image.tmdb.org/t/p/w400/${inputValue}`;
    });
}

app.showFinal = () => {
    const movieSubmit = document.getElementById('finalBtn');
    const final = document.getElementById("final");
    movieSubmit.addEventListener('click', function(event) {
        final.style.display ="block";
    });
}


// initializing fetch api to get data
app.init = () => {
    app.getMovie();
    app.submitting();
    app.getPics();
    app.showFinal();
}

app.init();

