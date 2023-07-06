/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import * as S from './styles';
import { Button, Form, Input } from 'antd';
import { setUser } from 'features/user/userSlice';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { login } from 'features/auth/authSlice';

const Login = () => {
  const [form] = Form.useForm();
  const { userInfor } = useSelector((state: any) => state.user);
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onFinish = (values: any) => {
    dispatch(
      setUser({
        payload: values,
      })
    );
    history.push('/admin');
  };

  useEffect(() => {
    if (userInfor) {
      history.replace('/admin');
    }
  }, [userInfor]);

  const handleLoginClick = () => {
    dispatch(
      login({
        username: form.getFieldValue('userName'),
        password: form.getFieldValue('password'),
      })
    );
  };

  return (
    <S.Container>
      <S.Inner>
        <S.Title>Login Page</S.Title>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="userName">
            <Input />
          </Form.Item>
          <Form.Item name="password">
            <Input type="password" />
          </Form.Item>
          <Button htmlType="button" block onClick={handleLoginClick}>
            Login
          </Button>
        </Form>
      </S.Inner>
    </S.Container>
  );
};

export default Login;
