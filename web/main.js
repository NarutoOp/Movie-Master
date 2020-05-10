async function final () {
		var data = document.getElementById("data").value
  		let movie = await eel.dummy(data)();
  		// document.getElementById("qr").src = getanswer(movie[1]);
  		getanswer(movie[0],"qr");
  		getanswer(movie[1],"p");
  		getanswer(movie[2],"q");
  		getanswer(movie[3],"r");
  		getanswer(movie[4],"s");
  		
}

var data;
function getanswer(q,pos){
	$.get("https://www.omdbapi.com/?s="+q+"&apikey=ba1f4581", function(rawdata){
		var rawstring =JSON.stringify(rawdata);
		data =JSON.parse(rawstring);
		var title = data.Search[0].Title;
		var year = data.Search[0].Year; 
		var imdburl="https://www.imdb.com/title/"+data.Search[0].imdbID+"/";

		var posterurl =data.Search[0].Poster;
		document.getElementById(pos).src = posterurl;

		
});
	
}








