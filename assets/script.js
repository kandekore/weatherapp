var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var cels = document.querySelector('.cels');
var fah = document.querySelector('.fah');
var maxTemp = document.querySelector('.max');
var minTemp = document.querySelector('.min');
var feelsLike = document.querySelector('.feels');
var country = document.querySelector('.flag');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button = document.querySelector('.submit');
var listItemEl = $('#listitem')
//var heatel = $('#bullet')


button.addEventListener('click', function(name){
    event.preventDefault();
    
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=50a7aa80fa492fa92e874d23ad061374')
.then(response => response.json())
.then(data => {
  var tempValue = data['main']['temp'];
  var temp_maxValue = data['main']['temp_max'];
  var temp_minValue = data['main']['temp_min'];
  var feelsLikeValue = data['main']['feels_like'];

  var nameValue = data['name'];
  var descValue = data['weather'][0]['description'];
  

  main.innerHTML = nameValue;
  desc.innerHTML = descValue;
  cels.innerHTML = (tempValue - 273.15).toFixed(0) + "	&#8451;";
  maxTemp.innerHTML = "Max Celsius - "+(temp_maxValue - 273.15).toFixed(0);
  minTemp.innerHTML = "Min Celsius - "+(temp_minValue - 273.15).toFixed(0);
  feelsLike.innerHTML = "Feels Like Celsius - "+(feelsLikeValue - 273.15).toFixed(0);
  fah.innerHTML = "Fahrenheit - "+((tempValue - 273.15) +32).toFixed(0);
  input.value ="";


  


 localStorage.setItem("recentSearch", nameValue)

 console.log(JSON.stringify(data));

 //var listItem = $(input.value);//.val();
 //var heat = $(cels.innerHTML);

 listItemEl.append('<li class="btn btn-primary" onclick="(name)"><h3> '+ main.innerHTML + '</h3> <ul>' + cels.innerHTML + ' and ' + desc.innerHTML + '</ul>' + '</li>');
 //heatel.append(cels.innerHTML);

//  nameValue.array.forEach(element => {



  
 });
 
 // console.log(response.json());
 console.log(JSON.stringify(data));
 //console.log(nameValue)
 
})

.catch(err => alert("Wrong city name!"));



