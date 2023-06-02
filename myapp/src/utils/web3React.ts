import { ConnectorNames } from 'constants/data';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: new InjectedConnector({
    supportedChainIds: [parseInt(process.env.REACT_APP_CHAIN_ID as string) || 56],
  }),
  [ConnectorNames.WalletConnect]: new WalletConnectConnector({ supportedChainIds: [56] }),
};
