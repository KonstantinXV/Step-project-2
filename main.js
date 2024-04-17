let section = document.querySelector('section');
let select = document.querySelector('.selectcharacter');
let inputName = document.querySelector('#inputname');
let individual = document.querySelector('.individualCard')
let sameCard = document.querySelector('.sameCard')
let button = document.querySelectorAll('.btn.btn-primary')
let body = document.querySelector('body')
let page = document.location.pathname;
// section.innerHTML = "";
// individual.innerHTML = "";
console.log(page);


let apiUrl = 'https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json';
let apiResponse = []; // სრული API შეყვანილია მასივში

  
// 1 API დაკავშირება<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    apiResponse = data;
    htmlRenderer();
    
    
  });
  
  if (page == "/characters.html") {
    
  
// 2 სელექტის დაკომპლექტება ისე რომ არ მოხდეს დუბლირება<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function htmlRenderer() {
  let uniqueSpecies = new Set();   //მხოლოდ უნიკალური დასახელებეს ინახავს  
  apiResponse.forEach(character => {
    uniqueSpecies.add(character.species);
  });
  // გვერდის გახსნისთანავე (სერჩის გარეშე) რომ გამოიტანოს პერსონაჟები
  select.innerHTML = '<option value="">Select a species</option>';

  uniqueSpecies.forEach(species => {
    select.innerHTML += `<option value="${species}">${species}</option>`;
  });

  
// 2 სტარტ ფუნქცია, ძირითადი ლოგიკა<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
start(); 
}
function start() {
    section.textContent = ''; 
    let selectedSpecies = select.value 
    let searchinput = inputName.value.toLowerCase(); // გადაყავს პატარა ასოებში
    if (searchinput !== '') {
      //თუ ინფუტი არ არის ცარიელი, აძლევს პრიორიტეტს სელექტთან მიმართებაში
      apiResponse.forEach(character => {
        if (
          (searchinput === '' ||
            character.name.toLowerCase().includes(searchinput) || // სერჩში სახელის შეყვანის პარალელურად გამოაქვს პერსონაჟები
            character.species.toLowerCase().includes(searchinput)) // სერჩში რასის შეყვანის პარალელურად გამოაქვს პერსონაჟები
        ) {
          section.innerHTML += sectionData(character);
        }
      });
    } else {
      apiResponse.forEach(character => {
        if (
          (selectedSpecies === '' || character.species === selectedSpecies) 
        ) {
          section.innerHTML += sectionData(character);
        }
      });
    }
    
  }


// 3 ფუნქცია, რომელიც ქმნის HTML ქარდებს<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function sectionData(character) {
  
  let char= `
  <div class="cardtheme card" style="width: 18rem">
      <img src="${character.image}" class="cardtheme card-img-top" alt="..." />
      <div class="cardtheme card-body">
        <h4 class="card-title">${character.name}</h4>
        <h6 class="card-text">Race: ${character.species}</h6>
        <h6 class="card-text">Homeworld: ${character.homeworld}</h6>
        <h6 class="card-text" style="color: #EB202E">Masters: ${character.masters}</h6>
        <p class="card-text">${character.affiliations[0]}</p>
        <a href="./individual.html" onclick="clickCard(${character.id})" class="btn btn-primary" style="background-color:#FADE4B">Click for more </a>
      </div>
      <p class="sameCard">ID${character.id}</p>
    </div>`;
    // sameCard.innerHTML +=character.id
    
  
    return char
}


// 4 ღილაკები რომელზეც მოქმედების შედეგად გაიშვება სტარტ ფუნქცია<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
select.addEventListener('change', start);
inputName.addEventListener('input', start);

}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let individualPage = '0'

// sessionStorage.setItem('saveCard', individualPage)

function clickCard(id){
  
  individualPage=id;
  window.location.href='./individual.html'
  console.log(individualPage);
  sessionStorage.setItem('saveCard', individualPage)
}


