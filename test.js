let section = document.querySelector('section');
let select = document.querySelector('select');
let inputName = document.querySelector('#inputname');

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
    <div class="text-bg-warning p-3" style="width: 18rem">
      <img src="${character.image}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h4 class="card-title">${character.name}</h4>
        <h6 class="card-text">Race: ${character.species}</h6>
        <h6 class="card-text">Homeworld: ${character.homeworld}</h6>
        <h6 class="card-text" style="color: red">Masters: ${character.masters}</h6>
        <p class="card-text">${character.affiliations[0]}</p>
        <a href="${character.wiki}" target="_blank" class="btn btn-primary">Click for more</a>
      </div>
    </div>`
    return char
}


// 4 ღილაკები რომელზეც მოქმედების შედეგად გაიშვება სტარტ ფუნქცია<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
select.addEventListener('change', start);
inputName.addEventListener('input', start);





<!-- Data binding ინფორმაციის მიმოცვლას

            one way binding ინფორმაციის ცალმხრივი გაცვლა (ინტერპოლაცია)
            property binding 
            event binding 
            two way binding -->


<h1>{{firstName}}</h1>

<!-- <img [src]="imgUrl" alt="Random Photo"> -->

<button (click)="textLogger()" class="btn btn-success">Click</button>

<br>
<label>Enter Text</label>
<input [(ngModel)]="inputText" type="text" class="form-control">

<h1>{{inputText}}</h1>




import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular3';

  public firstName:String = "Sandro";

  public imgUrl:String = "https://images.unsplash.com/photo-1566275529824-cca6d008f3da?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvdG98ZW58MHx8MHx8fDA%3D";



  textLogger() {
    console.log("btn was clicked");
    
  }


  public inputText!:String

}