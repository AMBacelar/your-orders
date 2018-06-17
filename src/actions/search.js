import { getOrders, getOrder } from '../_mockApi/api';
import { SET_ORDERS, SET_ORDER, SET_FILTERS } from '../actionTypes';

export function fetchSingleOrder(orderId){
  return dispatch => {
    getOrder(orderId)
    .then(res => {
      dispatch(setOrder(res.data));
    })
    .catch(err => {
      console.error('err', err);
    })
  }
}

export function fetchOrders(page=1, sortBy='date', order='desc', textQuery='', settings){
  return dispatch => {
    getOrders(page, sortBy, order, textQuery, settings)
    .then(res => {
      dispatch(setOrders(res.data))
    })
    .catch(err => {
      console.error('err', err);
    })
  }
}

export function onChangeFilters(filterObject){
  return dispatch => {
    dispatch(setFilters(filterObject))
    return Promise.resolve()
  }
}

function setOrders(orders){
  return{
    type: SET_ORDERS,
    orders
  }
}

function setOrder(order){
  return{
    type: SET_ORDER,
    order
  }
}

function setFilters(filters){
  return{
    type: SET_FILTERS,
    filters
  }
}