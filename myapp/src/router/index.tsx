import { useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';

export const PublicRoute = ({ component: Component, ...rest }: any) => {
  return <Route {...rest} render={(props: any) => <Component {...props} />} />;
};

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { userInfor } = useSelector((state: any) => state.user);

  return (
    <Route
      {...rest}
      render={(props: any) => (userInfor ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};
