import * as React from "react";

export function Card(props: {
  children: React.ReactNode;
  className?: string;
}): React.ReactElement {
  return (
    <div
      className={
        "rounded-2xl border border-[color:var(--border)] bg-white/80 backdrop-blur-sm shadow-[0_1px_0_rgba(15,23,42,0.04)] " +
        (props.className ?? "")
      }
    >
      {props.children}
    </div>
  );
}

export function CardHeader(props: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex items-start justify-between gap-4 p-6">
      <div>
        <div className="text-base font-semibold text-slate-900">
          {props.title}
        </div>
        {props.subtitle ? (
          <div className="mt-1 text-sm text-slate-600">{props.subtitle}</div>
        ) : null}
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