if (page == "/individual.html") {
sessionStorage.getItem('saveCard')
// function individual(character) {
//     let individ= `<div class="individ-img-div">
//     <img class="individ-img" src="${character.image}" alt="" />
//     <h3 class="individ-name">${character.name}</h3>
//   </div>
//       `
//       return individ
//   }


  function htmlRenderer(){
    
   individualPage= sessionStorage.getItem('saveCard')
   
        apiResponse.forEach(character => {
       
          
          if(individualPage==character.id){
            individual.textContent=''
        individual.innerHTML+=`<div class="individ-img-div">
            <img class="individ-img" src="${character.image}" alt="" />
            <h3 class="individ-name">${character.name}</h3>
            <div class="cardInfo">
            <p class="homeland2"><h5 style="display: inline; color:yellow">homeland:</h5>            ${character.homeworld} </p>
            <p class="species2"><h5 style="display: inline; color:yellow">species:</h5>              ${character.species}</p>
            <p class="gender2"><h5 style="display: inline; color:yellow">gender:</h5>              ${character.gender}</p>
            <p class="height"><h5 style="display: inline; color:yellow">height:</h5>              ${character.height}</p>
            <p class="hairColor"><h5 style="display: inline; color:yellow">hairColor:</h5>              ${character.hairColor}</p>
            <p class="eyeColor"><h5 style="display: inline; color:yellow">eyeColor:</h5>              ${character.eyeColor}</p>
            <p class="skinColor"><h5 style="display: inline; color:yellow">skinColor:</h5>              ${character.skinColor}</p>
            <p class="bornLocation"><h5 style="display: inline; color:yellow">bornLocation:</h5>              ${character.bornLocation}</p>
            <p class="born"><h5 style="display: inline; color:yellow">born:</h5>              ${character.born}</p>
            <p class="died"><h5 style="display: inline; color:yellow">died:</h5>              ${character.died}</p>
            <p class="diedLocation"><h5 style="display: inline; color:yellow">diedLocation:</h5>              ${character.diedLocation}</p>
            <p class="cybernetics"><h5 style="display: inline; color:yellow">cybernetics:</h5>              ${character.cybernetics}</p>
            <p class="affiliations"><h5 style="display: inline; color:yellow">affiliations:</h5>              ${character.affiliations}</p>
            <p class="masters2"><h5 style="display: inline; color:yellow">masters:</h5>              ${character.masters}</p>
            <p class="apprentices2"><h5 style="display: inline; color:yellow">apprentices:</h5>              ${character.apprentices}</p>
            </div>
            <a class="wiki" href="${character.wiki}" target="_blank"><button class="wikiCard">Click for more</button></a>
          </div>
              `
    }
  
})
  } 
  
  }
  // ///////////////////////////////////////////////////////////////
  let movieCard = document.querySelector('.movieCard');
  let filmPage =Number(0)
 
  if (page === '/films.html') {
      fetch('https://swapi.dev/api/films/')
          .then(response => response.json())
          .then(data => {
              filmRenderer(data.results)
              filmRenderer2(data.results)
          })
         
 
  
  function filmRenderer(films) {
    if(filmPage == Number(0)){
      movieCard.innerHTML = '';
      films.forEach(film => {
          movieCard.innerHTML += `
          
          <div class="cardtheme2 card" style="width: 18rem;">
          <img  src="./img/${film.title}.png" class="cardtheme2 card-img-top" alt="...">
          <div class="cardtheme card-body">
            <h5 class=" card-title">${film.title}</h5>
            <h5 class=" card-title">Episode: ${film.episode_id}</h5>
            <p class="card-text">Director: ${film.director}</p>
            <a href="#" onclass="btn btn-primary">Go somewhere</a>
            <a href="#" onclick="clickCard2(${film.episode_id})" class="btn btn-primary" style="background-color:#FADE4B">Click for more </a>
            </div>
          </div>
        </div>
          `;
      });
  }
}

let clearBtn=document.querySelectorAll('.a');
clearBtn.forEach(index=>{index.addEventListener('click', function(){
  sessionStorage.clear();
  filmPage == Number(0)
  })
})

  function filmRenderer2(films){
    filmPage=Number(sessionStorage.getItem('saveCard2'))
   
    console.log(filmPage);
    
    
    films.forEach(film => {
      console.log(film.episode_id);
      if(filmPage===film.episode_id){
        movieCard.innerHTML ='' 
       

      movieCard.innerHTML += `
      
      <div class="cardtheme2 card" style="width: 18rem;">
      <img  src="./img/${film.title}.png" class="cardtheme2 card-img-top" alt="...">
      <div class="cardtheme card-body">
        <h5 class=" card-title">${film.title}</h5>
        <h5 class=" card-title">Episode: ${film.episode_id}</h5>
        <p class="card-text">Director: ${film.director}</p>
        <a href="#" onclass="btn btn-primary">Go somewhere</a>
        <a href="#" onclick="clickCard2(${film.episode_id})" class="btn btn-primary" style="background-color:#FADE4B">Click for more </a>
        </div>
      </div>
    </div>
      `;
   
  } 
  }
   )
  }
  function clickCard2(episode_id){
    filmPage = episode_id;
    sessionStorage.setItem('saveCard2', filmPage)
    location.reload()
  }
};


