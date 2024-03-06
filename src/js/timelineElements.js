var timelineElements = [
  {id: 1, title: "Mission Impossible", date: "2020", type: "movie"},
  {id: 2, title: "Harry Potter", date: "2001", type: "book"},
  {id: 3, title: "Happy Birthday", date: "1980", type: "book"},
  {id: 4, title: "Parasite", date: "2020", type: "movie"},
  {id: 5, title: "The Little Prince", date: "2007", type: "book"},
  {id: 6, title: "Uptown Girl", date: "1995", type: "song"}
]

if (localStorage.getItem('book')) {
  var book_data = JSON.parse(localStorage.getItem('book'));
} else {
  var book_data = [];
}

if (localStorage.getItem('movie')) {
  var movie_data = JSON.parse(localStorage.getItem('movie'));
} else { 
  var movie_data = [];
} 

if (localStorage.getItem('song')) {
  var song_data = JSON.parse(localStorage.getItem('song'));
} else {
  var song_data = [];
}

if (book_data.length != 0 || movie_data.length != 0 || song_data.length != 0) {
  const data = book_data.concat(movie_data).concat(song_data);
  var timelineElements = data;
}


export default timelineElements