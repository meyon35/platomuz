import mongoose from 'mongoose'

const AboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  features: [{
    type: String,
    required: true,
  }],
  stats: [{
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  }],
}, {
  timestamps: true,
})

export default mongoose.models.About || mongoose.model('About', AboutSchema) 