import mongoose, { Schema } from 'mongoose'

const IframeSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: 'Page' },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  values: {
    flex: { type: String, trim: true, default: '1 1 auto' },
    margin: { type: String, trim: true },
    iFrame: { type: String, trim: true },
    text: { type: String, trim: true },
    width: { type: String, trim: true },
  }
}, {
  timestamps: true
})

IframeSchema.pre('remove', function(next) {
  const iframe = this
  if (iframe.image) {
    deleteFile({ Key }).catch(err => console.error(err))
  }
  next()
})

const Iframe = mongoose.model('Iframe', IframeSchema)

export default Iframe