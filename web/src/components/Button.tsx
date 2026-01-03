import Link from "next/link";
import * as React from "react";

type Variant = "primary" | "secondary" | "ghost";

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
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[color:var(--purple-300)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)] disabled:opacity-50 disabled:pointer-events-none";

  const styles: Record<Variant, string> = {
    primary:
      "bg-[color:var(--purple)] text-white hover:bg-[color:var(--purple-700)] border border-transparent",
    secondary:
      "bg-white text-[color:var(--purple)] hover:bg-[color:var(--surface-2)] border border-[color:var(--border)]",
    ghost:
      "bg-transparent text-[color:var(--purple)] hover:bg-[color:var(--surface-2)] border border-transparent",
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
