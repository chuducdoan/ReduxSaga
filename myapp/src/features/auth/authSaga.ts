import { call, fork, put, take } from 'redux-saga/effects';
import { LoginPayload, login, loginFailed, loginSuccess, logout } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleLogin(payload: LoginPayload) {
  try {
    console.log('handle login', payload);
    if (payload.username === 'doancd' && payload.password === '123456') {
      localStorage.setItem('access_token', '1234');
      yield put(
        loginSuccess({
          id: 1,
          name: 'abc',
        })
      );
    } else {
      yield put(loginFailed());
    }
  } catch (error: any) {
    yield put(loginFailed(error.message));
  }
}

function* handleLogout() {
  console.log('handle logout');
  localStorage.removeItem('access_token');
  // redirect to login page
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    // Nếu chưa loggin thì mới lắng nghe thằng login, ngược lại thì lắng nghe thằng logout thôi
    if (!isLoggedIn) {
      // đợi mỗi khi user dispatch một action login thì nó sẽ thwucj hiện một cái fork bên dưới
      // Khi nó đã fork login rồi thì khi bạn click thêm lần nữa vào button login thì nó cũng sẽ ko chạy vào thằng này nữa vì nó sẽ đứng đợi thằng logout đc dispatch
      const action: PayloadAction<LoginPayload> = yield take(login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take([logout.type, loginFailed.type]);
    // bản chất cách dùng call và fork giống nhau, nhưng call là blocking tức là đứng đợi làm xong ms đi tiếp, còn fork là none-blocking
    // trong TH này tại sao phải dùng call
    // vì khi fork có thể là nó chưa thực hiện clear localStorage, nó đã quay lại vòng lặp tiếp theo và check isLoggedIn
    yield call(handleLogout);
    // yield fork(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
