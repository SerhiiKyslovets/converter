'use strict';


// Get data using fetch

// fetch('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD')
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(JSON.stringify(myJson));
//   });

var xhr = new XMLHttpRequest();
var data = {};

function initData () {
  // console.log('onLoading...');

  xhr.open('GET', 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD');
  xhr.responseType = 'text';

  xhr.onload = function () {
    data = xhr.response;
    console.log(data);
  }

  xhr.send();

}

// console.log(data);
