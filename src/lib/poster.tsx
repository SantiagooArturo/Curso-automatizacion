import type React from "react";
import type { Motif } from "@/lib/data";

interface PosterSVGProps {
  title: string;
  subtitle: string;
  palette: [string, string, string];
  motif: Motif;
}

export function PosterSVG({ title, subtitle, palette, motif }: PosterSVGProps) {
  const [a, b, c] = palette;
  const id = `bg-${title.replace(/\s/g, "")}`;
  const motifs: Record<Motif, React.ReactNode> = {
    dragon: (<><path d="M60 240 Q120 180 180 220 T280 200" stroke={c} strokeWidth={3} fill="none" opacity={0.7}/><circle cx={180} cy={200} r={55} fill={b} opacity={0.55}/><circle cx={170} cy={195} r={8} fill={c}/><path d="M120 260 Q200 240 270 280" stroke={c} strokeWidth={2} fill="none" opacity={0.5}/></>),
    figure: (<><ellipse cx={180} cy={240} rx={70} ry={120} fill={b} opacity={0.55}/><circle cx={180} cy={170} r={22} fill={c} opacity={0.75}/><rect x={120} y={260} width={120} height={170} fill={b} opacity={0.5}/></>),
    music: (<><circle cx={180} cy={220} r={100} fill={b} opacity={0.5}/><path d="M140 200 v90 M170 180 v110 M200 200 v90 M230 180 v110" stroke={c} strokeWidth={6} strokeLinecap="round" opacity={0.7}/></>),
    horror: (<><rect x={80} y={120} width={200} height={280} fill={b} opacity={0.4}/><circle cx={150} cy={240} r={14} fill={c}/><circle cx={210} cy={240} r={14} fill={c}/><path d="M140 320 Q180 300 220 320" stroke={c} strokeWidth={3} fill="none"/></>),
    anime: (<><circle cx={120} cy={180} r={36} fill={c} opacity={0.7}/><circle cx={200} cy={210} r={32} fill="#ffffff" opacity={0.5}/><circle cx={270} cy={180} r={28} fill={b} opacity={0.7}/><path d="M40 360 Q180 320 320 360" stroke={c} strokeWidth={4} fill="none"/></>),
    sheep: (<><ellipse cx={180} cy={320} rx={160} ry={40} fill={b} opacity={0.5}/><circle cx={120} cy={290} r={28} fill="#ffffff" opacity={0.7}/><circle cx={180} cy={280} r={32} fill="#ffffff" opacity={0.75}/><circle cx={240} cy={290} r={26} fill="#ffffff" opacity={0.7}/></>),
    action: (<><path d="M0 480 L180 220 L360 480 Z" fill={b} opacity={0.5}/><circle cx={180} cy={180} r={50} fill={c} opacity={0.7}/><path d="M120 200 L180 100 L240 200" stroke={c} strokeWidth={4} fill="none"/></>),
    sci: (<><circle cx={180} cy={240} r={80} fill="none" stroke={c} strokeWidth={3}/><circle cx={180} cy={240} r={120} fill="none" stroke={c} strokeWidth={2} opacity={0.5}/><circle cx={180} cy={240} r={40} fill={b}/><path d="M60 480 L120 380 L240 380 L300 480" stroke={c} strokeWidth={2} fill="none"/></>),
  };
  return (
    <svg viewBox="0 0 360 540" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width={360} height={540} fill={`url(#${id})`} />
      {motifs[motif]}
      <rect x={0} y={380} width={360} height={160} fill={`url(#${id})`} opacity={0.25} />
      <text x={180} y={450} textAnchor="middle" fill="#ffffff" fontFamily="Bowlby One, sans-serif" fontSize={title.length > 12 ? 28 : 38} fontWeight={800} letterSpacing={1}>{title.toUpperCase()}</text>
      <text x={180} y={478} textAnchor="middle" fill="#ffffff" fontFamily="Mulish, sans-serif" fontSize={11} fontWeight={700} opacity={0.75} letterSpacing={2}>{subtitle}</text>
    </svg>
  );
}
