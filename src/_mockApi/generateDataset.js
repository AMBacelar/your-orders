const elasticlunr = require ('elasticlunr');
const faker = require('faker');
const fs = require('fs');

const CONFIRMED = 'CONFIRMED';
const AWAITING_PAYMENT = 'AWAITING_PAYMENT';
const IN_TRANSIT = 'IN_TRANSIT';
const OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY';
const FAILED_ATTEMPT = 'FAILED_ATTEMPT';
const DELIVERED = 'DELIVERED';
const EXPIRED = 'EXPIRED';
const CANCELLED = 'CANCELLED';
const PENDING = 'PENDING';

const deliveryStatusOptions = [
  // CONFIRMED,
  // AWAITING_PAYMENT,
  // IN_TRANSIT,
  // OUT_FOR_DELIVERY,
  FAILED_ATTEMPT,
  DELIVERED,
  // EXPIRED,
  // CANCELLED,
  PENDING
]

const addressOptions = [
  "1 Bridge Road, SE1 1AA, London",
  "3 Tower Avenue, W1W 2BB, London",
  "Deal Porter Way, Surrey Quays SE16 7BB",
  `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.zipCode()}, ${faker.address.country()}`
]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hydrate(count){
  let data = [];
  let step = 0;
  while (step < count) {    
    const productName = faker.commerce.productName();
    const productCode = faker.internet.password(12,false);
    const price = faker.commerce.price(5,68);
    const address = addressOptions[getRandomInt(0,addressOptions.length-1)];
    const quantity = getRandomInt(1,14);
    const date = faker.date.recent(180);
    const deliveryStatus = deliveryStatusOptions[getRandomInt(0,deliveryStatusOptions.length-1)];
    const isDelivered = deliveryStatus === DELIVERED ? true : false;
    data.push({ productName, productCode, price, totalPrice: price*quantity, address, quantity, date, deliveryStatus, isDelivered })
    step++;
  }
  return noDuplicateCodes(data) ? data : hydrate(count);
}

function noDuplicateCodes(dataset){
  let library = [];
  dataset.forEach(element => {
    const index = library.indexOf(element.productCode);
    if (index > -1) {
      return false;
    }
    library.push(element.productCode);
  });
  return true;
}

const dataSet = hydrate(1000);

fs.writeFile('./dataSet.json', JSON.stringify(dataSet, null, 2), function (err) {
  if (err) throw err;
  console.log('dataset generated');

  const index = elasticlunr(function () {
    this.setRef('productCode');
  
    this.addField('productCode');
    this.addField('productName');
    this.addField('address');
  });
  
  const questions = dataSet.map(function (q) {
    return {
      productCode: q.productCode,
      productName: q.productName,
      address: q.address,
    };
  });
  
  questions.forEach(question => {
    index.addDoc(question);
  });
  
  fs.writeFile('./searchIndex.json', JSON.stringify(index, null, 2), function (err) {
    if (err) throw err;
    console.log('text search index generated');
  });
});
