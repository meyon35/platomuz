import Link from 'next/link';
import { FaPhone } from 'react-icons/fa';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">PLATOMUZ</h3>
            <p className="text-gray-400">
              Profesyonel fotoğrafçılık hizmetleri ile anılarınızı ölümsüzleştiriyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/galeri" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-400 hover:text-blue-400 transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">İletişim</h3>
            <div className="space-y-2 text-gray-400">
              <p>Mehmet Tönge Mah. 4842 Sk. No: 71 Merkez/ISPARTA</p>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-[rgb(var(--primary))]" />
                <span>Tel: +90 544 441 3200</span>
              </div>
              <p>Email: info@platomuzvar.com</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} PLATOMUZ. Tüm hakları saklıdır.</p>
          <p className="mt-2">
            <span className="text-sm">
              Designed by{' '}
              <a
                href="https://meymedia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                MEY MEDIA
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}; 