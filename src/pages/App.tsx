import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { styled } from '@mui/material'
import Header from '../components/Header'
import Polling from '../components/essential/Polling'
import Popups from '../components/essential/Popups'
import Web3ReactManager from '../components/essential/Web3ReactManager'
import { ModalProvider } from 'context/ModalContext'
import Footer from 'components/Footer'
import Content from './content'
import En from './en'
import Note from './note'
import Report from './report'
import ComingSoon from './ComingSoon'

const AppWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  overflowX: 'hidden',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: '100vh'
  }
}))

const ContentWrapper = styled('div')({
  width: '100%',
  maxHeight: '100vh',
  overflow: 'auto',
  alignItems: 'center'
})

const BodyWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: `calc(100vh - ${theme.height.header} - ${theme.height.footer})`,
  padding: '50px 0 30px',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    minHeight: `calc(100vh - ${theme.height.header} - ${theme.height.mobileHeader})`,
    paddingTop: 20
  }
}))

export default function App() {
  return (
    <Suspense fallback={null}>
      <ModalProvider>
        <AppWrapper id="app">
          <ContentWrapper>
            <Header />
            <BodyWrapper id="body">
              <Popups />
              <Polling />
              <Web3ReactManager>
                <Routes>
                  <Route path="/:inviter" element={<Content />} />
                  <Route path="/note" element={<Note />} />
                  <Route path="/english" element={<En />} />
                  <Route path="/whitepage" element={<ComingSoon />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/" element={<Content />} />
                </Routes>
              </Web3ReactManager>
            </BodyWrapper>
            <Footer />
          </ContentWrapper>
        </AppWrapper>
      </ModalProvider>{' '}
    </Suspense>
  )
}
