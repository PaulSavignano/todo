import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'

import './Footer.css'
import footerContainer from '../../containers/footer/footerContainer'
import Media from '../media/Media'
import loadImage from '../images/loadImage'

const Footer = ({
  business: {
    values: {
      name,
      license,
      phone,
      email,
      street,
      city,
      state,
      zip,
      facebook,
      github,
      google,
      instagram,
      linkedin,
      twitter,
      yelp,
      youtube
    }
  },
  item: {
    image,
    values: {
      backgroundColor,
      borderTop,
      borderBottom,
      color,
      imageBorderRadius,
      imageElevation,
      imageMargin,
    }
  },
  primary1Color
}) => (
  <footer style={{ backgroundColor, borderBottom, borderTop }}>
    <Paper style={{ backgroundColor, color }}>
      <div style={{ textAlign: 'center', paddingTop: 32 }}>
        <div className="social-media">
          { facebook && <a href={facebook}><FontIcon className="fa fa-facebook-square" style={{ color: 'inherit' }} /></a> }
          { github && <a href={github}><FontIcon className="fa fa-github-square" style={{ color: 'inherit' }} /></a> }
          { google && <a href={google}><FontIcon className="fa fa-google-plus-square" style={{ color: 'inherit' }} /></a> }
          { instagram && <a href={instagram}><FontIcon className="fa fa-instagram" style={{ color: 'inherit' }} /></a> }
          { linkedin && <a href={linkedin}><FontIcon className="fa fa-linkedin-square" style={{ color: 'inherit' }} /></a> }
          { twitter && <a href={twitter}><FontIcon className="fa fa-twitter-square" style={{ color: 'inherit' }} /></a> }
          { yelp && <a href={yelp}><FontIcon className="fa fa-yelp" style={{ color: 'inherit' }} /></a> }
          { youtube && <a href={youtube}><FontIcon className="fa fa-youtube-play" style={{ color: 'inherit' }} /></a> }
        </div>
        <div>
          <Link to="/" style={{}}>{name ? name : 'Brand'} {new Date().getFullYear()}</Link>
          { license && <div>License # {license}</div>}
          { phone && <div><a href={`tel:${phone.replace(/\D+/g, '')}`} style={{ textDecoration: 'none', color: 'inherit' }}>{phone}</a></div> }
          { email && <div>{email}</div> }
          { street && <div>{street}</div> }
          { city && <div>{city}, {state} {zip}</div> }
        </div>
      </div>
      {image && image.src ?
        <div className="footer-image">
          <Media
            image={image}
            borderRadius={imageBorderRadius}
            elevation={imageElevation}
            margin={imageMargin}
          />
        </div>

      :
      <div style={{ paddingBottom: 16 }}/>
      }
    </Paper>
  </footer>
)

Footer.propTypes = {
  business: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
}

export default footerContainer(loadImage(Footer))
