import Link from "next/link";
import * as React from "react";

type Variant = "primary" | "secondary" | "ghost" | "gradient" | "outline";

export function Button(props: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
  disabled?: boolean;
}): React.ReactElement {
  const {
    children,
    href,
    onClick,
    type = "button",
    variant = "primary",
    className = "",
    disabled,
  } = props;

  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--purple-300)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)] disabled:opacity-50 disabled:pointer-events-none active:scale-95 hover:shadow-lg";

  const styles: Record<Variant, string> = {
    primary:
      "bg-[color:var(--purple)] text-white hover:bg-[color:var(--purple-700)] border border-transparent shadow-glow hover:shadow-glow-lg",
    secondary:
      "bg-white text-[color:var(--purple)] hover:bg-[color:var(--surface-2)] border-2 border-[color:var(--purple)] hover:border-[color:var(--purple-700)]",
    ghost:
      "bg-transparent text-[color:var(--purple)] hover:bg-[color:var(--surface-2)] border border-transparent",
    gradient:
      "bg-gradient-primary text-white border border-transparent hover:shadow-glow-lg",
    outline:
      "bg-transparent text-[color:var(--purple)] border-2 border-[color:var(--purple)] hover:bg-purple-50",
  };

  const cls = `${base} ${styles[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link className={cls} href={href} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
