// Set of helper functions to facilitate wallet setup

export const setupNetwork = async () => {
  const provider = (window as WindowChain).ethereum;
  if (provider) {
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID ?? '280', 10) || 280;
    console.log(chainId);
    try {
      await (provider.request &&
        provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: 'zkSync Era Testnet',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              // rpcUrls: nodes,
              rpcUrls: ['https://testnet.era.zksync.dev'],
              blockExplorerUrls: ['https://goerli.explorer.zksync.io'],
            },
          ],
        }));
      return true;
    } catch (error) {
      console.error('error setupNetwork', error);
      return false;
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined");
    return false;
  }
};
