import { Web3ReactProvider } from '@web3-react/core';
import { store } from 'app/store';
import { Provider } from 'react-redux';
import Web3 from 'web3';

export const getLibrary = (provider: any): Web3 => {
  return provider;
};

const Providers = ({ children }: any) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>{children}</Provider>
    </Web3ReactProvider>
  );
};

export default Providers;
