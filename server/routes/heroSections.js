import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update
} from '../controllers/heroSection'

const heroSections = express.Router()

heroSections.post('/', authenticate(['admin']), add)
heroSections.patch('/:_id', authenticate(['admin']), update)
heroSections.delete('/:_id', authenticate(['admin']), remove)

export default heroSections