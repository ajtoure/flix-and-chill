const app = {};

app.imgApiUrl = "https://pixabay.com/api/";
app.imgApiKey = "20890385-997b58abe422f53e03d97cdbf";
app.apiKey = "3e2bae0bdf207133adb310d92315a2ec";
app.apiMovie = "https://api.themoviedb.org/3/movie/popular"

app.responseArray1 = [];
app.responseArray2 = [];

// gets the data of picture according to user option selected
app.getPicOne = (query) => {
    const url = new URL(app.imgApiUrl);
    url.search = new URLSearchParams({
        key: app.imgApiKey,
        q: query,
        category: "places",
        order: "popular",
        page: 1
    })
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            app.responseArray1 = jsonResponse;
            app.makeArrayOne(jsonResponse);
        })
}
// gets the data of picture according to user option selected
app.getPicTwo = (query) => {
    const url = new URL(app.imgApiUrl);
    url.search = new URLSearchParams({
        key: app.imgApiKey,
        q: query,
        page: 1
    })
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            app.responseArray2 = jsonResponse;
            app.makeArrayTwo(jsonResponse);
        })
}
// gets option selected data into api 
app.submitImgOne = () => {
    document.querySelector(`#cities1`).addEventListener('change', function() {
        app.showLocationOne(this.value);
        app.getPicOne(this.value);
    });
}
// gets option selected data into api 
app.submitImgTwo = () => {
    document.querySelector(`#cities2`).addEventListener('change', function() {
        app.showLocationTwo(this.value);
        app.getPicTwo(this.value);
    });
}
// shows location of selected option at the bottom of the screen 
app.showLocationOne = (locationValue) => {
    const locationOne = document.querySelector('#leftLocation');
    locationOne.innerHTML = `${locationValue}`
}
// shows location of selected option at the bottom of the screen 
app.showLocationTwo = (locationValueTwo) => {
    const locationTwo = document.querySelector('#rightLocation');
    locationTwo.innerHTML = `${locationValueTwo}`
}

// adds images onto add img div from api data
app.makeArrayOne = (returnedArrayOne) => {
    const randomPic = Math.floor(Math.random() * 5);
    const divOne = document.querySelector('#localOne');
    divOne.innerHTML = '';
    const image1 = document.createElement('img');
    image1.src = returnedArrayOne.hits[randomPic].largeImageURL;
    divOne.appendChild(image1);
}
// adds images onto add img div from api data
app.makeArrayTwo = (returnedArrayTwo) => {
    const randomPic = Math.floor(Math.random() * 5);
    const divTwo = document.querySelector('#localTwo');
    divTwo.innerHTML = '';
    const image2 = document.createElement('img');
    image2.src = returnedArrayTwo.hits[randomPic].largeImageURL;
    divTwo.appendChild(image2);
}


//displays image into img tag
app.showPic2 = (imgObjectTwo) => {
    const divTwo = document.querySelector('#localTwo');
    divTwo.innerHTML = '';

    const image2 = document.createElement('img');
    image2.src = imgObjectTwo.webformatURL;
    divTwo.appendChild(image2);
}
// calls the method for looking into the picture generator api
app.getFirstImg = () => {
    app.getPicOne(app.query1);
    app.getPicTwo(app.query1);
}

// looks through api for the top 200 list of movies 
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
// populates the select option with movie titles
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


// shows images of movie base on options selected to img in the main div
app.showFinal = () => {
    const movieSubmit = document.getElementById('finalBtn');
    const final = document.getElementById("final");
    const initial = document.getElementById("initial");
    movieSubmit.addEventListener('click', function(event) {
        const selected = document.getElementById("movieList");
        const inputValue = selected.value;
        const imgElement = document.getElementById("poster")
        imgElement.src = `https://image.tmdb.org/t/p/w400/${inputValue}`;
        final.style.display = "block";
        final.style.animation = "showup 3.6s ease-in-out forwards";
        initial.style.display = "none";
        movieSubmit.style.display = 'none'
        const personLeft = document.getElementById("personLeft");
        const personRight = document.getElementById("personRight");
        const pink = document.getElementById("pink");
        const blue = document.getElementById("blue");
        blue.style.animation = "slidingChair  3.6s ease-in-out forwards";
        pink.style.animation = "slidingChair  3.6s ease-in-out forwards";
        personLeft.style.animation = "slidingPerson  3.6s ease-in-out forwards";
        personRight.style.animation = "slidingPersonRight  3.6s ease-in-out forwards";
    });
}

//calls methods for code
app.init = () => {
    app.getMovie();
    app.getFirstImg();
    app.showFinal();
    app.submitImgOne();
    app.submitImgTwo();
}

// initialize code
app.init();