import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-white/10 border-white/20',
    dark: 'bg-black/20 border-white/10',
    primary: 'bg-cyan-500/10 border-cyan-400/30',
    secondary: 'bg-purple-500/10 border-purple-400/30',
    success: 'bg-green-500/10 border-green-400/30',
    warning: 'bg-yellow-500/10 border-yellow-400/30',
    danger: 'bg-red-500/10 border-red-400/30'
  };

  const baseClasses = `
    backdrop-blur-md 
    border 
    rounded-xl 
    shadow-xl 
    transition-all 
    duration-300 
    hover:shadow-2xl 
    hover:scale-[1.02]
    relative
    overflow-hidden
  `;

  const variantClasses = variants[variant] || variants.default;

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        boxShadow: '0 25px 50px -12px rgba(0, 255, 255, 0.25)',
        borderColor: 'rgba(0, 255, 255, 0.5)'
      }}
      {...props}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-cyan-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
           style={{ 
             background: 'linear-gradient(90deg, rgba(0,255,255,0.1) 0%, rgba(147,51,234,0.1) 50%, rgba(0,255,255,0.1) 100%)',
             animation: 'pulse 2s ease-in-out infinite alternate'
           }} />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </motion.div>
  );
};

export default GlassCard;