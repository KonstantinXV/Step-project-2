let section = document.querySelector('section');
let select = document.querySelector('.selectcharacter');
let inputName = document.querySelector('#inputname');
let individual = document.querySelector('.individualCard')
let individImgDiv =document.querySelector('.individ-img-div')
let individImg = document.querySelector

let apiUrl = 'https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json';
let apiResponse = []; // სრული API შეყვანილია მასივში


// 1 API დაკავშირება<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    apiResponse = data;
    htmlRenderer();
  });


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
        <a href="./individual.html"class="btn btn-primary" style="background-color:#FADE4B">Click for more</a>
      </div>
    </div>`
    return char
}


// 4 ღილაკები რომელზეც მოქმედების შედეგად გაიშვება სტარტ ფუნქცია<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
select.addEventListener('change', start);
inputName.addEventListener('input', start);

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// function individual(character) {
//     let individ= `<div class="individ-img-div">
//     <img class="individ-img" src="${character.image}" alt="" />
//     <h3 class="individ-name">${character.name}</h3>
//   </div>
//       `
//       return individ
//   }

individStart()
  function individStart(){
    
        apiResponse.forEach(character => {
        individual.innerHTML+=`<div class="individ-img-div">
        //     <img class="individ-img" src="${character.image}" alt="" />
        //     <h3 class="individ-name">${character.name}</h3>
        //   </div>
        //       `
    }) }
    
  