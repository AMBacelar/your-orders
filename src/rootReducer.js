import { combineReducers } from 'redux';
import orders from './reducers/orders';
import order from './reducers/order';
import filters from './reducers/filters';
import settings from './reducers/settings';

export default combineReducers({
  orders,
  order,
  filters,
  settings,
});