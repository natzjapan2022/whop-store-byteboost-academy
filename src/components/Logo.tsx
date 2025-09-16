import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  href?: string;
  className?: string;
}

export default function Logo({ size = 'medium', href = '/', className = '' }: LogoProps) {
  const sizeClasses = {
    small: 'w-9 h-9',
    medium: 'w-12 h-12',
    large: 'w-18 h-18'
  };

  const logoElement = (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src="/logo.png"
        alt="Byteboost Academy"
        width={size === 'small' ? 36 : size === 'medium' ? 48 : 72}
        height={size === 'small' ? 36 : size === 'medium' ? 48 : 72}
        className={`${sizeClasses[size]}`}
      />
      <span className="font-bold text-xl gradient-text">Byteboost Academy</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}