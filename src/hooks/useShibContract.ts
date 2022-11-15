import { useActiveWeb3React } from './index'
import { useShibaContract } from './useContract'
import { TokenAmount } from '../constants/token'

export interface UserDateResp {
  balanceOf: TokenAmount
  subordinates: number
  rewards: TokenAmount
  inviter: string
}

export function useUserData(): UserDateResp {
  const { account } = useActiveWeb3React()
  const contract = useShibaContract()
  if (!account) throw new Error('none account')
  if (!contract) throw new Error('none contract')
  return contract['userData'](account).then((resp: UserDateResp) => {
    // const ud: UserDateResp = {
    //   balanceOf: new TokenAmount(ETHER, resp.balanceOf)
    // }
    return resp
  })
}
