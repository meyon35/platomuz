import mongoose from 'mongoose'

const SettingsSchema = new mongoose.Schema({
  siteTitle: {
    type: String,
    required: true,
  },
  siteDescription: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  favicon: {
    type: String,
    required: true,
  },
  theme: {
    // Light mode colors
    light: {
      background: {
        type: String,
        default: 'rgb(255, 255, 255)',
      },
      foreground: {
        type: String,
        default: 'rgb(10, 10, 10)',
      },
      primary: {
        type: String,
        default: 'rgb(37, 99, 235)',
      },
      primaryForeground: {
        type: String,
        default: 'rgb(255, 255, 255)',
      },
      secondary: {
        type: String,
        default: 'rgb(226, 232, 240)',
      },
      secondaryForeground: {
        type: String,
        default: 'rgb(10, 10, 10)',
      },
      muted: {
        type: String,
        default: 'rgb(241, 245, 249)',
      },
      mutedForeground: {
        type: String,
        default: 'rgb(100, 116, 139)',
      },
      accent: {
        type: String,
        default: 'rgb(241, 245, 249)',
      },
      accentForeground: {
        type: String,
        default: 'rgb(10, 10, 10)',
      },
      destructive: {
        type: String,
        default: 'rgb(239, 68, 68)',
      },
      destructiveForeground: {
        type: String,
        default: 'rgb(255, 255, 255)',
      },
      border: {
        type: String,
        default: 'rgb(226, 232, 240)',
      },
      input: {
        type: String,
        default: 'rgb(226, 232, 240)',
      },
      ring: {
        type: String,
        default: 'rgb(37, 99, 235)',
      },
    },
    // Dark mode colors
    dark: {
      background: {
        type: String,
        default: 'rgb(10, 10, 10)',
      },
      foreground: {
        type: String,
        default: 'rgb(255, 255, 255)',
      },
      primary: {
        type: String,
        default: 'rgb(37, 99, 235)',
      },
      primaryForeground: {
        type: String,
        default: 'rgb(255, 255, 255)',
      },
      secondary: {
        type: String,
        default: 'rgb(30, 41, 59)',
      },
      secondaryForeground: {
        type: String,
        default: 'rgb(255, 255, 255)',
      },
      muted: {
        type: String,
        default: 'rgb(30, 41, 59)',
      },
      mutedForeground: {
        type: String,
        default: 'rgb(148, 163, 184)',
      },
      accent: {
        type: String,
        default: 'rgb(30, 41, 59)',
      },
      accentForeground: {
        type: String,
        default: 'rgb(255, 255, 255)',
      },
      destructive: {
        type: String,
        default: 'rgb(239, 68, 68)',
      },
      destructiveForeground: {
        type: String,
        default: 'rgb(255, 255, 255)',
      },
      border: {
        type: String,
        default: 'rgb(30, 41, 59)',
      },
      input: {
        type: String,
        default: 'rgb(30, 41, 59)',
      },
      ring: {
        type: String,
        default: 'rgb(37, 99, 235)',
      },
    },
    fontFamily: {
      type: String,
      default: 'Inter',
    },
    headingFont: {
      type: String,
      default: 'Inter',
    },
    bodyFont: {
      type: String,
      default: 'Inter',
    },
    borderRadius: {
      type: String,
      default: '0.5rem',
    },
    spacing: {
      type: String,
      default: '1rem',
    },
    containerWidth: {
      type: String,
      default: '1200px',
    },
    headerHeight: {
      type: String,
      default: '80px',
    },
    footerHeight: {
      type: String,
      default: '300px',
    },
  },
  contact: {
    phone: String,
    email: String,
    address: String,
    mapUrl: String,
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
  },
  seo: {
    title: String,
    description: String,
    keywords: String,
  },
  footer: {
    text: String,
    copyright: String,
  }
}, {
  timestamps: true,
})

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema) 