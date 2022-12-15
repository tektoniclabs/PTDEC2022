import React from 'react'
import Header from '../header/header'
import '../../../styles/layout.css'
import * as styles from './layout.module.css'
import 'semantic-ui-less/semantic.less'
import { Link } from 'gatsby'
const Layout = ({
  children,
  companyInfo,
  onHideNav,
  onShowNav,
  onHideMenu,
  showNav,
  storyURL,
  onShowBack,
  fromStory,
  backFromTours,
  siteTitle,
  buildTime,
  searchState,
}) => (
  <>
    <Header
      siteTitle={siteTitle}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      onShowBack={onShowBack}
      storyURL={storyURL}
      fromStory={fromStory}
      backFromTours={backFromTours}
      onHideMenu={onHideMenu}
      showNav={showNav}
      searchState={searchState}
    />
    {/* <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} /> */}
    <div className={styles.content}>{children}</div>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        {/* <div className={styles.companyAddress}>
          {companyInfo && (
            <div>
              {companyInfo.name}
              <br />
              {companyInfo.address1}
              <br />
              {companyInfo.address2 && (
                <span>
                  {companyInfo.address2}
                  <br />
                </span>
              )}
              {companyInfo.zipCode} {companyInfo.city}
              {companyInfo.country && <span> {companyInfo.country}</span>}
            </div>
          )}
        </div> */}

        <div className={styles.siteInfo}>
          <div className={styles.install}>
            {typeof window !== 'undefined' &&
            !window.matchMedia('(display-mode: standalone)').matches &&
            window.location.pathname !== '/installapp/' &&
            window.location.pathname !== '/installapp' ? (
              <Link to="/installapp">
                <div className={styles.installBtn}> Install as an app </div>
              </Link>
            ) : null}
            <br></br>V 1.7.1 Updated on {buildTime} from{' '}
            {process.env.GATSBY_SANITY_DATASET === 'dev' ? 'DEVELOPMENT' : 'LIVE'} datasource
            <br></br>
          </div>
          <Link to="/privacy">Privacy Policy</Link> - <Link to="/terms">Terms & Conditions</Link>
          <br />© {new Date().getFullYear()}, {companyInfo && companyInfo.name}. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  </>
)

export default Layout
