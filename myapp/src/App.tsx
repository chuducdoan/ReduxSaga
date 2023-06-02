import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Button, Input } from 'antd';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ConnectorNames } from 'constants/data';
import { connectorsByName } from 'utils/web3React';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import { setupNetwork } from 'utils/wallet';

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
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Input type="number" onKeyDown={(evt) => evt.which === 229 && evt.preventDefault()} />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
      <Button onClick={choseWallet}>Connect Wallet</Button>
      <Button onClick={handleOnLogout}>Logout</Button>
    </div>
  );
}

export default App;
