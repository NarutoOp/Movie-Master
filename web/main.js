// function generateQRCode() {
// 	var data = document.getElementById("data").value
// 	eel.generate_qr(data)(setImage)
// 	// eel.dummy("this is eel")(function(ret){console.log(ret)})
// }

// function setImage(base64) {
// 	document.getElementById("qr").src = base64
// }


function recommend() {
	var data = document.getElementById("data").value
	// eel.generate_qr(data)(setImage)
	eel.dummy(data)(getanswer)

}

var data;
function getanswer(q){
	$.get("https://www.omdbapi.com/?s="+q+"&apikey=ba1f4581", function(rawdata){
		var rawstring =JSON.stringify(rawdata);
		data =JSON.parse(rawstring);
		var title = data.Search[0].Title;
		var year = data.Search[0].Year; 
		var imdburl="https://www.imdb.com/title/"+data.Search[0].imdbID+"/";

		var posterurl =data.Search[0].Poster;
		// document.getElementById('qr').innerHTML="<br> <img src= '"+posterurl+"'>";
		document.getElementById("qr").src = posterurl;
		document.getElementById("p").src = posterurl;
		document.getElementById("q").src = posterurl;
		document.getElementById("r").src = posterurl;
		document.getElementById("s").src = posterurl;
});
}








