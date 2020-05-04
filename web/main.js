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
});
}








function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


var movies = ["Inception","Toy Story 3","Ricky Gervais Live 3: Fame","Winter's Bone","Scalphunters, The","Barking Dogs Never Bite (Flandersui gae)","Shrek Forever After (a.k.a. Shrek: The Final Chapter)","TiMER","Best Worst Movie","Twilight","Senna","Family Guy Presents: It's a Trap","Insidious","Hobo with a Shotgun","Win Win","Lola Versus","Master, The","Dredd","End of Watch","V/H/S","Perks of Being a Wallflower, The","Hunt, The (Jagten)","Holy Motors","Taken 2","House at the End of the Street","My Left Eye Sees Ghosts (Ngo joh aan gin diy gwai)","Love Lasts Three Years (L'amour dure trois ans)","Tall Man, The","LOL","Rust and Bone (De rouille et d'os)","Marley","Frankenweenie","Sinister","Thing: Terror Takes Shape, The","Hotel Transylvania","Side by Side","Take Aim at the Police Van (Sono gosôsha wo nerae: 'Jûsangô taihisen' yori)","Argo","Seven Psychopaths","Liberal Arts","Catch .44","[REC]³ 3 Génesis","Asterix & Obelix: God Save Britannia (Astérix et Obélix: Au service de Sa Majesté)","Paranormal Activity 4","Alex Cross","Cloud Atlas","'Hellboy': The Seeds of Creation","Silent Hill: Revelation 3D","Here Comes the Boom","Mental","Killing Them Softly","Imposter, The","Sessions, The (Surrogate, The)","Smashed","Wreck-It Ralph","Silver Linings Playbook","Flight","Anna Karenina","Life of Pi","Man with the Iron Fists, The","Bay, The","Himizu","Jackass 3.5","Indie Game: The Movie","Batman: The Dark Knight Returns, Part 1","Lincoln","Nature Calls","Vamps","Twilight Saga: Breaking Dawn - Part 2, The","10 Years","Red Dawn","Rise of the Guardians","Fantastic Fear of Everything, A","Deadfall","Byzantium","Paperman","Fearless Hyena, The (Xiao quan guai zhao)","Half a Loaf of Kung Fu (Dian zhi gong fu gan chian chan)","Hitchcock","From Up on Poppy Hill (Kokuriko-zaka kara)","Redline","Winners and Sinners (Qi mou miao ji: Wu fu xing)","My Lucky Stars (Fuk sing go jiu)","Money Money Money (L'aventure, c'est l'aventure)","Liar's Autobiography: The Untrue Story of Monty Python's Graham Chapman, A","Hobbit: An Unexpected Journey, The","Hyde Park on Hudson","How to Make Love to a Woman","Zero Dark Thirty","Fire with Fire","Warm Bodies","Wrong","Playing for Keeps","Guilt Trip, The","Jack Reacher","Django Unchained","This Is 40","I Bought a Vampire Motorcycle","Ice Cream Man","Impossible, The (Imposible, Lo)","Misérables, Les","Campfire Tales","Parental Guidance","John Dies at the End","Misérables, Les","Promised Land","English Vinglish","Fish Story (Fisshu sutôrî)","Texas Chainsaw 3D","Gangster Squad","Iceman, The","It's Such a Beautiful Day","Batman: The Dark Knight Returns, Part 2","Everything or Nothing: The Untold Story of 007","Codependent Lesbian Space Alien Seeks Same","Last Stand, The","Upstream Color","Shadow Dancer","Human Planet","Comme un chef","Movie 43","Pervert's Guide to Ideology, The","Sightseers","Hansel & Gretel: Witch Hunters","Jim Jefferies: Fully Functional (EPIX)","Why Stop Now","Tabu","Upside Down","Liability, The","Angst","Stand Up Guys","Side Effects","Identity Thief","ABCs of Death, The","Beautiful Creatures","Good Day to Die Hard, A","21 and Over","Safe Haven","Frozen Planet","Act of Killing, The","Universal Soldier: Day of Reckoning","Escape from Planet Earth","Before Midnight","Snitch","Dark Skies","Oh Boy (A Coffee in Berlin)","Journey to the West: Conquering the Demons (Daai wa sai you chi Chui mo chun kei)","Maniac Cop 2","Jack the Giant Slayer","Wadjda","Unintentional Kidnapping of Mrs. Elfriede Ott, The (Die Unabsichtliche Entführung der Frau Elfriede Ott)","Legend of Sleepy Hollow, The","G.I. Joe: Retaliation","Stoker","Oz the Great and Powerful","Croods, The","Incredible Burt Wonderstone, The","Call, The","Olympus Has Fallen","First Time, The","Mezzo Forte","Place Beyond the Pines, The","Brass Teapot, The","Phil Spector","Host, The","Admission","Evil Dead","Trance","Perfect Plan, A (Plan parfait, Un)","Oblivion","Dark Tide","42","Wolf Children (Okami kodomo no ame to yuki)","Disconnect","Invincible Iron Man, The","Yongary: Monster from the Deep","Pain & Gain","Hulk Vs.","Resolution","Grabbers","Justice League: Doom","Grandmaster, The (Yi dai zong shi)","This Is the End","Iron Man 3","English Teacher, The","Mud","Bill Hicks: Revelations","Pawn","Shaolin Temple (Shao Lin si)","Syrup","Great Gatsby, The","Star Trek Into Darkness","Internship, The","Darkon","Mimino","Ivan Vasilievich: Back to the Future (Ivan Vasilievich menyaet professiyu)","Only God Forgives","Hangover Part III, The","Fast & Furious 6 (Fast and the Furious 6, The)","Epic","Captain America","Tie Xi Qu: West of the Tracks (Tiexi qu)","Rink, The","Captain America II: Death Too Soon","Down Terrace","Frances Ha","Lords of Salem, The","Behind the Candelabra","As I Was Moving Ahead Occasionally I Saw Brief Glimpses of Beauty","With Great Power: The Stan Lee Story","After Earth","Now You See Me","Inhuman Resources (Redd Inc.)","Way, Way Back, The","Much Ado About Nothing","Man of Steel","Kings of Summer, The","Purge, The","Rapture-Palooza","20 Feet from Stardom (Twenty Feet from Stardom)","Bling Ring, The","Monsters University","Schlussmacher","Fullmetal Alchemist: The Sacred Star of Milos","Maniac","Not Suitable for Children","Pacific Rim","LEGO Batman: The Movie - DC Heroes Unite","Best Offer, The (Migliore offerta, La)","Adam and Eve (National Lampoon's Adam & Eve)","World War Z","Elysium","Despicable Me 2","White House Down","World's End, The","Redemption (Hummingbird)","Heat, The","Lone Ranger, The","Passion","V/H/S/2","Knot, The","The Spectacular Now","Lifeguard, The","Sharknado","Craig Ferguson: I'm Here To Help","Stuck in Love","Class Act","Fruitvale Station","R.I.P.D.","Field in England, A","Conjuring, The","Turbo","Wolverine, The","Drinking Buddies","Red 2","Coffee Town","Revenge for Jolly!","2 Guns","Blue Jasmine","Great Beauty, The (Grande Bellezza, La)","3 dev adam (Three Giant Men)","Louis C.K.: Oh My God","Percy Jackson: Sea of Monsters","Smurfs 2, The","Alan Partridge: Alpha Papa","Man of Tai Chi","Batman: Mystery of the Batwoman","We're the Millers","Grown Ups 2","Kick-Ass 2","Riddick","Planes","Blackfish","Wind Rises, The (Kaze tachinu)","Jobs","Lee Daniels' The Butler","In a World...","About Time","Justice League: Crisis on Two Earths","You're Next","Maria Bamford: The Special Special Special!","Getaway","Mystery of the Third Planet, The (Tayna tretey planety)","Rage of Honor","Gravity","What If","History of Future Folk, The","Prisoners","Austenland","Insidious: Chapter 2","Rush","Family, The","Short Term 12","Collision Course","To Do List, The","Inescapable","Nebraska","Enough Said","Don Jon","Mood Indigo (L'écume des jours)","Century of the Self, The","Crystal Fairy & the Magical Cactus and 2012","Bad Milo (Bad Milo!)","Runner Runner","Blue Is the Warmest Color (La vie d'Adèle)","Cloudy with a Chance of Meatballs 2","Captain Phillips","All Dogs Christmas Carol, An","Machete Kills (Machete 2)","Filth","Escape Plan","Thief of Paris, The (Le voleur)","Carrie","UnHung Hero","Counselor, The","Escape From Tomorrow","Double, The","12 Years a Slave","All Is Lost","Ender's Game","Jackass Presents: Bad Grandpa","Thor: The Dark World","Dallas Buyers Club","Selfish Giant, The","Last Vegas","Philomena","Book Thief, The","The Hunger Games: Catching Fire","Hobbit: The Desolation of Smaug, The","47 Ronin","Delivery Man","Charlie Countryman","Red Flag","Day of the Doctor, The","Guilty of Romance (Koi no tsumi)","Frozen","Inside Llewyn Davis","Wolf of Wall Street, The","Homefront","Mandela: Long Walk to Freedom","Evangelion: 3.0 You Can (Not) Redo","All is Bright","Tim's Vermeer","American Hustle","Secret Life of Walter Mitty, The","Her","RoboGeisha (Robo-geisha)","Christmas Carol, A","Lone Survivor","Saving Mr. Banks","Zatoichi and the Chest of Gold (Zatôichi senryô-kubi) (Zatôichi 6)","Oldboy","Dampfnudelblues","Anchorman 2: The Legend Continues","Snowpiercer","Only Old Men Are Going to Battle (V boy idut odni stariki)","Guest from the Future (Gostya iz buduschego)","Kidnapping, Caucasian Style (Kavkazskaya plennitsa)","Haunter","Wrong Cops","Muppet Christmas: Letters to Santa, A","Ninja: Shadow of a Tear","Fuck You, Goethe (Fack Ju Göhte)","High School","Grudge Match","Highlander: The Search for Vengeance","Only Lovers Left Alive","Cats","MacGyver: Trail to Doomsday","Bad Karma","Hunting Elephants","Dragon Ball Z: Battle of Gods","Freezer","We Are What We Are","Dragon ball Z 04: Lord Slug","Chinese Puzzle (Casse-tête chinois)","Dragon Ball: The Path to Power (Doragon bôru: Saikyô e no michi)","Ride Along","Jack Ryan: Shadow Recruit","Divergent","Hotel Chevalier (Part 1 of 'The Darjeeling Limited')","Ernest & Célestine (Ernest et Célestine)","Drift","I, Frankenstein","Better Living Through Chemistry","Nymphomaniac: Volume I","Enemy","Wonder Woman","Monuments Men, The","The Lego Movie","RoboCop","Art of the Steal, The","Nymphomaniac: Volume II","Knights of Badassdom","Venus in Fur (La Vénus à la fourrure)","Date and Switch","Zero Theorem, The","Winter's Tale","On the Other Side of the Tracks (De l'autre côté du périph)","GLOW: The Story of the Gorgeous Ladies of Wrestling","Cold Comes the Night","Chouchou","Someone Marry Barry","About Last Night","Grand Budapest Hotel, The","Oversimplification of Her Beauty, An","Bring It On: Fight to the Finish","That Awkward Moment","Interstellar","3 Days to Kill","Welcome to the Jungle","Non-Stop","Wrinkles (Arrugas)","Garden of Words, The (Koto no ha no niwa)","300: Rise of an Empire","Particle Fever","Bag Man, The","Mr. Peabody & Sherman","Under the Skin","Need for Speed","Barefoot","Veronica Mars","Bad Words","Son of God","Puss in Boots: The Three Diablos","Why Don't You Play In Hell? (Jigoku de naze warui)","Ocho apellidos vascos","Captain America: The Winter Soldier","Noah","Nut Job, The","King of Comedy (Hei kek ji wong)","13 Sins","Muppets Most Wanted","Me and you (io e te)","Free to Play","Unknown Known, The","The Raid 2: Berandal","Brain Smasher... A Love Story (Bouncer and the Lady, The)","The Amazing Spider-Man 2","Calvary","Oculus","God's Not Dead","Cold in July","Rio 2","Honest Liar, An","Fading Gigolo","Transcendence","Hatchet III","Other Woman, The","Haunted House 2, A","Mulan II","Brick Mansions","Locke","Neighbors","Alpha and Omega 3: The Great Wolf Games","Mom's Night Out","Lucy","X-Men: Days of Future Past","Godzilla"];



/*initiate the autocomplete function on the "myInput
" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("data"), movies);