import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs'
 
export const renderers = {
  code: ({language, value}) => {
    return <SyntaxHighlighter style={docco} language={language} children={value} />
  }
}