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

var movies = ["'burbs, The","(500) Days of Summer","10 Cloverfield Lane","10 Things I Hate About You","10,000 BC","101 Dalmatians","101 Dalmatians (One Hundred and One Dalmatians)","12 Angry Men","12 Years a Slave","127 Hours","13 Going on 30","13th Warrior, The","1408","15 Minutes","17 Again","1984 (Nineteen Eighty-Four)","2 Days in the Valley","2 Fast 2 Furious (Fast and the Furious 2, The)","20,000 Leagues Under the Sea","2001: A Space Odyssey","2010: The Year We Make Contact","2012","21","21 Grams","21 Jump Street","22 Jump Street","25th Hour","27 Dresses","28 Days","28 Days Later","28 Weeks Later","30 Days of Night","300","39 Steps, The","3:10 to Yuma","40 Days and 40 Nights","40-Year-Old Virgin, The","400 Blows, The (Les quatre cents coups)","48 Hrs.","50 First Dates","50/50","6th Day, The","8 1/2 (8½)","8 Mile","8MM","9","9 1/2 Weeks (Nine 1/2 Weeks)","A Million Ways to Die in the West","A-Team, The","A.I. Artificial Intelligence","AVP: Alien vs. Predator","About Schmidt","About Time","About a Boy","Absolute Power","Abyss, The","Accepted","Ace Ventura: Pet Detective","Ace Ventura: When Nature Calls","Across the Universe","Adaptation","Addams Family Values","Addams Family, The","Addicted to Love","Adjustment Bureau, The","Adventureland","Adventures in Babysitting","Adventures of Baron Munchausen, The","Adventures of Buckaroo Banzai Across the 8th Dimension, The","Adventures of Priscilla, Queen of the Desert, The","Adventures of Tintin, The","Aeon Flux","African Queen, The","Age of Innocence, The","Air Force One","Airheads","Airplane II: The Sequel","Airplane!","Akira","Aladdin","Aladdin and the King of Thieves","Alexander","Alice in Wonderland","Alien","Alien Nation","Alien: Resurrection","Aliens","Alien³ (a.k.a. Alien 3)","All About Eve","All About My Mother (Todo sobre mi madre)","All Dogs Go to Heaven","All Dogs Go to Heaven 2","All Quiet on the Western Front","All the President's Men","Almost Famous","Along Came Polly","Along Came a Spider","Amadeus","Amazing Spider-Man, The","Amelie (Fabuleux destin d'Amélie Poulain, Le)","America's Sweethearts","American Beauty","American Gangster","American Graffiti","American History X","American Hustle","American Pie","American Pie 2","American President, The","American Psycho","American Sniper","American Splendor","American Tail, An","American Tail: Fievel Goes West, An","American Wedding (American Pie 3)","American Werewolf in London, An","American Werewolf in Paris, An","American in Paris, An","Amistad","Amityville Horror, The","Amores Perros (Love's a Bitch)","Anaconda","Analyze This","Anastasia","Anchorman 2: The Legend Continues","Anchorman: The Legend of Ron Burgundy","And Your Mother Too (Y tu mamá también)","Angels & Demons","Angels in the Outfield","Anger Management","Animal House","Animal, The","Animatrix, The","Annie","Annie Hall","Another Stakeout","Ant-Man","Antz","Any Given Sunday","Apartment, The","Apocalypse Now","Apocalypto","Apollo 13","Apple Dumpling Gang, The","Arachnophobia","Argo","Aristocats, The","Aristocrats, The","Arlington Road","Armageddon","Army of Darkness","Around the World in 80 Days","Arrival","Arrival, The","Arsenic and Old Lace","Arthur","As Good as It Gets","Assassination of Jesse James by the Coward Robert Ford, The","Assassins","Assault on Precinct 13","Astronaut's Wife, The","Atlantis: The Lost Empire","Atonement","Austin Powers in Goldmember","Austin Powers: International Man of Mystery","Austin Powers: The Spy Who Shagged Me","Autumn in New York","Avatar","Avengers, The","Avengers: Age of Ultron","Avengers: Infinity War - Part I","Aviator, The","Awakenings","BASEketball","Babe","Babe: Pig in the City","Babel","Baby Mama","Bachelor, The","Back to School","Back to the Future","Back to the Future Part II","Back to the Future Part III","Backdraft","Bad Boys","Bad Boys II","Bad Santa","Badlands","Bambi","Bananas","Bank Job, The","Barb Wire","Barcelona","Barton Fink","Basic Instinct","Basketball Diaries, The","Batman","Batman & Robin","Batman Begins","Batman Forever","Batman Returns","Batman v Superman: Dawn of Justice","Batman: Mask of the Phantasm","Battle Royale (Batoru rowaiaru)","Battlefield Earth","Battleship Potemkin","Battlestar Galactica","Be Kind Rewind","Beach, The","Bean","Beautiful Girls","Beautiful Mind, A","Beauty and the Beast","Beauty of the Day (Belle de jour)","Beavis and Butt-Head Do America","Bedazzled","Bedknobs and Broomsticks","Bedtime Stories","Bee Movie","Beethoven","Beetlejuice","Before Sunrise","Before Sunset","Behind Enemy Lines","Being John Malkovich","Being There","Ben-Hur","Benchwarmers, The","Bend It Like Beckham","Beneath the Planet of the Apes","Benny & Joon","Best in Show","Better Off Dead...","Beverly Hillbillies, The","Beverly Hills Cop","Beverly Hills Cop II","Beverly Hills Cop III","Beverly Hills Ninja","Bewitched","Bicentennial Man","Bicycle Thieves (a.k.a. The Bicycle Thief) (a.k.a. The Bicycle Thieves) (Ladri di biciclette)","Big","Big Blue, The (Grand bleu, Le)","Big Chill, The","Big Daddy","Big Fish","Big Hero 6","Big Lebowski, The","Big Momma's House","Big Night","Big Short, The","Big Sleep, The","Big Trouble in Little China","Bill & Ted's Bogus Journey","Bill & Ted's Excellent Adventure","Billy Elliot","Billy Madison","Bio-Dome","Birdcage, The","Birdman: Or (The Unexpected Virtue of Ignorance)","Birds, The","Black Beauty","Black Hawk Down","Black Panther","Black Sheep","Black Swan","Blade","Blade II","Blade Runner","Blade Runner 2049","Blade: Trinity","Blades of Glory","Blair Witch Project, The","Blast from the Past","Blazing Saddles","Blind Side, The","Blind Swordsman: Zatoichi, The (Zatôichi)","Blood Diamond","Blood Simple","Blow","Blown Away","Blue Lagoon, The","Blue Velvet","Blues Brothers 2000","Blues Brothers, The","Bob Roberts","Body Heat","Body of Lies","Bodyguard, The","Boiler Room","Bolt","Bone Collector, The","Bonnie and Clyde","Boogie Nights","Book of Eli, The","Boomerang","Boondock Saints, The","Boot, Das (Boat, The)","Borat: Cultural Learnings of America for Make Benefit Glorious Nation of Kazakhstan","Born on the Fourth of July","Borrowers, The","Bottle Rocket","Bound","Bourne Identity, The","Bourne Legacy, The","Bourne Supremacy, The","Bourne Ultimatum, The","Bowfinger","Bowling for Columbine","Boxing Helena","Boyhood","Boys Don't Cry","Boys on the Side","Boyz N the Hood","Brady Bunch Movie, The","Brave","Braveheart","Brazil","Break-Up, The","Breakdown","Breakfast Club, The","Breakfast at Tiffany's","Breaking Away","Brick","Bridesmaids","Bridge on the River Kwai, The","Bridges of Madison County, The","Bridget Jones's Diary","Bridget Jones: The Edge of Reason","Bring It On","Bringing Up Baby","Broadcast News","Brokeback Mountain","Broken Arrow","Broken Flowers","Bronx Tale, A","Brotherhood of the Wolf (Pacte des loups, Le)","Brothers Grimm, The","Brothers McMullen, The","Bruce Almighty","Brüno (Bruno)","Bubba Ho-tep","Bucket List, The","Buffalo '66 (a.k.a. Buffalo 66)","Buffy the Vampire Slayer","Bug's Life, A","Bull Durham","Bulletproof Monk","Bullets Over Broadway","Bulworth","Burn After Reading","Butch Cassidy and the Sundance Kid","Cabin in the Woods, The","Cable Guy, The","Caddyshack","Can't Hardly Wait","Canadian Bacon","Candyman","Cannonball Run, The","Cape Fear","Capote","Captain America: Civil War","Captain America: The First Avenger","Captain America: The Winter Soldier","Captain Phillips","Carlito's Way","Carrie","Cars","Casablanca","Casino","Casino Royale","Casper","Cast Away","Cat on a Hot Tin Roof","Catch Me If You Can","Cats & Dogs","Celebration, The (Festen)","Cell, The","Chain Reaction","Change-Up, The","Chappie","Charade","Chariots of Fire","Charlie and the Chocolate Factory","Charlie's Angels","Charlie's Angels: Full Throttle","Charlotte's Web","Chasing Amy","Cheech and Chong's Up in Smoke","Chicago","Chicken Run","Child's Play","Children of Men","Children of a Lesser God","Children of the Corn","Chinatown","Chitty Chitty Bang Bang","Chocolat","Chorus, The (Choristes, Les)","Christine","Christmas Story, A","Christmas Vacation (National Lampoon's Christmas Vacation)","Chronicles of Narnia: Prince Caspian, The","Chronicles of Narnia: The Lion, the Witch and the Wardrobe, The","Chronicles of Riddick, The","Cider House Rules, The","Cinderella","Cinderella Man","Cinema Paradiso (Nuovo cinema Paradiso)","Circle of Friends","Citizen Kane","City Hall","City Lights","City Slickers","City Slickers II: The Legend of Curly's Gold","City of Angels","City of God (Cidade de Deus)","City of Lost Children, The (Cité des enfants perdus, La)","Civil Action, A","Clash of the Titans","Clear and Present Danger","Clerks","Clerks II","Click","Client, The","Cliffhanger","Clockers","Clockwork Orange, A","Close Encounters of the Third Kind","Closer","Cloud Atlas","Cloudy with a Chance of Meatballs","Cloverfield","Clue","Clueless","Cocktail","Coco","Cocoon","Cold Comfort Farm","Cold Mountain","Collateral","Color Purple, The","Color of Money, The","Coming to America","Commitments, The","Con Air","Conan the Barbarian","Coneheads","Confessions of a Dangerous Mind","Congo","Conquest of the Planet of the Apes","Conspiracy Theory","Constant Gardener, The","Constantine","Contact","Contagion","Conversation, The","Cook the Thief His Wife & Her Lover, The","Cookie's Fortune","Cool Hand Luke","Cool Runnings","Cooler, The","Cop Land","Copycat","Coraline","Corporation, The","Corpse Bride","Corrina, Corrina","Courage Under Fire","Cowboy Bebop: The Movie (Cowboy Bebop: Tengoku no Tobira)","Coyote Ugly","Craft, The","Crank","Crash","Crazy, Stupid, Love.","Creature Comforts","Creepshow","Crimes and Misdemeanors","Crimson Tide","Crocodile Dundee","Crocodile Dundee II","Crocodile Dundee in Los Angeles","Crouching Tiger, Hidden Dragon (Wo hu cang long)","Croupier","Crow, The","Crow: City of Angels, The","Cruel Intentions","Crumb","Crying Game, The","Cube","Curious Case of Benjamin Button, The","Cutthroat Island","Cutting Edge, The","Cyrano de Bergerac","Da Vinci Code, The","Dallas Buyers Club","Dancer in the Dark","Dances with Wolves","Dangerous Liaisons","Dangerous Minds","Dante's Peak","Daredevil","Darjeeling Limited, The","Dark City","Dark Crystal, The","Dark Knight Rises, The","Dark Knight, The","Das Experiment (Experiment, The)","Date Night","Dave","Dawn of the Dead","Dawn of the Planet of the Apes","Day After Tomorrow, The","Day the Earth Stood Still, The","Daylight","Days of Thunder","Dazed and Confused","Dead Again","Dead Alive (Braindead)","Dead Calm","Dead Man","Dead Man Walking","Dead Men Don't Wear Plaid","Dead Poets Society","Dead Zone, The","Deadpool","Deadpool 2","Death Becomes Her","Death Proof","Death to Smoochy","Deep Blue Sea","Deep Impact","Deer Hunter, The","Defending Your Life","Definitely, Maybe","Delicatessen","Deliverance","Demolition Man","Departed, The","Descendants, The","Descent, The","Desperado","Desperately Seeking Susan","Despicable Me","Despicable Me 2","Detroit Rock City","Deuce Bigalow: Male Gigolo","Devil Wears Prada, The","Devil in a Blue Dress","Devil's Backbone, The (Espinazo del diablo, El)","Devil's Own, The","Diabolique","Dial M for Murder","Diamonds Are Forever","Dick Tracy","Dictator, The","Die Another Day","Die Hard","Die Hard 2","Die Hard: With a Vengeance","Diner","Dinosaur","Dirty Dancing","Dirty Dozen, The","Dirty Harry","Dirty Pretty Things","Dirty Rotten Scoundrels","Disclosure","District 9","Disturbia","Divergent","Django Unchained","Do the Right Thing","Doctor Dolittle","Doctor Strange","Doctor Zhivago","Dodgeball: A True Underdog Story","Dog Day Afternoon","Dogma","Dogville","Dolores Claiborne","Don Juan DeMarco","Don't Tell Mom the Babysitter's Dead","Donnie Brasco","Donnie Darko","Doom","Doors, The","Double Indemnity","Double Jeopardy","Down Periscope","Down by Law","Down to Earth","Down with Love","Downfall (Untergang, Der)","Dr. Dolittle","Dr. Dolittle 2","Dr. Horrible's Sing-Along Blog","Dr. No","Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb","Dracula","Dracula (Bram Stoker's Dracula)","Dracula: Dead and Loving It","Dragonheart","Dreamers, The","Dredd","Drive","Driving Miss Daisy","Drop Dead Gorgeous","Drop Zone","Drugstore Cowboy","Drunken Master (Jui kuen)","Duck Soup","Dude, Where's My Car?","Due Date","Dukes of Hazzard, The","Dumb & Dumber (Dumb and Dumber)","Dumb and Dumberer: When Harry Met Lloyd","Dumbo","Dune","Dungeons & Dragons","Dunkirk","Déjà Vu (Deja Vu)","E.T. the Extra-Terrestrial","EDtv","Eastern Promises","Easy A","Easy Rider","Eat Drink Man Woman (Yin shi nan nu)","Ed Wood","Edge of Tomorrow","Edge, The","Edward Scissorhands","Eight Men Out","Election","Elektra","Elephant Man, The","Elf","Elite Squad (Tropa de Elite)","Elizabeth","Elysium","Emma","Emperor's New Groove, The","Empire Records","Empire of the Sun","Enchanted","Encino Man","End of Days","Ender's Game","Enemy at the Gates","Enemy of the State","English Patient, The","Englishman Who Went Up a Hill But Came Down a Mountain, The","Enter the Dragon","Entrapment","Equilibrium","Eragon","Eraser","Eraserhead","Erin Brockovich","Escape from L.A.","Escape from New York","Escape from the Planet of the Apes","Eternal Sunshine of the Spotless Mind","EuroTrip","European Vacation (aka National Lampoon's European Vacation)","Evan Almighty","Event Horizon","Ever After: A Cinderella Story","Everest","Everyone Says I Love You","Everything You Always Wanted to Know About Sex * But Were Afraid to Ask","Evil Dead II (Dead by Dawn)","Evil Dead, The","Evita","Evolution","Ex Machina","Excalibur","Executive Decision","Exit Through the Gift Shop","Exit to Eden","Exorcist, The","Exotica","Expendables 2, The","Expendables, The","Eyes Wide Shut","F/X","Face/Off","Faculty, The","Fahrenheit 451","Fahrenheit 9/11","Fall, The","Fallen","Falling Down","Family Guy Presents Stewie Griffin: The Untold Story","Family Man, The","Fantasia","Fantasia 2000","Fantastic Beasts and Where to Find Them","Fantastic Four","Fantastic Four: Rise of the Silver Surfer","Fantastic Mr. Fox","Far and Away","Fast & Furious (Fast and the Furious 4, The)","Fast Five (Fast and the Furious 5, The)","Fast Times at Ridgemont High","Fast and the Furious, The","Fast and the Furious: Tokyo Drift, The (Fast and the Furious 3, The)","Fatal Attraction","Fatal Instinct","Father of the Bride","Father of the Bride Part II","Fear and Loathing in Las Vegas","Femme Nikita, La (Nikita)","Ferris Bueller's Day Off","Fever Pitch","Few Good Men, A","Field of Dreams","Fifth Element, The","Fight Club","Fighter, The","Final Destination","Final Destination 2","Final Fantasy VII: Advent Children","Final Fantasy: The Spirits Within","Finding Dory","Finding Forrester","Finding Nemo","Ghost Rider","Godfather, The","Godfather: Part II, The","Godfather: Part III, The","Harry Potter and the Chamber of Secrets","Harry Potter and the Deathly Hallows: Part 1","Harry Potter and the Deathly Hallows: Part 2","Harry Potter and the Goblet of Fire","Harry Potter and the Half-Blood Prince","Harry Potter and the Order of the Phoenix","Harry Potter and the Prisoner of Azkaban","Harry Potter and the Sorcerer's Stone (a.k.a. Harry Potter and the Philosopher's Stone)","Harry and the Hendersons","Hellboy","Hellboy II: The Golden Army","Inception","Jumanji","Jumper","Jumpin' Jack Flash","Jungle Book, The","Jungle2Jungle (a.k.a. Jungle 2 Jungle)","Junior","Juno","Jurassic Park","Jurassic Park III","Jurassic World","Juror, The","Jury Duty","Just Cause","K-PAX","Kalifornia","Karate Kid, Part II, The","Karate Kid, Part III, The","Karate Kid, The","Mad Max: Fury Road","Madagascar","Madagascar: Escape 2 Africa","Matrix Reloaded, The","Matrix Revolutions, The","Matrix, The","Maverick","Maze Runner, The","Men in Black (a.k.a. MIB)","Men in Black II (a.k.a. MIIB) (a.k.a. MIB 2)","Men in Black III (M.III.B.) (M.I.B.³)","Mission: Impossible","Mission: Impossible - Ghost Protocol","Mission: Impossible - Rogue Nation","Mission: Impossible II","Mission: Impossible III","Mississippi Burning","Mist, The","Mister Roberts","Misérables, Les","Moana","Modern Times","Mona Lisa Smile","Money Pit, The","Money Train","Moneyball","Monsoon Wedding","Monster","Monsters University","Monsters, Inc.","Perks of Being a Wallflower, The","Pirates of the Caribbean: At World's End","Pirates of the Caribbean: Dead Man's Chest","Pirates of the Caribbean: On Stranger Tides","Pirates of the Caribbean: The Curse of the Black Pearl"];
/*initiate the autocomplete function on the "myInput
" element, and pass along the countries array as possible autocomplete values:*/

try {
  autocomplete(document.getElementById("data"), movies);
}
catch(err) {
  
}
try {
  autocomplete(document.getElementById("dat"), movies);
}
catch(err) {
  
}

// autocomplete(document.getElementById("data"), movies);
// autocomplete(document.getElementById("dat"), movies);