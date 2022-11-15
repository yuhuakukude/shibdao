import { Box, useTheme, Button } from '@mui/material'
import { ReactComponent as Telegram } from 'assets/socialLinksIcon/telegram.svg'
import { ExternalLink } from 'theme/components'

export default function Footer() {
  const theme = useTheme()

  return (
    <footer
      style={{
        height: theme.height.footer
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        width="100%"
        padding="9px 60px 28px"
        gap="40px"
        sx={{
          '& svg': {
            fill: theme => theme.palette.primary.main
          }
        }}
      >
        <Button variant="text">
          <ExternalLink href="https://s65535.com/SHIBDAO988">
            <Telegram />
          </ExternalLink>
        </Button>
      </Box>
    </footer>
  )
}
