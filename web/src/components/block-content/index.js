import BaseBlockContent from '@sanity/block-content-to-react'
import React from 'react'
import Image from './image'
import Slideshow from './slideshow'

const serializers = {
  marks: {
    link: ({ mark, children }) => {
      const { blank, href } = mark
      return blank ? (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      )
    },
  },
  types: {
    block(props) {
      switch (props.node.style) {
        case 'h1':
          return <h1>{props.children}</h1>

        case 'h2':
          return <h2>{props.children}</h2>

        case 'h3':
          return <h3>{props.children}</h3>

        case 'h4':
          return <h4>{props.children}</h4>

        case 'blockquote':
          return <blockquote>{props.children}</blockquote>

        default:
          return <p>{props.children}</p>
      }
    },
    betterImage(props) {
      return <Image {...props.node} />
    },
    slideshow(props) {
      return <Slideshow {...props.node} />
    },
  },
}

const BlockContent = ({ blocks }) => <BaseBlockContent blocks={blocks} serializers={serializers} />

export default BlockContent
