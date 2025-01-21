import Link from 'next/link';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'danger' | 'link';
  href?: string;
  isLink?: boolean;
  fullWidth?: boolean;
}

export default function Button(props: ButtonProps) {
  const { variant, children, href, fullWidth, isLink, className, ...buttonProps } = props;

  if (isLink && !Boolean(href)) {
    throw new Error('Invalid Button type');
  }

  const baseClases = 'rounded cursor-pointer font-semibold py-2 px-3';
  const fullWidthClasses = 'w-full';
  const primaryClasses = 'bg-slate-800 text-slate-100';
  const secondaryClasses = 'bg-slate-200 text-slate-800';
  const dangerClasses = 'bg-red-700 text-red-100';
  const linkClasses = 'text-center no-underline';
  const disabledClasses = 'bg-gray-300 text-gray-800';

  const appliedClasses = [baseClases];
  if (buttonProps.disabled) {
    appliedClasses.push(disabledClasses);
  } else {
    if (variant === 'primary') appliedClasses.push(primaryClasses);
    if (variant === 'secondary') appliedClasses.push(secondaryClasses);
    if (variant === 'danger') appliedClasses.push(dangerClasses);
  }
  if (isLink) appliedClasses.push(linkClasses);
  if (fullWidth) appliedClasses.push(fullWidthClasses);
  if (className) appliedClasses.push(className);

  if (href) {
    return (
      <Link href={href} className={appliedClasses.join(' ')}>
        {children}
      </Link>
    );
  }

  return (
    <button className={appliedClasses.join(' ')} {...buttonProps}>
      {children}
    </button>
  );
}
