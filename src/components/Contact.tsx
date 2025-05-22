"use client"

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaExclamationCircle,
  FaUser,
  FaCamera,
  FaCalendarAlt,
  FaCommentAlt,
  FaChevronDown
} from 'react-icons/fa'
import DatePicker, { registerLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { tr } from 'date-fns/locale'
import InputMask from 'react-input-mask'

registerLocale('tr', tr)

// Tarih seçici için özel stiller
const datePickerStyles = `
  .react-datepicker-wrapper {
    width: 100%;
    display: block;
  }
  .react-datepicker__input-container {
    width: 100%;
    display: block;
  }
  .react-datepicker__input-container input {
    width: 100%;
  }
  .react-datepicker {
    font-family: inherit;
    z-index: 9999;
    background-color: rgb(var(--card));
    border: 1px solid rgb(var(--border));
    border-radius: 0.5rem;
    color: rgb(var(--card-foreground));
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
  .react-datepicker-popper {
    z-index: 9999 !important;
  }
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker__header {
    background-color: rgb(var(--card));
    border-bottom: 1px solid rgb(var(--border));
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    padding-top: 0.5rem;
  }
  .react-datepicker__current-month {
    color: rgb(var(--card-foreground));
    font-weight: 600;
    font-size: 1rem;
  }
  .react-datepicker__day-name {
    color: rgb(var(--muted-foreground));
  }
  .react-datepicker__day {
    color: rgb(var(--card-foreground));
  }
  .react-datepicker__day:hover {
    background-color: rgb(var(--primary));
    color: rgb(var(--primary-foreground));
    border-radius: 0.3rem;
  }
  .react-datepicker__day--selected {
    background-color: rgb(var(--primary));
    color: rgb(var(--primary-foreground));
  }
  .react-datepicker__day--keyboard-selected {
    background-color: rgb(var(--primary));
    color: rgb(var(--primary-foreground));
  }
  .react-datepicker__day--disabled {
    color: rgb(var(--muted-foreground));
    opacity: 0.5;
  }
  .react-datepicker__navigation-icon::before {
    border-color: rgb(var(--card-foreground));
  }
  .react-datepicker__navigation:hover *::before {
    border-color: rgb(var(--primary));
  }
`

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shootingType: '',
    shootingDate: null as Date | null,
    message: ''
  })

  const datePickerRef = useRef<DatePicker>(null)

  const [errors, setErrors] = useState({
    phone: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Telefon numarası doğrulama
    const phoneRegex = /^\+90 [0-9]{3} [0-9]{3} [0-9]{4}$/
    if (!phoneRegex.test(formData.phone)) {
      setErrors(prev => ({
        ...prev,
        phone: 'Lütfen geçerli bir telefon numarası giriniz (555 123 4567)'
      }))
      return
    }

    // Form gönderme işlemi
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Telefon numarası için özel kontrol
    if (name === 'phone') {
      // Eğer değer boşsa veya +90 ile başlamıyorsa, +90 ekle
      if (!value || !value.startsWith('+90 ')) {
        setFormData(prev => ({ ...prev, [name]: '+90 ' }))
        return
      }
      setErrors(prev => ({ ...prev, phone: '' }))
    }
    
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === 'phone' && !formData.phone) {
      setFormData(prev => ({ ...prev, phone: '+90 ' }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === 'phone') {
      // Sadece +90 varsa veya tamamen boşsa, alanı temizle
      const phoneValue = formData.phone.trim()
      if (!phoneValue || phoneValue === '+90' || phoneValue === '+90 ') {
        setFormData(prev => ({ ...prev, phone: '' }))
      }
    }
  }

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({ ...prev, shootingDate: date }))
  }

  // Bugünden önceki tarihleri devre dışı bırak
  const minDate = new Date()

  const shootingTypes = [
    'Düğün Çekimi',
    'Nişan Çekimi',
    'Doğum Günü Çekimi',
    'Hamile Çekimi',
    'Aile Çekimi',
    'Mezuniyet Çekimi',
    'Kurumsal Çekim',
    'Diğer'
  ]

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Telefon',
      info: '+90 544 441 3200',
      link: 'tel:+905444413200'
    },
    {
      icon: FaEnvelope,
      title: 'E-posta',
      info: 'info@platomuzvar.com',
      link: 'mailto:info@platomuzvar.com'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Adres',
      info: 'Mehmet Tönge Mah. 4842 Sk. No: 71 Merkez/ISPARTA',
      link: 'https://maps.google.com'
    }
  ]

  const handleCalendarClick = () => {
    datePickerRef.current?.setOpen(true)
  }

  const inputIconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))] z-[1]"
  const inputWithIconClass = "w-full pl-10 pr-4 py-3 bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] transition-all"

  return (
    <div className="bg-[rgb(var(--background))] py-20">
      {/* Özel stiller */}
      <style>{datePickerStyles}</style>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <FaUser className={inputIconClass} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adınız"
                    className={inputWithIconClass}
                    required
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <FaEnvelope className={inputIconClass} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-posta Adresiniz"
                    className={inputWithIconClass}
                    required
                  />
                </motion.div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="relative">
                  <FaPhone className={inputIconClass} />
                  <InputMask
                    mask="+90 999 999 9999"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Telefon Numaranız"
                    className={`${inputWithIconClass} ${errors.phone ? 'ring-2 ring-red-500' : ''} pr-10`}
                    required
                    maskChar={null}
                  />
                  {errors.phone && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <FaExclamationCircle className="text-red-500" />
                    </div>
                  )}
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <FaCamera className={inputIconClass} />
                  <select
                    name="shootingType"
                    value={formData.shootingType}
                    onChange={handleChange}
                    className={`${inputWithIconClass} appearance-none cursor-pointer pr-10`}
                    required
                  >
                    <option value="" disabled>Çekim Türü Seçiniz</option>
                    {shootingTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative z-[100]"
                >
                  <div className="relative">
                    <FaCalendarAlt className={inputIconClass} />
                    <DatePicker
                      ref={datePickerRef}
                      selected={formData.shootingDate}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      minDate={minDate}
                      locale="tr"
                      placeholderText="Çekim Tarihi Seçiniz"
                      className={`${inputWithIconClass} cursor-pointer`}
                      required
                      popperClassName="date-picker-popper"
                      popperPlacement="bottom-start"
                      portalId="root"
                      showPopperArrow={false}
                      onFocus={handleCalendarClick}
                      onClickOutside={() => datePickerRef.current?.setOpen(false)}
                    />
                  </div>
                </motion.div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <FaCommentAlt className="absolute left-3 top-[1.1rem] text-[rgb(var(--muted-foreground))]" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mesajınız"
                  rows={5}
                  className={`${inputWithIconClass} resize-none`}
                  required
                />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full px-8 py-4 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-lg font-semibold hover:bg-[rgb(var(--primary))]/90 transition-all"
              >
                Gönder
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="block p-6 bg-[rgb(var(--card))] rounded-lg hover:shadow-lg transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <item.icon className="w-6 h-6 text-[rgb(var(--primary))]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[rgb(var(--card-foreground))]">{item.title}</h3>
                    <p className="text-[rgb(var(--muted-foreground))]">{item.info}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 