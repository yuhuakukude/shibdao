import BannerImg from 'assets/images/banner.png'
import LogoImg from 'assets/images/logo.png'
import DescPic from 'assets/images/pic01.png'
import HelpIcon from 'assets/images/help-circle.png'
import { Box, Button, Stack, styled, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import Input from '../components/Input'
import { useActiveWeb3React } from '../hooks'
import { useCurrencyBalance } from '../state/wallet/hooks'
import { ETHER } from '../constants/token'
import { useAbleAddress, useClaim, useIDOData, useMint, useUserData } from '../hooks/useShibContract'
import TransactionPendingModal from 'components/Modal/TransactionModals/TransactionPendingModal'
import MessageBox from 'components/Modal/TransactionModals/MessageBox'
import TransactionSubmittedModal from '../components/Modal/TransactionModals/TransactiontionSubmittedModal'
import useModal from '../hooks/useModal'
import { shortenAddress } from '../utils'
import { useParams } from 'react-router-dom'
import { BASE_TOKEN, ZERO_ADDRESS } from '../constants'
import { tryParseAmount } from '../utils/parseAmount'
import JSBI from 'jsbi'

const Rules: string[] = [
  'IDO总量: 500万亿 SHIBDAO',
  'IDO售价: 1600亿 SHIBDAO/BNB，',
  '固定参与额度0.5BNB，1BNB，1.5BNB，2BNB',
  '必须以推荐人的推荐链接进入dapp才能参与ID推荐人必须先参与IDO才是有效推荐人',
  '推荐奖励是推荐参与额度的5%，以BNB实时发放',
  '单地址最多参与额度2BNB',
  '私募结束后可一次性领取代币',
  'IDO五天期限，未完成的全部销毁'
]

const PriceBtn = styled(Button)(({ active }: { active: boolean }) => ({
  width: 'auto',
  height: 'auto',
  fontSize: '10px',
  background: '#0084FF',
  borderRadius: '10px',
  padding: '6px 10px',
  color: '#FFFFFF',
  opacity: active ? 1 : 0.3
}))

// const PriceBtnUnable = styled(Typography)(({ theme }) => ({
//   width: 'auto',
//   height: 'auto',
//   fontSize: '10px',
//   background: '3C84FF',
//   borderRadius: '10px',
//   padding: '6px 10px',
//   color: '#FFFFFF'
// }))

export default function Content() {
  const textSizeSmall = '10px'
  const params = useParams<{ inviter: string }>()
  const { able } = useAbleAddress(params.inviter)
  const { showModal, hideModal } = useModal()
  const { account, chainId } = useActiveWeb3React()
  const bnbBalance = useCurrencyBalance(account ?? undefined, ETHER)
  const userData = useUserData()
  const { mint } = useMint()
  const { claim } = useClaim()
  const { isEnd } = useIDOData()
  const [amount, setAmount] = useState('0.5')
  const amountList = ['0.5', '1', '1.5', '2']
  console.log('userData', userData, able)
  const currencyAmount = tryParseAmount(
    JSBI.BigInt(Number(amount) * 10 * 1600000000000).toString(),
    BASE_TOKEN[chainId ?? 56]
  )
  const overflow =
    userData?.balanceOf &&
    currencyAmount &&
    JSBI.greaterThan(
      JSBI.add(JSBI.BigInt(userData.balanceOf.raw), JSBI.BigInt(currencyAmount.raw)),
      JSBI.BigInt('32000000000000000000000000000000')
    )

  const mintCallback = useCallback(async () => {
    if (!amount || !account) return
    showModal(<TransactionPendingModal />)
    mint(amount)
      .then(() => {
        hideModal()
        showModal(<TransactionSubmittedModal />)
      })
      .catch((err: any) => {
        hideModal()
        showModal(
          <MessageBox type="error">{err.error && err.error.message ? err.error.message : err?.message}</MessageBox>
        )
        console.error(err)
      })
  }, [account, amount, showModal, mint, hideModal])

  const claimCallback = useCallback(async () => {
    if (!account) return
    showModal(<TransactionPendingModal />)
    claim()
      .then(() => {
        hideModal()
        showModal(<TransactionSubmittedModal />)
      })
      .catch((err: any) => {
        hideModal()
        showModal(
          <MessageBox type="error">{err.error && err.error.message ? err.error.message : err?.message}</MessageBox>
        )
        console.error(err)
      })
  }, [account, showModal, claim, hideModal])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', background: '#FFFFFF' }}>
      <img src={BannerImg} style={{ width: '90%' }} />

      <Box
        sx={{
          width: '90%',
          background: '#E0EFFC',
          borderRadius: '15px',
          marginTop: '20px',
          padding: '16px'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img src={LogoImg} style={{ width: '24px', height: '24px' }} />
          <Typography sx={{ fontWeight: '400', fontSize: '18px', marginLeft: '16px' }}>SHIBDAO</Typography>
        </Box>
        <Typography sx={{ fontWeight: '400', fontSize: '14px', marginTop: '16px' }}>
          SHIBA INU DAO 简称SHIBDAO，由TX公链SHIB委员会联合38位地推团队
          长和300位TXSHIB铁军发起的第二生态BSC上的代币，SHIBDAO是专注于
          区块链安全范畴的加密型虚拟货币代币，起源于以太坊创始人V神当时的一
          场开源实验，当时引入的DAO概念让投资者可以自主的在社区内建议和投
          票，以民主的方式发展项目并共同进行宣传推广从而获得项目的突破性进 展，以病毒繁殖的速度进行了传播。
          未来SHIBDAO会专注于公链的安全 概念并加以审计与KYC的概念，让去中心化的区块链技术在安全的框架下
          面运行，从而获得更多投资者的青睐。
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px'
        }}
      >
        <Box>
          <Typography sx={{ fontSize: '28px', fontWeight: '400', color: '#3D3D3D' }}>IDO</Typography>
          <Typography sx={{ fontSize: '24px', fontWeight: '400', color: '#3D3D3D' }}>获得优先投资</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: '400', color: '#929292' }}>SHIBA INU DAO</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: '400', color: '#929292' }}>资本优势</Typography>
        </Box>
        <img src={DescPic} style={{ width: '50%', height: 'auto' }} />
      </Box>

      <Box
        sx={{
          width: '90%',
          padding: '16px',
          borderRadius: '10px',
          background: '#F3F3F3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px'
        }}
      >
        <Typography
          textAlign="center"
          sx={{
            padding: '7px',
            background: '#FFFFFF',
            fontSize: '20px',
            color: '#111111',
            width: '100%',
            borderRadius: '15px'
          }}
        >
          IDO结束倒计时
        </Typography>
        <Typography sx={{ fontSize: '42px', color: '#3D3D3D', fontWeight: '500', marginTop: '10px' }}>
          00:00:00
        </Typography>
        <Typography sx={{ marginTop: '10px', fontSize: '20px', color: '#3D3D3D' }}>请选择您的私募金额</Typography>
        <Stack spacing={20} direction="row" sx={{ margin: '16px 0px' }}>
          {amountList.map(value => {
            return (
              <PriceBtn
                active={value === amount}
                onClick={() => {
                  console.log('tag--')
                  setAmount(value)
                }}
                key={value}
              >
                {value}bnb
              </PriceBtn>
            )
          })}
        </Stack>
        <Stack width={'100%'} mb={10} direction={'row'} justifyContent={'space-between'}>
          <Typography fontSize={12} color={'red'}>
            {(!userData?.inviter || userData.inviter === ZERO_ADDRESS) && !able ? '推荐链接无效' : ''}
          </Typography>
          <Typography fontSize={12}>您的余额: {bnbBalance?.toSignificant()} BNB</Typography>
        </Stack>
        <Button
          disabled={((!userData?.inviter || userData.inviter === ZERO_ADDRESS) && !able) || overflow}
          onClick={mintCallback}
          sx={{ height: 'auto', fontSize: '10px' }}
        >
          购买
        </Button>
      </Box>

      <Box
        sx={{
          width: '90%',
          padding: '16px',
          borderRadius: '10px',
          background: '#DAE9F6',
          marginTop: '20px'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img src={LogoImg} style={{ width: '32px', height: '32px' }} />
          <Typography sx={{ fontSize: '24px', marginLeft: '16px' }}>规 则</Typography>
        </Box>
        <Stack spacing={10}>
          {Rules.map((rule, index) => {
            return (
              <Box key={index} sx={{ display: 'flex' }}>
                <img src={HelpIcon} style={{ width: '16px', height: '16px' }} />
                <Typography sx={{ marginLeft: '8px', fontSize: '14px' }}>{rule}</Typography>
              </Box>
            )
          })}
        </Stack>
      </Box>

      <Box
        sx={{
          background: '#DAE9F6',
          borderRadius: '15px',
          width: '90%',
          marginTop: '20px',
          padding: '16px'
        }}
      >
        <Stack
          direction="row"
          justifyContent={'space-between'}
          spacing={10}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography sx={{ fontSize: textSizeSmall }}>推荐链接：</Typography>
          <Typography>{userData?.inviter ? shortenAddress(userData.inviter, 6) : '--'}</Typography>
          <Button sx={{ width: '48px', height: 'auto', fontSize: textSizeSmall }}>复制</Button>
        </Stack>

        <Typography sx={{ marginTop: '10px' }}>已获得推荐奖励：{userData.rewards?.toFixed(2)} bnb</Typography>
        <Typography sx={{ marginTop: '10px' }}>已推荐人数：{userData.subordinates} 人</Typography>

        <Stack direction="row" spacing={10} sx={{ marginTop: '10px' }} alignItems={'center'}>
          <Typography width={140}>我的余额：</Typography>
          <Input height={30} value={userData.balanceOf?.toFixed(2).toString() ?? '0'} />
          <Button
            disabled={!isEnd || userData.balanceOf?.equalTo('0')}
            onClick={claimCallback}
            sx={{ width: 'auto', height: 'auto', fontSize: textSizeSmall }}
          >
            提币
          </Button>
        </Stack>
      </Box>

      <img src={LogoImg} style={{ marginTop: '20px', width: '36px', height: '36px' }} />
      <Typography sx={{ marginTop: '16px' }} fontWeight={400} fontSize={14} color={'#3D3D3D'}>
        2022 @Copyright All rights reserved
      </Typography>
      <Typography fontWeight={400} fontSize={14} color={'#3D3D3D'}>
        www.shibdaoToken.com
      </Typography>
    </Box>
  )
}
