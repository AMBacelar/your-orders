import * as dataSet from './dataSet.json'
import * as indexedDataSet from './searchIndex.json'
import elasticlunr from 'elasticlunr';
import { orderBy, findIndex } from 'lodash';

const LIMIT = 10;

function filterMonthOlds(dataset){
  return dataset.filter(a => {
    const d = new Date();
    const b = new Date(a.date);
    d.setMonth(d.getMonth() - 1);
    return d < b;
  });  
}

// no search text
export function getOrders(page, sortBy, order, textQuery, settings){
  return new Promise((resolve, reject) => {
    if (!textQuery){
      let data = orderBy(dataSet, sortBy, order);
      if (!settings.showOlderThanMonth) data = filterMonthOlds(data);
      resolve({data: { total: data.length, limit: LIMIT, page, results: data.slice((page-1)*LIMIT, page*LIMIT)}})
    } else {
      const index = elasticlunr.Index.load(indexedDataSet);
      const results = index.search(textQuery, {});
      let _data = [];
      results.forEach(element => {
        let index = -1;
        index = findIndex(dataSet, {productCode: element.ref});
        index > -1 && _data.push(dataSet[index]);
      })
      let data = orderBy(_data, sortBy, order);
      if (!settings.showOlderThanMonth) data = filterMonthOlds(data);
      resolve({data: { total: data.length, limit: LIMIT, page, results: data.slice((page-1)*LIMIT, page*LIMIT)}})
    }
  })  
}

export function getOrder(orderId) {
  return new Promise((resolve, reject) => {
    const index = findIndex(dataSet, {productCode: orderId});
    if (index > -1) {
      resolve({data: dataSet[index]});
    } else {
      reject({status: 404, err: '404 - order id not found'});
    }
  })
}