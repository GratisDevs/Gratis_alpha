import React from 'react'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {render} from 'react-dom'
 
export const renderers = {
  code: ({language, value}) => {
    return <SyntaxHighlighter style={docco} language={language} children={value} />
  }
}