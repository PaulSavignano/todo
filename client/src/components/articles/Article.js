import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'
import Paper from 'material-ui/Paper'

import './article.css'
import articleContainer from '../../containers/articles/articleContainer'
import ArticleContent from './ArticleContent'

const Article = (props) => {
  return (
    <ArticleContent {...props} />
  )
}

Article.propTypes = {
  articleStyle: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasText: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default articleContainer(Article)
