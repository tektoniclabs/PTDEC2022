import * as styles from './social.module.css'
import { Container } from 'semantic-ui-react'
import React from 'react'
import {
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import {
  EmailIcon,
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share'

export default function Social(props) {
  const type = props.story ? 'story' : 'tour'
  const url = `${
    typeof window !== 'undefined' ? window.location.origin : 'perfectraveller.com'
  }/${type}/${props.slug}`
  return (
    <div>
      <FacebookShareButton title={props.title} className={styles.socialBtn} url={url}>
        <FacebookIcon size={48} bgStyle={{ fill: '#fff' }} iconFillColor="black" round={true} />
      </FacebookShareButton>
      <TwitterShareButton title={props.title} className={styles.socialBtn} url={url}>
        <TwitterIcon size={48} bgStyle={{ fill: '#fff' }} iconFillColor="black" round={true} />
      </TwitterShareButton>
      <LineShareButton title={props.title} className={styles.socialBtn} url={url}>
        <LineIcon size={48} bgStyle={{ fill: '#fff' }} iconFillColor="black" round={true} />
      </LineShareButton>
      <WhatsappShareButton title={props.title} className={styles.socialBtn} url={url}>
        <WhatsappIcon size={48} bgStyle={{ fill: '#fff' }} iconFillColor="black" round={true} />
      </WhatsappShareButton>
      <EmailShareButton
        target="_blank"
        className={styles.socialBtn}
        subject={`Read ${props.title} on Perfect Traveller`}
        url={url}
        body={`Peter Kilby is an artist, writer, story-teller, journalist and avid traveller who has lived and worked in Italy since 1987. He created Perfect Traveller to bring the world of art and history closer to you. Getting off the beaten track in Italy is one of his specialties as well as making history come alive for you and his love for real Italian food has him exploring Italy’s big city’s and small villages to find the best places to enjoy the local wine and produce. View this story written by Peter on`}
      >
        <EmailIcon size={48} bgStyle={{ fill: '#fff' }} iconFillColor="black" round={true} />
      </EmailShareButton>
    </div>
  )
}
