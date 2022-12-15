import BaseBlockContent from '@sanity/block-content-to-react'
import React from 'react'

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
        default:
          return <p>{props.children}</p>
      }
    },
  },
}

const BlockText = ({ blocks }) => <BaseBlockContent blocks={blocks} serializers={serializers} />

export default BlockText
