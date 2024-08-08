console.log("linked");

const myHeaders = new Headers();
myHeaders.append(
  "x-apihub-key",
  "bhRWYOZ7nAwdQqTBNzOAmyWjeGaSyOgfRC7f2VWiOJxH3ZGJKi"
);
myHeaders.append("x-apihub-host", "Movies-Verse.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "4f700f4a-4bd2-4604-8d5b-7b5e4c976c65");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

function fetchMovies() {
  fetch(
    "https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/upcoming-movies",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => DisplayMovies(result))
    .catch((error) => console.error(error));
}

const dataToDisplay = []; //List of movie info to display

function DisplayMovies(data) {
  const info = data; //all info retrived from API

  console.log(data);
  
  //movie object retrived from info
  const movies = JSON.parse(info)["movies"];
  // Loop through each movie
  for (let i = 0; i < Math.min(1, movies.length); i++) {
    const movie = movies[i]; // retrived details for a movie

    // loop through details for this movie ^
    for (let i = 0; i < Math.min(2, movie["list"].length); i++) {
      const list = movie["list"][i];
      console.log(list);

      // Create object storing movie details like title and stuff
      const movieDetails = {
        posterSrc: list["image"],
        title: list["title"],
        staring: list["staring"],
        categories: list["categories"],
        date: movie["date"],
        link: list["link"],
      };

      dataToDisplay.push(movieDetails);
     
    }
  }
  console.log(dataToDisplay);

  // Formatting movie info for display
  const listItem = document.getElementById("movie-poster");
  dataToDisplay.forEach((i) => {
    const poster = document.createElement("img");
    poster.src = i.posterSrc;
    poster.width = 300;
    const title = document.createElement("h1");
    title.textContent = i.title;
    const staring = document.createElement("label");
    staring.textContent = "Staring: " + i.staring;
    const categories = document.createElement("label");
    categories.textContent = "Categories: " + i.categories;
    const date = document.createElement("label");
    date.textContent = "Date: " + i.date;
    const link = document.createElement("label");
    date.textContent = "Link: " + i.link;

    //Styling
    listItem.appendChild(title);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(poster);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(staring);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(categories);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(date);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(link);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(document.createElement("br"));
  });
}

fetchMovies(); //Calls the fetchMovie function to retrive info and display data 

