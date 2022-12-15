import { Link } from 'gatsby'
import React, { useContext } from 'react'
import HamburgerIcon from '../../icons'
import { cn } from '../../../lib/helpers'
import * as styles from './header.module.css'
import { Icon } from 'semantic-ui-react'
import menuIcon from '../../../assets/menu.svg'
import IdentityContext from '../../../../identity-context'

const Header = ({
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
  onShowBack,
  onHideMenu,
  backFromTours,
  storyURL,
  fromStory,
  searchState,
}) => {
  const { user, netlifyIdentity } = useContext(IdentityContext)
  // this is only active when the location pathname is exactly
  // the same as the href.
  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: styles.active } : {}
  }
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.branding}>
          {
            //coming back from the second story page to tours page
            onShowBack && backFromTours ? (
              <Link
                to={storyURL !== null ? `/tour/${storyURL}` : '/'}
                state={{ searchState: searchState }}
              >
                <div style={{ textDecoration: 'none !important', padding: ' 0 0.5rem' }}>
                  <Icon name="chevron left" />
                </div>
              </Link>
            ) : //coming back from the tours page to first story page
            onShowBack && fromStory ? (
              <Link
                to={storyURL !== null ? `/story/${storyURL}` : '/'}
                state={{ searchState: searchState }}
              >
                <div style={{ textDecoration: 'none !important', padding: ' 0 0.5rem' }}>
                  <Icon name="chevron left" />
                </div>
              </Link>
            ) : // one level: coming back from story page or tours page to home page
            onShowBack ? (
              <Link to="/" state={{ searchState: searchState }}>
                <div style={{ textDecoration: 'none !important', padding: ' 0 0.5rem' }}>
                  <Icon name="chevron left" />
                </div>
              </Link>
            ) : null
          }
          {/* {backFromTours ? (
          <Link to={storyURL !== null ? storyURL : '/'}>
            <div style={{ textDecoration: 'none !important' }}>
              <Icon name="chevron left" />
            </div>
          </Link>
        ) : null} */}
        </div>
        {onHideMenu ? null : (
          <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
            {showNav ? (
              <Icon name="close" size="small" />
            ) : (
              <img srcSet={menuIcon} className={styles.menuIcon} alt="menuIcon" />
            )}
          </button>
        )}
        <nav className={cn(styles.nav, showNav && styles.showNav)}>
          <ul>
            {/* <li>
              <div onClick={handleDialogOpen}>{isLoggedIn ? `Log out!` : 'LOG IN/SIGN UP'}</div>
            </li> */}
            <li>
              <Link getProps={isActive} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link getProps={isActive} to="/subscription">
                Subscription
              </Link>
            </li>
            {user ? (
              <li>
                <a
                  onClick={() => {
                    netlifyIdentity.logout()
                    onHideNav()
                  }}
                >
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <a
                  onClick={() => {
                    onHideNav()
                    netlifyIdentity.open()
                  }}
                >
                  Login
                </a>
              </li>
            )}
            <li>
              <Link getProps={isActive} to="/contact/">
                Contact
              </Link>
            </li>
            {typeof window !== 'undefined' &&
            !window.matchMedia('(display-mode: standalone)').matches ? (
              <li>
                <Link getProps={isActive} to="/installapp/">
                  Install Perfect Traveller
                </Link>
              </li>
            ) : null}
          </ul>
          <div className={styles.social}>
            <a
              href="https://www.facebook.com/Perfect-Traveller-Pty-Ltd-171235276220004"
              target="_blank"
            >
              <Icon name="facebook f" circular size="large" inverted></Icon>
            </a>
            <a href="https://twitter.com/perfectraveller" target="_blank">
              <Icon name="twitter" circular size="large" inverted></Icon>
            </a>
            <a href="https://www.instagram.com/perfect.traveller/" target="_blank">
              <Icon name="instagram" circular size="large" inverted></Icon>
            </a>
            <a href="https://www.youtube.com/user/Perfectraveller/" target="_blank">
              <Icon name="youtube" circular size="large" inverted></Icon>
            </a>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Header
