'use strict';


// Get data using fetch

// fetch('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD')
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(JSON.stringify(myJson));
//   });


const url = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD';
let obj = {};

function load (url, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.response);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}


function showData (data) {
  obj = JSON.parse(data);
  // console.log(obj);

  if (perBTC) {
    document.getElementById('ask').innerText = obj.ask;
    document.getElementById('btc-hour-change').innerText = obj.changes.percent.hour;
    document.getElementById('btc-day-change').innerText = obj.changes.percent.day;
    document.getElementById('btc-week-change').innerText = obj.changes.percent.week;
    document.getElementById('btc-month-change').innerText = obj.changes.percent.month;

    console.log('in percent');
  } else {
    document.getElementById('ask').innerText = obj.ask;
    document.getElementById('btc-hour-change').innerText = obj.changes.price.hour;
    document.getElementById('btc-day-change').innerText = obj.changes.price.day;
    document.getElementById('btc-week-change').innerText = obj.changes.price.week;
    document.getElementById('btc-month-change').innerText = obj.changes.price.month;

    console.log('price');
  }
}


let perBTC = false;

const buttonPercentBTC = document.getElementById('per-btc');

buttonPercentBTC.onclick = function (e) {
  e.preventDefault();

  if (perBTC) {
    perBTC = false;
    load(url, showData);
  } else {
    perBTC = true;
    load(url, showData);
  }

  console.log(perBTC);
}





load(url, showData);

setInterval(function () {
    load(url, showData);
}, 1000);






// function getData (dataLink) {
//   xhr.open('GET', dataLink);
//   xhr.responseType = 'text';
//
//   xhr.onload = function () {
//     let data = {};
//     data = xhr.response;
//     console.log(data);
//   }
//
//   xhr.send();
// }
//
// getData(url);
