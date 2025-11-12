/**
 * BUILDMYDIGITAL Design System
 * Standardized components following the brand style guide
 */

import React from 'react';

/* ========================================
   BUTTONS
   ======================================== */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: 'default' | 'large';
  href?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'default',
  href,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-[1440px] transition-all duration-300 cursor-pointer border-none';

  const sizeStyles = {
    default: 'px-8 py-3.5 text-base',
    large: 'px-10 py-4 text-lg'
  };

  const variantStyles = {
    primary: 'bg-[#EF8354] text-white hover:bg-[#d97446] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#EF8354]/30',
    secondary: 'bg-[#F8F7F5] text-[#2D3142] border border-[rgba(24,30,37,0.32)] hover:bg-white hover:border-[rgba(24,30,37,0.48)] hover:-translate-y-0.5',
    tertiary: 'bg-transparent text-[#2D3142] border border-[rgba(24,30,37,0.32)] hover:bg-[rgba(24,30,37,0.08)] hover:border-[rgba(24,30,37,0.48)]',
    destructive: 'bg-[#FA4149] text-white hover:bg-[#e03940] hover:-translate-y-0.5'
  };

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

/* ========================================
   TYPOGRAPHY
   ======================================== */

interface HeadingProps {
  level: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({ level, children, className = '' }) => {
  const styles = {
    1: 'text-[clamp(40px,5vw,72px)] font-medium leading-[1.0] tracking-[-0.04em] text-[#2D3142]',
    2: 'text-[clamp(32px,4vw,48px)] font-medium leading-[1.0] tracking-[-0.03em] text-[#2D3142]',
    3: 'text-[clamp(24px,3vw,32px)] font-medium leading-[1.2] tracking-[-0.015em] text-[#2D3142]',
    4: 'text-2xl font-medium leading-[1.33] tracking-[-0.005em] text-[#2D3142]'
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return React.createElement(Tag, { className: `${styles[level]} ${className}` }, children);
};

interface BodyTextProps {
  size?: 'large' | 'default' | 'small';
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div';
}

export const BodyText: React.FC<BodyTextProps> = ({
  size = 'default',
  children,
  className = '',
  as = 'p'
}) => {
  const styles = {
    large: 'text-lg leading-[1.56] text-[#2D3142]',
    default: 'text-base leading-[1.5] text-[#2D3142]',
    small: 'text-sm leading-[1.43] text-[#4F5D75]'
  };

  const Tag = as;

  return React.createElement(Tag, { className: `${styles[size]} ${className}` }, children);
};

/* ========================================
   CARDS
   ======================================== */

interface CardProps {
  variant?: 'default' | 'bordered' | 'elevated';
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  hoverable = false
}) => {
  const baseStyles = 'rounded-xl transition-all duration-300';

  const variantStyles = {
    default: 'bg-transparent',
    bordered: 'bg-white border border-[rgba(24,30,37,0.16)] hover:border-[rgba(24,30,37,0.32)]',
    elevated: 'bg-white shadow-sm hover:shadow-md'
  };

  const hoverStyles = hoverable ? 'cursor-pointer hover:-translate-y-1' : '';

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

/* ========================================
   SECTIONS
   ======================================== */

interface SectionProps {
  spacing?: 'sm' | 'md' | 'lg';
  background?: 'white' | 'off-white' | 'cream' | 'dark' | 'gradient';
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  spacing = 'md',
  background = 'white',
  children,
  className = '',
  id
}) => {
  const spacingStyles = {
    sm: 'py-20',      // 80px
    md: 'py-30',      // 120px
    lg: 'py-40'       // 160px
  };

  const backgroundStyles = {
    white: 'bg-white',
    'off-white': 'bg-[#F8F7F5]',
    cream: 'bg-[#EFEDE6]',
    dark: 'bg-[#2D3142]',
    gradient: 'bg-gradient-to-br from-black to-gray-900'
  };

  return (
    <section
      id={id}
      className={`px-6 ${spacingStyles[spacing]} ${backgroundStyles[background]} ${className}`}
    >
      <div className="max-w-[1200px] mx-auto">
        {children}
      </div>
    </section>
  );
};

/* ========================================
   BADGES
   ======================================== */

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  children,
  className = ''
}) => {
  const baseStyles = 'inline-block px-3 py-1 text-xs font-medium rounded-[1440px]';

  const variantStyles = {
    primary: 'bg-[#EF8354] text-white',
    success: 'bg-[rgba(46,204,113,0.16)] text-[#27ae60]',
    warning: 'bg-[rgba(241,196,15,0.16)] text-[#f39c12]',
    error: 'bg-[rgba(250,65,73,0.16)] text-[#FA4149]',
    info: 'bg-[rgba(79,93,117,0.16)] text-[#4F5D75]'
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

/* ========================================
   STAT CARDS
   ======================================== */

interface StatCardProps {
  value: string;
  label: string;
  variant?: 'light' | 'white' | 'transparent';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  variant = 'white',
  className = ''
}) => {
  const variantStyles = {
    light: 'bg-white/60 backdrop-blur-sm',
    white: 'bg-white border border-gray-200',
    transparent: 'bg-transparent'
  };

  return (
    <div className={`${variantStyles[variant]} rounded-xl p-6 ${className}`}>
      <div className="text-4xl font-bold text-[#2D3142] mb-2">{value}</div>
      <div className="text-sm text-[#4F5D75]">{label}</div>
    </div>
  );
};

/* ========================================
   FEATURE LIST ITEM
   ======================================== */

interface FeatureItemProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <div className="flex items-start gap-3">
      {icon && (
        <div className="w-6 h-6 rounded-full bg-[#EF8354]/10 flex items-center justify-center flex-shrink-0 mt-1">
          {icon}
        </div>
      )}
      <div>
        <h3 className="font-semibold text-[#2D3142] mb-1">{title}</h3>
        <p className="text-[#4F5D75] leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

/* ========================================
   ICON
   ======================================== */

interface IconProps {
  name: 'check' | 'arrow-right' | 'arrow-down' | 'lightning' | 'clock' | 'scale';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 'md' }) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const icons = {
    check: (
      <svg className={`${sizeStyles[size]} ${className}`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
      </svg>
    ),
    'arrow-right': (
      <svg className={`${sizeStyles[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
    'arrow-down': (
      <svg className={`${sizeStyles[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    ),
    lightning: (
      <svg className={`${sizeStyles[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    clock: (
      <svg className={`${sizeStyles[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    scale: (
      <svg className={`${sizeStyles[size]} ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    )
  };

  return icons[name] || null;
};
