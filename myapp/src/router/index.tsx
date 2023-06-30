import { Redirect, Route, useHistory } from 'react-router-dom';

export const PublicRoute = ({ component: Component, ...rest }: any) => {
  return <Route {...rest} render={(props: any) => <Component {...props} />} />;
};

export const PrivateRoute = () => {
  return <div>abc</div>;
};
