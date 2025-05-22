import React from 'react';
import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion';
import { FaUsers, FaCheckCircle, FaComments } from 'react-icons/fa';
import { useRef, useEffect } from 'react';

interface CounterProps {
  value: number;
  text: string;
  icon: React.ReactNode;
}

const Counter: React.FC<CounterProps> = ({ value, text, icon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });

      return animation.stop;
    }
  }, [isInView, value, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-[rgb(var(--card))] p-8 rounded-lg text-center hover:bg-[rgb(var(--card))/90] transition-colors duration-300"
    >
      <div className="flex justify-center mb-4 text-[rgb(var(--primary))]">
        {icon}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.span
          className="text-4xl font-bold text-[rgb(var(--foreground))]"
        >
          +<motion.span>{rounded}</motion.span>
        </motion.span>
        <p className="text-[rgb(var(--muted-foreground))] mt-2">{text}</p>
      </motion.div>
    </motion.div>
  );
};

export default function StatsCounter() {
  const stats = [
    {
      value: 500,
      text: "Mutlu Müşteri",
      icon: <FaUsers className="w-8 h-8" />
    },
    {
      value: 750,
      text: "Tamamlanan Proje",
      icon: <FaCheckCircle className="w-8 h-8" />
    },
    {
      value: 1000,
      text: "Olumlu Yorum",
      icon: <FaComments className="w-8 h-8" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
      {stats.map((stat, index) => (
        <Counter
          key={index}
          value={stat.value}
          text={stat.text}
          icon={stat.icon}
        />
      ))}
    </div>
  );
} 