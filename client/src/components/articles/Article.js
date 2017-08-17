import React from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card'

import articleContainer from '../../containers/articles/articleContainer'
import loadImage from '../images/loadImage'

const Article = ({
  article: {
    values: {
      textColor,
      textFontFamily,
      textFontSize,
      textFontWeight,
      textLetterSpacing,
      textTextShadow,
      titleColor,
      titleFontFamily,
      titleFontSize,
      titleFontWeight,
      titleLetterSpacing,
      titleTextShadow,
      subtitleColor,
      subtitleFontFamily,
      subtitleFontSize,
      subtitleFontWeight,
      subtitleLetterSpacing,
      subtitleTextShadow
    }
  },
  item: {
    _id,
    image,
    values: {
      title,
      subtitle,
      text,
      textAlign,
      imageFlex,
      navigation
    }
  }
}) => {
  const flexFlow = textAlign === 'right' ? 'row wrap' : 'row wrap-reverse'
  const RenderCardText = () => (
    <CardText
      style={{
        color: textColor,
        flex: `1 1 auto`,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        letterSpacing: textLetterSpacing,
        textShadow: textTextShadow,
      }}
    >
      {text}
    </CardText>
  )
  return (
    <Card
      zDepth={0}
      id={navigation}
      style={{ width: '100%'}}
    >
      {title &&
        <CardTitle
          id={_id}
          title={title}
          titleStyle={{
            color: titleColor,
            fontFamily: titleFontFamily,
            fontSize: titleFontSize,
            fontWeight: titleFontWeight,
            letterSpacing: titleLetterSpacing,
            textShadow: titleTextShadow
          }}
          subtitle={subtitle}
          subtitleStyle={{
            color: subtitleColor,
            fontFamily: subtitleFontFamily,
            fontSize: subtitleFontSize,
            fontWeight:subtitleFontWeight,
            letterSpacing: subtitleLetterSpacing,
            textShadow: subtitleTextShadow
          }}
          style={{ width: '100%' }}
        />}
      <div style={{ display: 'flex', flexFlow }}>
        {text && textAlign === 'left' &&
          <RenderCardText />
        }
        {image.src &&
          <CardMedia
            style={{ flex: imageFlex }}
          >
            <img src={image.src} alt="card"/>
          </CardMedia>
        }
        {text && textAlign === 'right' &&
          <RenderCardText />
        }
      </div>
    </Card>
  )
}

Article.propTypes = {
  item: PropTypes.object.isRequired
}

export default articleContainer(loadImage(Article))
