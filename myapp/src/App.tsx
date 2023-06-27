import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import { Button } from 'antd';
import { ConnectorNames } from 'constants/data';
import { useCallback, useState } from 'react';
import { setupNetwork } from 'utils/wallet';
import { connectorsByName } from 'utils/web3React';
import './App.css';

const connectorLocalStorageKey = 'connectorId';

function App() {
  const [name, setName] = useState('');
  const { activate, deactivate } = useWeb3React();
  const { account } = useWeb3React();

  const choseWallet = () => {
    login(ConnectorNames.Injected);
    localStorage.setItem(connectorLocalStorageKey, ConnectorNames.Injected);
  };

  const login = useCallback((connectorId: ConnectorNames) => {
    const connector = connectorsByName[connectorId];
    if (connector) {
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          console.log('connect success 2');
          const hasSetup = await setupNetwork();
          if (hasSetup) {
            activate(connector);
          }
        } else {
          console.log('connect fail2');
          if (error instanceof NoEthereumProviderError) {
            console.log('No provider was found');
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector as WalletConnectConnector;
              // walletConnector.walletConnectProvider = null;
            }
          } else {
            console.log(error.name, error.message);
          }
        }
      });
    } else {
      console.log('connect fail');
    }
  }, []);

  const handleOnLogout = () => {
    console.log('log out');
    deactivate();
    localStorage.removeItem(connectorLocalStorageKey);
  };

  console.log(account);

  return (
    <div className="App">
      <Button onClick={choseWallet}>Connect Wallet</Button>
      <Button onClick={handleOnLogout}>Logout</Button>
      <div style={{ height: '1200px' }}></div>
    </div>
  );
}

export default App;
