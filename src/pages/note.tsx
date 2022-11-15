import BannerImg from '../assets/images/banner.png'
import { Box, Typography } from '@mui/material'
import LogoImg from '../assets/images/logo.png'

export default function Note() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        background: '#FFFFFF',
        paddingBottom: 30
      }}
    >
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
          <Typography sx={{ fontWeight: '400', fontSize: 24, marginLeft: '16px' }}>通知</Typography>
        </Box>
        <Typography sx={{ fontWeight: '400', fontSize: 20, marginTop: '16px' }}>
          凡参与预售的一人仅限一份额度，最多2BNB，需要进电报，给预售地址发给审核，否则预售结束领取不了代币，预售如提前结束，24小时内上线，严禁一人参与多份，感谢配合！
        </Typography>
        <Typography mt={30} textAlign={'right'}>
          SHIB委员会宣
        </Typography>
      </Box>
    </Box>
  )
}
