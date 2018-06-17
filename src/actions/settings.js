import { SET_SETTINGS } from '../actionTypes';

export function setSettings(settings){
  return{
    type: SET_SETTINGS,
    settings
  }
}