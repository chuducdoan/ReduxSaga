import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery } from 'redux-saga/effects';
import { increment } from './counterSlice';

export function* log(action: PayloadAction) {
  console.log('Log', action);
}

export default function* counterSaga() {
  console.log('Counter Saga');
  // bat cu action nao duoc dispatch no se lang nghe va chay log()
  yield takeEvery(increment().type, log);
}
