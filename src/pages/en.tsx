import BannerImg from '../assets/images/banner.png'
import { Box, Typography } from '@mui/material'
import LogoImg from '../assets/images/logo.png'

export default function En() {
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
          <Typography sx={{ fontWeight: '400', fontSize: 24, marginLeft: '16px' }}>SHIBDAO</Typography>
        </Box>
        <Typography sx={{ fontWeight: '400', fontSize: 14, marginTop: '16px' }}>
          💎 SHIBDAO create a metaverse 💎
        </Typography>
        <Typography sx={{ fontWeight: '400', fontSize: 14, marginTop: '16px' }}>
          🚩 Let global enthusiasm become a trend 🚩
        </Typography>
        <Typography sx={{ fontWeight: '400', fontSize: 12, marginTop: '16px' }}>
          SHIBDAO is an aggregated public platform that integrates IDO+NFT+GameFi and the metaverse, including a public
          and transparent decentralized platform, committed to becoming the top 10 market-cap cryptocurrencies in the
          metaverse series!
        </Typography>
        <Typography sx={{ fontWeight: '400', fontSize: 14, marginTop: '16px' }}>【SHIBDAO Introduction】</Typography>
        <Typography sx={{ fontWeight: '400', fontSize: 12, marginTop: '16px' }}>
          SHIBDAO: The Metaverse metaverse will be the pinnacle of SHIB history as a community, showcasing Dogecoin and
          Shiba Inu family innovation and solidarity by combining the place where the global crypto community truly
          calls home. We worked with the world top teams to provide the strongest fusion of DAO concept metaverse art,
          and 🚀 crypto rockets represent a system of belief in asset prices that are so fascinating and vibrant that it
          can only fly to new horizons. It is basically just another way of saying it is going to the moon. It refers to
          a higher state of faith and optimism about the future of SHIBDAO for the global community. The foundation of
          SHIB has always been community. We love that our community is strong and the belief that seeing SHIBDAO rise
          and reach new heights comes with great passion and a true belief system.
        </Typography>
        <Typography sx={{ fontWeight: '400', fontSize: 14, marginTop: '16px' }}>【About SHIBDAO】</Typography>
        <Typography sx={{ fontWeight: '400', fontSize: 12, marginTop: '16px' }}>
          SHIB IS A FRIENDLY, ALERT AND BOLD DOG. It is strong-willed, confident, usually has its own ideas about things
          and never shies away from creativity. ALTHOUGH SHIB IS LOYAL AND AFFECTIONATE TO HIS FAMILY, HIS YOUNGER
          BROTHER OFTEN JOINS THE METAVERSE SPACE OUT OF NOWHERE SHIBDAO is primarily about collecting a fusion of the
          terms meta and universe that represent a shared virtual space that constitutes a perceptual virtual reality
          setting. In the metaverse, the possibilities seem endless, but cover one of the strongest communities ever
          seen in crypto history The SHIBDAO community will be a huge environment for #ShibArmy to grow, share, and
          benefit together. Growing up as a community community of the SHIBDAO ecosystem actually showcases visuals
          beyond the metaverse, showcasing our innovation and unity, and a place to truly call home. SHIBDAO is SHIB
          metaverse creator to treat cryptocurrency investors, like SHIB to build a real metaverse ecological series of
          coins, let everything start from 0, this is a brand new social experiment, in order to solve this problem, we
          will cooperate with SP audit to complete kyc and contract audits to guarantee the trust of the community!
          Already in conjunction with ERC Chain Shiba Inu Community TX Male Chain Shiba Inu Community and the Dogecoin
          community and the global community of Animalcoin enthusiasts It will be released on the BSC chain soon, so
          stay tuned
        </Typography>
        <Typography sx={{ fontWeight: '400', fontSize: 14, marginTop: '16px' }}>【SHIBDAO Background】</Typography>
        <Typography sx={{ fontWeight: '400', fontSize: 12, marginTop: '16px' }}>
          The SHIBDAO team brings together distinguished and experienced members in the financial sector and blockchain
          technology. Founded in 2019, the SHIBDAO team covers multiple cutting-edge tracks in blockchain, and is
          passionate about Dogecoin and crypto world fund investment. At the same time, we have a team of top digital
          asset investment experts from Wall Street, most of whom have been focusing on digital asset investing since
          the introduction of Bitcoin in 2009, and there are countless success stories. ROI is thousands of times
          higher. The SHIBDAO team focuses on global assets and innovative asset classes with superior returns. Not only
          has our team had great success in the SHIB community cryptocurrency market, but we have also worked with top
          financial talent on Wall Street.
        </Typography>
      </Box>
    </Box>
  )
}
