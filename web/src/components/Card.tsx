import * as React from "react";

export function Card(props: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "premium" | "gradient";
}): React.ReactElement {
  const variant = props.variant || "default";
  const variants = {
    default:
      "rounded-2xl border border-[color:var(--border)] bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
    premium:
      "rounded-2xl border-2 border-purple-200 bg-white shadow-lg shadow-purple-900/10 hover:shadow-xl hover:border-purple-400 transition-all duration-300 hover:-translate-y-2",
    gradient:
      "rounded-2xl border border-transparent bg-gradient-to-br from-white via-purple-50/30 to-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
  };

  return (
    <div
      className={variants[variant] + " " + (props.className ?? "")}
    >
      {props.children}
    </div>
  );
}

export function CardHeader(props: {
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}): React.ReactElement {
  return (
    <div className={"flex items-start justify-between gap-4 p-6 " + (props.className ?? "")}>
      <div className="flex-1">
        {props.title && (
          <div className="text-base font-semibold text-slate-900">
            {props.title}
          </div>
        )}
        {props.subtitle ? (
          <div className="mt-1 text-sm text-slate-600">{props.subtitle}</div>
        ) : null}
        {props.children}
      </div>
      {props.right ? <div>{props.right}</div> : null}
    </div>
  );
}

export function CardBody(props: {
  children: React.ReactNode;
  className?: string;
}): React.ReactElement {
  return (
    <div className={"px-6 pb-6 " + (props.className ?? "")}>
      {props.children}
    </div>
  );
}

// Shadcn UI compatible exports
export function CardContent(props: {
  children: React.ReactNode;
  className?: string;
}): React.ReactElement {
  return (
    <div className={"px-6 py-4 " + (props.className ?? "")}>
      {props.children}
    </div>
  );
}

export function CardDescription(props: {
  children: React.ReactNode;
  className?: string;
}): React.ReactElement {
  return (
    <div className={"text-sm text-slate-600 " + (props.className ?? "")}>
      {props.children}
    </div>
  );
}

export function CardTitle(props: {
  children: React.ReactNode;
  className?: string;
}): React.ReactElement {
  return (
    <div className={"text-lg font-semibold text-slate-900 " + (props.className ?? "")}>
      {props.children}
    </div>
  );
}
