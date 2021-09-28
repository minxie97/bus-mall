'use strict';

const allProducts = [];

function Product(url, name) {
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.url = url;
  allProducts.push(this);
}

new Product('assets/bag.jpg', 'bag');
new Product('assets/banana.jpg', 'banana');
new Product('assets/bathroom.jpg', 'bathroom');
new Product('assets/boots.jpg', 'boots');
new Product('assets/breakfast.jpg', 'breakfast');
new Product('assets/bubblegum.jpg', 'bubblegum');
new Product('assets/chair.jpg', 'chair');
new Product('assets/cthulhu.jpg', 'cthulhu');
new Product('assets/dog-duck.jpg', 'dog-duck');
new Product('assets/dragon.jpg', 'dragon');
new Product('assets/pen.jpg', 'pen');
new Product('assets/pet-sweep.jpg', 'pet-sweep');
new Product('assets/scissors.jpg', 'scissors');
new Product('assets/shark.jpg', 'shark');
new Product('assets/sweep.png', 'sweep');
new Product('assets/tauntaun.jpg', 'tauntaun');
new Product('assets/unicorn.jpg', 'unicorn');
new Product('assets/water-can.jpg', 'water-can');
new Product('assets/wine-glass.jpg', 'wine-glass');

let leftImageEl = document.getElementById('image1');
let centerImageEl = document.getElementById('image2');
let rightImageEl = document.getElementById('image3');

let randomIndex = [];

function imageRender () {

  while (randomIndex.length < allProducts.length) {
    let imageIndex = Math.floor(Math.random() * allProducts.length);
    if (randomIndex.indexOf(imageIndex) === -1){
      randomIndex.push(imageIndex);
    }
  }

  let left = allProducts[randomIndex[0]];
  let center = allProducts[randomIndex[1]];
  let right = allProducts[randomIndex[2]];

  leftImageEl.src = left.url;
  left.timesShown ++;
  leftImageEl.name = left.name;

  centerImageEl.src = center.url;
  centerImageEl.name = center.name;
  center.timesShown ++;

  rightImageEl.src = right.url;
  right.timesShown ++;
  rightImageEl.name = right.name;
}


imageRender();

let rounds = 25;

function handleClick(event){
  event.preventDefault();
  let clickedEl = event.target;

  for (let i = 0; i < allProducts.length; i++) {
    if (clickedEl.name === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }

  for (let i = 0; i < 3; i++){
    randomIndex.shift();
  }

  imageRender();

  rounds--;
  console.log(rounds);

  if (rounds === 0){
    alert ('You are all done.');
    leftImageEl.removeEventListener('click', handleClick);
    centerImageEl.removeEventListener('click', handleClick);
    rightImageEl.removeEventListener('click', handleClick);
  }
}

leftImageEl.addEventListener('click', handleClick);
centerImageEl.addEventListener('click', handleClick);
rightImageEl.addEventListener('click', handleClick);

let resultsEl = document.getElementById('resultsbutton');
let resultsList = document.getElementById('resultsList');

function getResults (event) {
  event.preventDefault();

  for (let i = 0; i < allProducts.length; i++){
    let resultsItem = document.createElement('li');
    resultsItem.innerText = allProducts[i].name + ' had ' + allProducts[i].clicks + ' votes, and was seen ' + allProducts[i].timesShown + ' times.';
    resultsList.appendChild(resultsItem);
  }
}

resultsEl.addEventListener('click', getResults);
