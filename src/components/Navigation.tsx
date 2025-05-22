"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FaInstagram, FaWhatsapp, FaPhone } from 'react-icons/fa';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Anasayfa' },
    { href: '/galeri', label: 'Galeri' },
    { href: '/hakkimizda', label: 'Hakkımızda' },
    { href: '/iletisim', label: 'İletişim' },
  ];

  const socialLinks = [
    { href: 'https://instagram.com/platomuzvar', icon: FaInstagram, label: 'Instagram' },
    { href: 'https://wa.me/905444413200', icon: FaWhatsapp, label: 'WhatsApp' },
    { href: 'tel:+905444413200', icon: FaPhone, label: 'Telefon' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[rgb(var(--background))] shadow-lg backdrop-blur-md py-2' 
          : 'bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--background))]/90 shadow-md backdrop-blur-md py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-32 h-24 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="PLATOMUZ Logo"
                width={128}
                height={80}
                className="object-contain transform translate-y-2"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-colors text-lg font-medium ${
                  pathname === link.href 
                    ? 'text-[rgb(var(--primary))] font-semibold' 
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[rgb(var(--foreground))]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[rgb(var(--card))] mt-4 rounded-lg shadow-lg border border-[rgb(var(--border))]"
          >
            <div className="py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 text-[rgb(var(--foreground))] hover:bg-[rgb(var(--primary))]/10 hover:text-[rgb(var(--primary))] transition-all ${
                    pathname === link.href 
                      ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] font-medium' 
                      : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Social Links - Mobile */}
              <div className="flex items-center space-x-4 px-4 py-3 border-t border-[rgb(var(--border))]">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}; 