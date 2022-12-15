import React from 'react'
import { buildImageObj } from '../../lib/helpers'
import { imageUrlFor } from '../../lib/image-url'
import { GatsbyImage } from "gatsby-plugin-image";

import * as styles from './image.module.css'

function Image(props) {
  return (
    <div className={styles.root}>
      {props.asset && (
        // <Img
        //   fluid={props.asset.fluid}
        //   alt={props.alt}
        //   // className={styles.image}
        //   objectFit="cover"
        //   objectPosition="50% 50%"
        // />
        <div>
          <img src={imageUrlFor(buildImageObj(props)).width(1200).url()} alt={props.alt} />
          <div className={styles.caption}>{props.caption} </div>
        </div>
      )}
      {/* <imgcaption className={styles.caption}>{props.caption}</imgcaption> */}
    </div>
  )
}

export default Image
