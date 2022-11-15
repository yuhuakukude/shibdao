import { useRef, useState } from 'react'
import { AppBar, Box, MenuItem, MenuList, Paper, Popper, styled, Typography } from '@mui/material'
import { routes } from 'constants/routes'
import MenuIcon from 'assets/svg/menu.svg'
import Web3Status from './Web3Status'

interface Tab {
  title: string
  route?: string
  link?: string
  titleContent?: JSX.Element
}

export const Tabs: Tab[] = [
  { title: 'IDO', route: routes.test3 },
  { title: '通知', link: 'https://google.com' },
  { title: '审计报告', link: 'https://google.com' },
  { title: '白皮书', link: 'https://google.com' },
  { title: 'English', link: 'https://google.com' }
]

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  height: theme.height.header,
  backgroundColor: theme.palette.background.paper,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: 'none',
  padding: '0 40px 0 25px!important',
  zIndex: theme.zIndex.drawer,
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  '& .link': {
    textDecoration: 'none',
    fontSize: 14,
    color: theme.palette.text.primary,
    opacity: 0.5,
    marginRight: 48,
    paddingBottom: '30px',
    borderBottom: '2px solid transparent',
    '&.active': {
      opacity: 1,
      borderColor: theme.palette.text.primary
    },
    '&:hover': {
      opacity: 1
    }
  },
  [theme.breakpoints.down('lg')]: {
    '& .link': { marginRight: 15 },
    padding: '0 24px 0 0!important'
  },
  [theme.breakpoints.down('md')]: {
    position: 'fixed'
  },
  [theme.breakpoints.down('sm')]: {
    height: theme.height.mobileHeader,
    padding: '0 20px!important'
  }
}))

const Filler = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    height: theme.height.header,
    display: 'block'
  },
  [theme.breakpoints.down('sm')]: {
    height: theme.height.mobileHeader,
    padding: '0 20px'
  }
}))

export default function Header() {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLImageElement>(null)
  const handleToggle = () => {
    setOpen(open => !open)
  }
  return (
    <>
      <Filler />
      <StyledAppBar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img ref={anchorRef} style={{ width: '24px', height: '24px' }} src={MenuIcon} onClick={handleToggle} />
          <Popper anchorEl={anchorRef.current} open={open}>
            <Paper>
              <MenuList>
                {Tabs.map((tab, index) => {
                  return <MenuItem key={index}>{tab.title}</MenuItem>
                })}
              </MenuList>
            </Paper>
          </Popper>
          <Typography sx={{ fontWeight: '400', color: '#003899', fontSize: '24px', marginLeft: '16px' }}>
            SHIBA INU DAO
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 'auto' }}>
            <Web3Status />
          </Box>
        </Box>
      </StyledAppBar>
    </>
  )
}