import React from 'react'
import { ethers } from 'ethers'

export const connectMetamask = async () => {
  const chainId = process.env.REACT_APP_CHAIN_ID;

  if (window.ethereum) {
    try {
      const currentChain = await window.ethereum.request({
        method: 'eth_chainId',
      })
      const addressArr = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (parseInt(currentChain, 16) == chainId) {
        return { event: 'connected', response: addressArr[0] }
      } else {
        console.log(currentChain, chainId)
        console.log('plz switch your network!')
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId: chainId}]
        })
        
        const addressArr = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        
        return { event: 'connected', response: addressArr[0] }
        // return { event: 'Wrong Chain', response: currentChain }
      }
    } catch (err) {
      console.log(err.message)
    }
  } else {
    console.log('plz install metamask on your browser')
    return { event: 'No Wallet', response: 'plz install metamask on your browser'}
  }
}
