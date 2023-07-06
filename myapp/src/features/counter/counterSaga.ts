import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeEvery } from 'redux-saga/effects';
import { increment, incrementSaga, incrementSagaSucess } from './counterSlice';

export function* log(action: PayloadAction) {
  console.log('Log', action);
}

export function* handleIncreamentSaga(action: PayloadAction<number>) {
  console.log('handle increment saga', action.payload);

  //wait 2s
  yield delay(1000);

  // sau do dispatch action success
  yield put(incrementSagaSucess(action.payload));
}

export default function* counterSaga() {
  console.log('Counter Saga', incrementSaga.toString());
  // bat cu action nao duoc dispatch no se lang nghe va chay log()
  yield takeEvery(incrementSaga.toString(), handleIncreamentSaga);
}
