/* eslint-disable no-undef */
'use strict';

const allProducts = [];

function Product(url, name) {
  this.item = name;
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

let prodImgEl = document.getElementById('product-images');
let imagesShown = 3;

let randomIndex = [];

function imageRender () {

  while (randomIndex.length < allProducts.length) {
    let imageIndex = Math.floor(Math.random() * allProducts.length);
    if (randomIndex.indexOf(imageIndex) === -1){
      randomIndex.push(imageIndex);
    }
  }

  for (let i = 0; i < imagesShown; i++) {
    let imageEl = document.createElement('img');
    let image = allProducts[randomIndex[i]];
    imageEl.setAttribute('id', image.item);
    imageEl.src = image.url;
    image.timesShown++;
    imageEl.item = image.item;
    prodImgEl.appendChild(imageEl);
  }
}

imageRender();
console.log(randomIndex);

let rounds = 25;

function handleClick(event){
  event.preventDefault();
  for (let i = 0; i < allProducts.length; i++) {
    if (event.target.id === allProducts[i].item) {
      allProducts[i].clicks++;
    }
  }

  for (let i = 0; i < imagesShown; i++){
    randomIndex.shift();
  }
  prodImgEl.innerHTML = '';

  imageRender();

  rounds--;
  console.log(rounds);
  if (rounds === 0){
    prodImgEl.removeEventListener('click', handleClick);
    alert ('You are all done.');
    document.getElementById('focusgroup').removeChild(prodImgEl);
    renderChart();
  }
}

prodImgEl.addEventListener('click', handleClick);

// let resultsEl = document.getElementById('resultsbutton');
// // let resultsList = document.getElementById('resultsList');

// // function getResults (event) {
// //   event.preventDefault();

// //   for (let i = 0; i < allProducts.length; i++){
// //     let resultsItem = document.createElement('li');
// //     resultsItem.innerText = allProducts[i].item + ' had ' + allProducts[i].clicks + ' votes, and was seen ' + allProducts[i].timesShown + ' times.';
// //     resultsList.appendChild(resultsItem);
// //   }
// // }

// resultsEl.addEventListener('click', renderChart);

function renderChart () {
  let chartEl = document.getElementById('resultschart');
  chartEl.innerHTML = '';

  let ctx = chartEl.getContext('2d');
  const label = [];
  const clickData = [];
  const showData = [];
  for (let i = 0; i < allProducts.length; i++){
    label.push(allProducts[i].item);
    clickData.push(allProducts[i].clicks);
    showData.push(allProducts[i].timesShown);
  }
  // eslint-disable-next-line no-unused-vars
  let productChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label,
      datasets:[{
        label: 'Number of Clicks',
        data: clickData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 5)',
        borderWidth: 1
      }, {
        label:'Number of Times Shown',
        data: showData,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 5)',
        borderWidth: 1
      }],
    },
    options: {
      plugins: {title: {
        display: true,
        text: 'Results',
        padding: {
          top: 10,
          bottom: 20
        },
        font: {
          size: 20
        }
      }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 6
        }
      },
    }
  });
}
