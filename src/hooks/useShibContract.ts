import { useActiveWeb3React } from './index'
import { useShibaContract } from './useContract'
import { CurrencyAmount } from '../constants/token'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useCallback, useMemo } from 'react'
import JSBI from 'jsbi'
import { tryParseAmount } from '../utils/parseAmount'
import { calculateGasMargin, isAddress } from '../utils'
import { TransactionResponse } from '@ethersproject/providers'
import { BASE_TOKEN, FIRST_ADDRESS, ZERO_ADDRESS } from '../constants'
import { useSingleCallResult } from '../state/multicall/hooks'

export interface UserDateResp {
  balanceOf: CurrencyAmount | undefined
  subordinates: string
  rewards: CurrencyAmount | undefined
  inviter: string
}

export function useUserData(): UserDateResp {
  const { account } = useActiveWeb3React()
  const contract = useShibaContract()
  if (!account) throw new Error('none account')
  if (!contract) throw new Error('none contract')
  const userDataRes = useSingleCallResult(contract, 'userData', [account ?? undefined])
  const result = userDataRes?.result
  return {
    balanceOf: result ? CurrencyAmount.ether(userDataRes.result.balanceOf.toString()) : undefined,
    subordinates: result ? userDataRes.result.subordinates.toString() : '--',
    rewards: result ? CurrencyAmount.ether(userDataRes.result.rewards.toString()) : undefined,
    inviter: result ? userDataRes.result.inviter : ZERO_ADDRESS
  }
}

export function useAbleAddress(address: string | undefined) {
  const contract = useShibaContract()
  const inputs = [address && isAddress(address) ? address : undefined]
  const userRes = useSingleCallResult(contract, 'userData', inputs)
  return useMemo(() => {
    if (isAddress(FIRST_ADDRESS) === isAddress(address)) {
      return { ableAddress: true }
    }
    return {
      able: userRes?.result ? userRes.result.balanceOf.toString() !== '0' : false
    }
  }, [address, userRes.result])
}

export function useIDOData() {
  const contract = useShibaContract()
  if (!contract) throw new Error('none contract')
  const isEndRes = useSingleCallResult(contract, 'isEnds')
  const result = isEndRes?.result
  return {
    isEnd: result ? result?.[0] : false
  }
}

export function useMint() {
  const { chainId } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const contract = useShibaContract()
  const { account } = useActiveWeb3React()
  const mint = useCallback(
    async (amount: string) => {
      const currencyAmount = tryParseAmount(amount, BASE_TOKEN[chainId ?? 56])
      if (!account) throw new Error('none account')
      if (!contract) throw new Error('none contract')
      if (!currencyAmount) throw new Error('none amount')
      if (currencyAmount.equalTo(JSBI.BigInt('0'))) throw new Error('amount is un support')
      const args = [FIRST_ADDRESS]
      const method = 'buy'
      console.log('🚀 ~ file: useBuyBong.ts ~ line 18 ~ args', args, method)
      return contract.estimateGas[method](...args, { from: account, value: currencyAmount.raw.toString() }).then(
        estimatedGasLimit => {
          return contract[method](...args, {
            gasLimit: calculateGasMargin(estimatedGasLimit),
            value: currencyAmount.raw.toString(),
            from: account
          }).then((response: TransactionResponse) => {
            addTransaction(response, {
              summary: `Buy ${currencyAmount
                .multiply(JSBI.BigInt('5'))
                .toSignificant(4, { groupSeparator: ',' })
                .toString()}  RAM with ${currencyAmount.toSignificant()} USDT`
            })
            return response.hash
          })
        }
      )
    },
    [account, addTransaction, contract]
  )

  return {
    mint
  }
}

export function useClaim() {
  const addTransaction = useTransactionAdder()
  const contract = useShibaContract()
  const { account } = useActiveWeb3React()
  const claim = useCallback(async () => {
    if (!account) throw new Error('none account')
    if (!contract) throw new Error('none contract')
    const method = 'claim'
    console.log('🚀 ~ file: useBuyBong.ts ~ line 18 ~ args', method)
    return contract.estimateGas[method]({ from: account }).then(estimatedGasLimit => {
      return contract[method]({
        gasLimit: calculateGasMargin(estimatedGasLimit),
        from: account
      }).then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `领取`
        })
        return response.hash
      })
    })
  }, [account, addTransaction, contract])

  return {
    claim
  }
}
