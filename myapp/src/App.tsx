import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { PrivateRoute, PublicRoute } from 'router';
import { lazy, useEffect } from 'react';
import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';
import { useAppDispatch } from 'app/hooks';
import { logout } from 'features/auth/authSlice';

const connectorLocalStorageKey = 'connectorId';
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const AdminLayout = lazy(() => import('./components/Layout/AdminLayout'));

function App() {
  // const [name, setName] = useState('');
  // const { activate, deactivate } = useWeb3React();
  // const { account } = useWeb3React();

  // const choseWallet = () => {
  //   login(ConnectorNames.Injected);
  //   localStorage.setItem(connectorLocalStorageKey, ConnectorNames.Injected);
  // };

  // const login = useCallback((connectorId: ConnectorNames) => {
  //   const connector = connectorsByName[connectorId];
  //   if (connector) {
  //     activate(connector, async (error: Error) => {
  //       if (error instanceof UnsupportedChainIdError) {
  //         console.log('connect success 2');
  //         const hasSetup = await setupNetwork();
  //         if (hasSetup) {
  //           activate(connector);
  //         }
  //       } else {
  //         console.log('connect fail2');
  //         if (error instanceof NoEthereumProviderError) {
  //           console.log('No provider was found');
  //         } else if (
  //           error instanceof UserRejectedRequestErrorInjected ||
  //           error instanceof UserRejectedRequestErrorWalletConnect
  //         ) {
  //           if (connector instanceof WalletConnectConnector) {
  //             const walletConnector = connector as WalletConnectConnector;
  //             // walletConnector.walletConnectProvider = null;
  //           }
  //         } else {
  //           console.log(error.name, error.message);
  //         }
  //       }
  //     });
  //   } else {
  //     console.log('connect fail');
  //   }
  // }, []);

  // const handleOnLogout = () => {
  //   console.log('log out');
  //   deactivate();
  //   localStorage.removeItem(connectorLocalStorageKey);
  // };
  const dispatch = useAppDispatch();

  useEffect(() => {
    cityApi.getAll().then((res) => console.log(res));
    studentApi.getAll({ _limit: 5, _page: 1 }).then((res) => console.log(res));
  }, []);

  return (
    <div className="App">
      <button onClick={() => dispatch(logout())}>Logout</button>
      <Router forceRefresh>
        <PublicRoute exact component={Login} path="/login" />

        {/* Không dùng exact vi dung cac route con nữa như /admin/dashboad */}
        <PrivateRoute component={AdminLayout} path="/admin" />
      </Router>
    </div>
  );
}

export default App;
