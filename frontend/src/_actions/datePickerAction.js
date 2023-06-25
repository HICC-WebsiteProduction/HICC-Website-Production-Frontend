import { SELECT_DATE } from './types';

export function selectDate(data) {
  return {
    type: SELECT_DATE,
    payload: data,
  };
}
