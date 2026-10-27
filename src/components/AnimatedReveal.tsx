import React, { useEffect, useState } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

interface RevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
  distance = 28,
  ...props
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'zoom':
        return { opacity: 0, scale: 0.94 };
      case 'none':
      default:
        return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case 'zoom':
        return { opacity: 1, scale: 1 };
      case 'none':
        return { opacity: 1 };
      default:
        return { opacity: 1, x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for high-end luxury spring
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerDelta?: number;
  staggerDelay?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  delayChildren = 0.1,
  staggerDelta,
  staggerDelay = 0.08,
}) => {
  const step = staggerDelta ?? staggerDelay;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren: step,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'scale';
}> = ({ children, className = '', direction = 'up' }) => {
  const variants = {
    hidden:
      direction === 'scale'
        ? { opacity: 0, scale: 0.92, y: 16 }
        : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Skeleton / Shimmer background while loading */}
      <div
        className={`absolute inset-0 bg-stone-800/40 transition-opacity duration-700 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-pulse'
        }`}
      />
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{
          opacity: isLoaded ? 1 : 0,
          scale: 1,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-transform duration-700 ease-out`}
      />
    </div>
  );
};

export const AnimatedNumber: React.FC<{
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}> = ({ target, suffix = '', prefix = '', decimals = 0, duration = 1.8 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Ease out quartic
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(easeProgress * target);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <span>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};
