$(function(){

	var model = {
		cats : [
		  {catName: "cat_one", picSource: "images/cat1.jpg", num_clicks: 0},
		  {catName: "cat_two", picSource: "images/cat2.jpg", num_clicks: 0},
		  {catName: "cat_three", picSource: "images/cat3.jpg", num_clicks: 0},
		  {catName: "cat_four", picSource: "images/cat4.jpg", num_clicks: 0}
		]

	};


	var octopus = {
		currentCat : null,
		
		init: function() {
			//start the entire application
			this.setCurrentCat(model.cats[0]);
			Catview.init();
			catListView.init();
			adminView.init();
		},

		getCurrentCat: function(){
			return this.currentCat; 
			
		  
		},
		
		setCurrentCat: function(cat){
			this.currentCat = cat;
		},


		getAllCats: function(){
		  return model.cats;
		},

		incrementClicks: function(){
		  this.currentCat.num_clicks ++;
		  Catview.render();
		}
		
	};


 
	var catListView = {
		init: function(){
			  var cats = octopus.getAllCats();
			  this.render(cats);
		},

		render: function(cats){
			//render cat list buttons
			var catlist = document.getElementById('catlist');
			var i = 0;
			cats.forEach(function(cat) {
				//create button for each cats
				var button = document.createElement("button")
				var buttonText = document.createTextNode(cat.catName);
				catlist.appendChild(button);
				button.appendChild(buttonText);
				
				//add clicklistener on each button
				button.addEventListener("click", (function(cat_copy){
					return function(){
						octopus.setCurrentCat(cat_copy);
						Catview.render();
					}
				})(cat));
				i = i+1;
			});
		}
	};

	var Catview = {
		init: function(){
			//add click listener at a cat image
			document.getElementById('catimage').addEventListener("click", function() {
				//change text increment by one
				octopus.incrementClicks();
			});
			this.render();
		},

		render: function(){
			//Get current cat's data 
			if(octopus.getCurrentCat !== null){
				var cat = octopus.getCurrentCat();
				var catName = cat.catName;
				var catSource = cat.picSource;
				var clicks = cat.num_clicks;

				//display the current cat image
				document.getElementById('catname').innerHTML = catName;
				document.getElementById('catimage').src = catSource;
				document.getElementById('numberOfClicks').innerHTML = clicks;	
			};
			
		}
	};
	
	var adminView = {

		init: function(){
			var adminButton = document.getElementById('admin')
			var form1 = document.getElementById("form1");
			//Hide the form 
			form1.style.display = "none";
			
			//add click listener on admin button
			adminButton.addEventListener("click", function(){
				if (form1.style.display == "none") {
					form1.style.display = "block";
				}
			});
		
			//add click listener at cancel button
			document.getElementById('cancelButton').addEventListener("click", function() {
				if (form1.style.display == "block") {
					form1.style.display = "none";
				}
			});

			//add click listener at submit button
			document.getElementById('submitButton').addEventListener("click", function() {
				var cat = {catName: form1.elements[0].value, picSource: form1.elements[1].value, num_clicks: form1.elements[2].value};
				octopus.setCurrentCat(cat);
				form1.style.display = "none";
				Catview.render();
				
			});
			
		},
	}; 

octopus.init();
}());
