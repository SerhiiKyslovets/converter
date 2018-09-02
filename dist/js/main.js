'use strict';

let currentCurrency = 'USD';

// Load data
function load (currency, crypto, callback) {
  const xhr = new XMLHttpRequest();
  const base = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';

  let url = base + crypto + currency;

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.response, crypto, currency);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}

// Show data
function showData (data, crypto, currency) {
  let obj = JSON.parse(data);
  let cryptoPrefix = crypto.toLowerCase();
  const percentChar = '%';
  let currencyChar = '';
  let priceElement = document.getElementById(cryptoPrefix + '-ask');
  let per = false;

  switch (currency) {
    case 'USD': currencyChar = '$'; break;
    case 'EUR': currencyChar = '€'; break;
    case 'RUB': currencyChar = '₽'; break;
    case 'GBP': currencyChar = '£'; break;
    default: currencyChar = '?';
  }

  switch (crypto) {
    case 'ETH': per = perETH; break;
    case 'LTC': per = perLTC; break;
    case 'BTC': per = perBTC; break;
    default: per = false;
  }

  const rootPrefixes = [
    '-hour-change',
    '-day-change',
    '-week-change',
    '-month-change'
  ];

  let values = [
    obj.changes.price.hour,
    obj.changes.price.day,
    obj.changes.price.week,
    obj.changes.price.month
  ];

  let percentValues = [
    obj.changes.percent.hour,
    obj.changes.percent.day,
    obj.changes.percent.week,
    obj.changes.percent.month
  ];

  if (per) {
    priceElement.innerText = currencyChar + obj.ask.toFixed(2);
    for (let i=0; i <=3; i++) {
      writeData(cryptoPrefix, rootPrefixes[i], percentValues[i], percentChar);
    }
  } else {
    priceElement.innerText = currencyChar + obj.ask.toFixed(2);
    for (let i=0; i <=3; i++) {
      writeData(cryptoPrefix, rootPrefixes[i], values[i], currencyChar);
    }
  }
}

// Write data
function writeData (cryptoPrefix, rootPrefix, elementValue, char) {
  let element = document.getElementById(cryptoPrefix + rootPrefix);
  let value = elementValue;

  if (value < 0) {
    element.classList.add('red-text');
    element.innerText = Math.round(value) + char;
  } else {
    element.innerText = '+' + Math.round(value) + char;
  }
}


let perETH = false;
let perLTC = false;
let perBTC = false;

const buttonPercentETH = document.getElementById('per-eth-btn');
const buttonPercentLTC = document.getElementById('per-ltc-btn');
const buttonPercentBTC = document.getElementById('per-btc-btn');

buttonPercentETH.onclick = function () {
  if (perETH) {
    perETH = false;
    load(currentCurrency, 'ETH', showData);
  } else {
    perETH = true;
    load(currentCurrency, 'ETH', showData);
  }
}

buttonPercentLTC.onclick = function () {
  if (perLTC) {
    perLTC = false;
    load(currentCurrency, 'LTC', showData);
  } else {
    perLTC = true;
    load(currentCurrency, 'LTC', showData);
  }
}

buttonPercentBTC.onclick = function () {
  if (perBTC) {
    perBTC = false;
    load(currentCurrency, 'BTC', showData);
  } else {
    perBTC = true;
    load(currentCurrency, 'BTC', showData);
  }
}

// Update Data
function updateData (currentCurrency) {
  load(currentCurrency, 'ETH', showData);
  load(currentCurrency, 'LTC', showData);
  load(currentCurrency, 'BTC', showData);
}

const currencyLabel = document.getElementById('currencyLabel');
const currencyBlock = document.getElementById('currencyBlock');
const currencyList = document.getElementsByClassName('cur-itm');

// Open and close dropdown
currencyLabel.onclick = function () {
  currencyBlock.classList.toggle('active');
}

// Add event listener to currency list
for (let i = 0; i <= currencyList.length - 1; i++) {
  currencyList[i].onclick = function () {
    let buf = currentCurrency;


    currentCurrency = this.innerText;
    currencyLabel.innerText = this.innerText;
    this.innerText = buf;
    currencyBlock.classList.toggle('active');

    updateData(currentCurrency);
  }
}

// Init data
load(currentCurrency, 'ETH', showData);
load(currentCurrency, 'LTC', showData);
load(currentCurrency, 'BTC', showData);
