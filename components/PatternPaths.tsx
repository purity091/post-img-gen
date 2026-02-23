import React from 'react';
import { PatternType } from '../types';

export const PATTERN_PATHS: Record<string, (size: number, color: string) => React.ReactNode> = {
    // --- BASIC ---
    'circles': (size, color) => (
        <svg fill="currentColor" viewBox="0 0 100 100" style={{ width: `${size}%` }}><circle cx="50" cy="50" r="50" /></svg>
    ),
    'dots': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="dots" x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse"><circle cx={size / 4} cy={size / 4} r={size / 8} fill="currentColor" /></pattern></defs><rect width="100%" height="100%" fill="url(#dots)" /></svg>
    ),
    'grid': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="grid" width={size * 1.5} height={size * 1.5} patternUnits="userSpaceOnUse"><path d={`M ${size * 1.5} 0 L 0 0 0 ${size * 1.5}`} fill="none" stroke="currentColor" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
    ),
    'waves': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="waves" width={size * 2} height={size} patternUnits="userSpaceOnUse"><path d={`M0 ${size / 2} Q${size / 2} 0, ${size} ${size / 2} T${size * 2} ${size / 2}`} fill="none" stroke="currentColor" strokeWidth="1.5" /></pattern></defs><rect width="100%" height="100%" fill="url(#waves)" /></svg>
    ),
    'hexagons': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="hex" width={size} height={size * 1.7} patternUnits="userSpaceOnUse"><path d={`M${size / 2} ${size * 1.7}L0 ${size * 1.4}V${size * 0.3}l${size / 2} -${size * 0.3}l${size / 2} ${size * 0.3}v${size * 1.1}z`} fill="none" stroke="currentColor" strokeWidth="1.2" /></pattern></defs><rect width="100%" height="100%" fill="url(#hex)" /></svg>
    ),
    'diagonal': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="diag" width={size} height={size} patternUnits="userSpaceOnUse"><path d={`M0 ${size} L${size} 0`} fill="none" stroke="currentColor" strokeWidth="1.5" /></pattern></defs><rect width="100%" height="100%" fill="url(#diag)" /></svg>
    ),
    'plus': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="plus" width={size} height={size} patternUnits="userSpaceOnUse"><path d={`M${size / 2} 0 v${size} M0 ${size / 2} h${size}`} fill="none" stroke="currentColor" strokeWidth="1.2" /></pattern></defs><rect width="100%" height="100%" fill="url(#plus)" /></svg>
    ),
    'mesh': (size, color) => (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 Q50,100 100,0 T0,100" fill="none" stroke="currentColor" strokeWidth="0.5" /></svg>
    ),

    // --- FINANCE & ECONOMY ---
    'candles': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="candles" width={size * 1.5} height={size * 2} patternUnits="userSpaceOnUse">
            <rect x={size * 0.2} y={size * 0.5} width={size * 0.3} height={size} fill="currentColor" opacity="0.8" />
            <line x1={size * 0.35} y1={size * 0.2} x2={size * 0.35} y2={size * 1.8} stroke="currentColor" strokeWidth="1" />
            <rect x={size * 0.9} y={size * 0.8} width={size * 0.3} height={size * 0.6} stroke="currentColor" fill="none" strokeWidth="1" />
            <line x1={size * 1.05} y1={size * 0.5} x2={size * 1.05} y2={size * 1.7} stroke="currentColor" strokeWidth="1" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#candles)" /></svg>
    ),
    'graph-bar': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="graph-bar" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <rect x="0" y={size} width={size * 0.4} height={size} fill="currentColor" opacity="0.3" />
            <rect x={size * 0.5} y={size * 0.5} width={size * 0.4} height={size * 1.5} fill="currentColor" opacity="0.6" />
            <rect x={size} y={size * 0.2} width={size * 0.4} height={size * 1.8} fill="currentColor" opacity="0.9" />
            <rect x={size * 1.5} y={size * 0.7} width={size * 0.4} height={size * 1.3} fill="currentColor" opacity="0.5" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#graph-bar)" /></svg>
    ),
    'coins': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="coins" width={size * 1.5} height={size * 1.5} patternUnits="userSpaceOnUse">
            <circle cx={size * 0.5} cy={size * 0.5} r={size * 0.4} stroke="currentColor" fill="none" strokeWidth="1.5" />
            <circle cx={size * 0.5} cy={size * 0.5} r={size * 0.3} stroke="currentColor" fill="none" strokeWidth="0.5" opacity="0.5" />
            <path d={`M${size * 0.4} ${size * 0.4} L${size * 0.5} ${size * 0.6} L${size * 0.6} ${size * 0.4}`} fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#coins)" /></svg>
    ),
    'circuit': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="circuit" width={size * 3} height={size * 3} patternUnits="userSpaceOnUse">
            <path d={`M0 ${size} h${size} v-${size * 0.5} h${size * 0.5}`} fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx={size * 2.7} cy={size * 0.5} r={size * 0.2} fill="currentColor" />
            <path d={`M${size * 3} ${size * 2} h-${size} v${size * 0.5} h-${size * 0.5}`} fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx={size * 0.3} cy={size * 2.5} r={size * 0.2} fill="currentColor" stroke="none" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#circuit)" /></svg>
    ),
    'arrows-up': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="arrows-up" width={size} height={size} patternUnits="userSpaceOnUse">
            <path d={`M${size * 0.2} ${size * 0.8} L${size * 0.5} ${size * 0.5} L${size * 0.8} ${size * 0.8} M${size * 0.5} ${size * 0.5} v${size * 0.5}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#arrows-up)" /></svg>
    ),
    'percent': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="percent" width={size * 1.2} height={size * 1.2} patternUnits="userSpaceOnUse">
            <text x="50%" y="50%" fontSize={size} fill="currentColor" opacity="0.7" fontFamily="monospace" textAnchor="middle" dominantBaseline="middle">%</text>
        </pattern></defs><rect width="100%" height="100%" fill="url(#percent)" /></svg>
    ),
    'bull-market': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="bull" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <path d={`M${size * 0.2} ${size} L${size} ${size * 0.2} L${size * 1.8} ${size}`} fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx={size} cy={size * 0.2} r={size * 0.1} fill="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#bull)" /></svg>
    ),
    'globe-net': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="globe" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <circle cx={size} cy={size} r={size * 0.8} fill="none" stroke="currentColor" strokeWidth="1" />
            <ellipse cx={size} cy={size} rx={size * 0.8} ry={size * 0.3} fill="none" stroke="currentColor" strokeWidth="0.5" transform={`rotate(45 ${size} ${size})`} />
            <ellipse cx={size} cy={size} rx={size * 0.8} ry={size * 0.3} fill="none" stroke="currentColor" strokeWidth="0.5" transform={`rotate(-45 ${size} ${size})`} />
        </pattern></defs><rect width="100%" height="100%" fill="url(#globe)" /></svg>
    ),

    // --- ISLAMIC & GEOMETRIC ---
    'arabesque': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="arabesque" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <path d={`M${size} 0 Q${size * 1.5} ${size * 0.5} ${size} ${size} Q${size * 0.5} ${size * 1.5} ${size} ${size * 2} Q${size * 0.5} ${size * 1.5} 0 ${size} Q${size * 0.5} ${size * 0.5} ${size} 0`} fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx={size} cy={size} r={size * 0.2} fill="currentColor" opacity="0.5" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#arabesque)" /></svg>
    ),
    'star-oct': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="star-oct" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <path d={`M${size} 0 L${size * 1.3} ${size * 0.7} L${size * 2} ${size} L${size * 1.3} ${size * 1.3} L${size} ${size * 2} L${size * 0.7} ${size * 1.3} L0 ${size} L${size * 0.7} ${size * 0.7} Z`} fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#star-oct)" /></svg>
    ),
    'kufic-geom': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="kufic" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <path d={`M0 0 h${size} v${size} h-${size * 0.5} v${size * 0.5} h${size * 0.5} v-${size * 0.5}`} fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x={size * 1.2} y={size * 0.2} width={size * 0.6} height={size * 0.6} fill="currentColor" opacity="0.3" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#kufic)" /></svg>
    ),
    'moroccan': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="moroccan" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <path d={`M${size} 0 C${size * 1.5} 0 ${size * 2} ${size * 0.5} ${size * 2} ${size} C${size * 2} ${size * 1.5} ${size * 1.5} ${size * 2} ${size} ${size * 2} C${size * 0.5} ${size * 2} 0 ${size * 1.5} 0 ${size} C0 ${size * 0.5} ${size * 0.5} 0 ${size} 0 Z`} fill="none" stroke="currentColor" strokeWidth="1" />
            <path d={`M${size} ${size * 0.2} v${size * 1.6} M${size * 0.2} ${size} h${size * 1.6}`} stroke="currentColor" strokeWidth="0.5" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#moroccan)" /></svg>
    ),

    // --- ABSTRACT & MODERN ---
    'waves-flow': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="waves-flow" width={size} height={size} patternUnits="userSpaceOnUse">
            <path d={`M0 ${size * 0.2} Q${size * 0.5} 0, ${size} ${size * 0.2}`} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <path d={`M0 ${size * 0.5} Q${size * 0.5} ${size * 0.3}, ${size} ${size * 0.5}`} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <path d={`M0 ${size * 0.8} Q${size * 0.5} ${size * 0.6}, ${size} ${size * 0.8}`} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.9" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#waves-flow)" /></svg>
    ),
    'cubes': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="cubes" width={size * 1.732} height={size * 3} patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
            <path d={`M${size * 0.866} 0 L${size * 1.732} ${size * 0.5} L${size * 1.732} ${size * 1.5} L${size * 0.866} ${size * 2} L0 ${size * 1.5} L0 ${size * 0.5} Z`} fill="none" stroke="currentColor" />
            <path d={`M${size * 0.866} ${size * 1} L${size * 0.866} ${size * 2} M${size * 0.866} ${size * 1} L0 ${size * 0.5} M${size * 0.866} ${size * 1} L${size * 1.732} ${size * 0.5}`} stroke="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#cubes)" /></svg>
    ),
    'lines-diag': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="lines-diag" width={size} height={size} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2={size} stroke="currentColor" strokeWidth={size * 0.2} opacity="0.5" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#lines-diag)" /></svg>
    ),
    'noise': (size, color) => (
        <svg width="100%" height="100%"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.4" /></svg>
    ),

    // --- TEXTURE & MINIMAL ---
    'halftone': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="halftone" width={size} height={size} patternUnits="userSpaceOnUse">
            <circle cx={size * 0.5} cy={size * 0.5} r={size * 0.2} fill="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#halftone)" /></svg>
    ),
    'dots-scatter': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="scatter" width={size * 4} height={size * 4} patternUnits="userSpaceOnUse">
            <circle cx={size} cy={size} r={size * 0.3} fill="currentColor" opacity="0.8" />
            <circle cx={size * 3} cy={size * 1.5} r={size * 0.2} fill="currentColor" opacity="0.6" />
            <circle cx={size * 1.5} cy={size * 3.5} r={size * 0.4} fill="currentColor" opacity="0.4" />
            <circle cx={size * 3.5} cy={size * 3.2} r={size * 0.1} fill="currentColor" opacity="0.9" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#scatter)" /></svg>
    ),
    'grid-dotted': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="grid-dot" width={size} height={size} patternUnits="userSpaceOnUse">
            <rect width={size * 0.1} height={size * 0.1} fill="currentColor" />
            <rect x={size * 0.9} width={size * 0.1} height={size * 0.1} fill="currentColor" />
            <rect y={size * 0.9} width={size * 0.1} height={size * 0.1} fill="currentColor" />
            <rect x={size * 0.9} y={size * 0.9} width={size * 0.1} height={size * 0.1} fill="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#grid-dot)" /></svg>
    ),

    // --- EXTRA FINANCE ---
    'scales': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="scales" width={size * 3} height={size * 3} patternUnits="userSpaceOnUse">
            <path d={`M${size * 1.5} ${size} v${size}`} stroke="currentColor" />
            <path d={`M${size} ${size * 1.2} L${size * 2} ${size * 1.2}`} stroke="currentColor" />
            <circle cx={size} cy={size * 1.8} r={size * 0.4} fill="none" stroke="currentColor" />
            <circle cx={size * 2} cy={size * 1.8} r={size * 0.4} fill="none" stroke="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#scales)" /></svg>
    ),
    'briefcase': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="briefcase" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <rect x={size * 0.5} y={size * 0.8} width={size} height={size * 0.7} rx={size * 0.1} stroke="currentColor" fill="none" />
            <path d={`M${size * 0.8} ${size * 0.8} v-${size * 0.2} h${size * 0.4} v${size * 0.2}`} fill="none" stroke="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#briefcase)" /></svg>
    ),
    'calculator': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="calc" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <rect x={size * 0.5} y={size * 0.5} width={size} height={size * 1.2} rx={size * 0.1} stroke="currentColor" fill="none" />
            <rect x={size * 0.7} y={size * 0.7} width={size * 0.6} height={size * 0.3} fill="currentColor" opacity="0.3" />
            <circle cx={size * 0.8} cy={size * 1.3} r={size * 0.05} fill="currentColor" />
            <circle cx={size * 1} cy={size * 1.3} r={size * 0.05} fill="currentColor" />
            <circle cx={size * 1.2} cy={size * 1.3} r={size * 0.05} fill="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#calc)" /></svg>
    ),
    'bank': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="bank" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <path d={`M${size} ${size * 0.5} L${size * 1.5} ${size} L${size * 0.5} ${size} Z`} fill="none" stroke="currentColor" />
            <rect x={size * 0.6} y={size} width={size * 0.1} height={size * 0.5} fill="currentColor" />
            <rect x={size * 0.9} y={size} width={size * 0.1} height={size * 0.5} fill="currentColor" />
            <rect x={size * 1.2} y={size} width={size * 0.1} height={size * 0.5} fill="currentColor" />
            <rect x={size * 0.5} y={size * 1.5} width={size} height={size * 0.1} fill="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#bank)" /></svg>
    ),
    'growth-curve': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="growth" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <path d={`M0 ${size * 2} C${size} ${size * 2}, ${size} ${size}, ${size * 2} 0`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray={`${size * 0.2}`} />
            <circle cx={size * 2} cy="0" r={size * 0.1} fill="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#growth)" /></svg>
    ),
    'target': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="target" width={size * 3} height={size * 3} patternUnits="userSpaceOnUse">
            <circle cx={size * 1.5} cy={size * 1.5} r={size} stroke="currentColor" fill="none" />
            <circle cx={size * 1.5} cy={size * 1.5} r={size * 0.7} stroke="currentColor" fill="none" strokeWidth="0.5" />
            <circle cx={size * 1.5} cy={size * 1.5} r={size * 0.3} fill="currentColor" />
            <path d={`M${size * 1.5} ${size * 1.5} L${size * 2.5} ${size * 0.5}`} stroke="currentColor" strokeWidth="1" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#target)" /></svg>
    ),
    'pie-chart': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="pie" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <path d={`M${size} ${size} L${size} 0 A${size} ${size} 0 0 1 ${size * 2} ${size} Z`} fill="currentColor" opacity="0.6" />
            <path d={`M${size} ${size} L${size * 2} ${size} A${size} ${size} 0 0 1 ${size} ${size * 2} Z`} fill="currentColor" opacity="0.3" />
            <circle cx={size} cy={size} r={size} stroke="currentColor" fill="none" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#pie)" /></svg>
    ),

    // --- MORE ISLAMIC/GEOMETRIC ---
    'hex-star': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="hex-star" width={size * 3} height={size * 2.6} patternUnits="userSpaceOnUse">
            <path d={`M${size * 1.5} 0 L${size * 2.25} ${size * 0.43} L${size * 2.25} ${size * 1.3} L${size * 1.5} ${size * 1.73} L${size * 0.75} ${size * 1.3} L${size * 0.75} ${size * 0.43} Z`} fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx={size * 1.5} cy={size * 0.86} r={size * 0.2} fill="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#hex-star)" /></svg>
    ),
    'islamic-interlace': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="interlace" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width={size * 2} height={size * 2} fill="none" />
            <path d={`M0 ${size} L${size} 0 M${size} ${size * 2} L${size * 2} ${size}`} stroke="currentColor" strokeWidth="1" />
            <rect x={size * 0.8} y={size * 0.8} width={size * 0.4} height={size * 0.4} transform={`rotate(45 ${size} ${size})`} fill="none" stroke="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#interlace)" /></svg>
    ),
    'mosque-dome': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="dome" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <path d={`M${size * 0.5} ${size * 1.5} Q${size} ${size * 0.5} ${size * 1.5} ${size * 1.5}`} fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx={size} cy={size * 0.8} r={size * 0.1} fill="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#dome)" /></svg>
    ),
    'crescent-star': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="crescent" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <path d={`M${size} ${size * 0.5} A${size * 0.4} ${size * 0.4} 0 1 0 ${size} ${size * 1.3} A${size * 0.3} ${size * 0.3} 0 1 1 ${size} ${size * 0.5}`} fill="currentColor" />
            <path d={`M${size * 1.3} ${size * 0.6} L${size * 1.35} ${size * 0.8} L${size * 1.55} ${size * 0.8} L${size * 1.4} ${size * 0.9} L${size * 1.45} ${size * 1.1} L${size * 1.3} ${size * 1} L${size * 1.15} ${size * 1.1} L${size * 1.2} ${size * 0.9} L${size * 1.05} ${size * 0.8} L${size * 1.25} ${size * 0.8} Z`} fill="currentColor" transform="scale(0.5)" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#crescent)" /></svg>
    ),

    // --- MORE ABSTRACT ---
    'hexagons-3d': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="hex3d" width={size * 2} height={size * 3.46} patternUnits="userSpaceOnUse">
            <path d={`M${size} 0 L${size * 2} ${size * 0.58} L${size * 2} ${size * 1.73} L${size} ${size * 2.31} L0 ${size * 1.73} L0 ${size * 0.58} Z`} fill="none" stroke="currentColor" />
            <path d={`M${size} ${size * 1.15} L${size} ${size * 2.31} M${size} ${size * 1.15} L${size * 2} ${size * 0.58} M${size} ${size * 1.15} L0 ${size * 0.58}`} stroke="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#hex3d)" /></svg>
    ),
    'triangles-net': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="tri-net" width={size} height={size * 0.866} patternUnits="userSpaceOnUse">
            <path d={`M0 ${size * 0.866} L${size * 0.5} 0 L${size} ${size * 0.866} Z`} fill="none" stroke="currentColor" opacity="0.5" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#tri-net)" /></svg>
    ),
    'circles-concentric': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="concentric" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <circle cx={size} cy={size} r={size * 0.8} fill="none" stroke="currentColor" opacity="0.3" />
            <circle cx={size} cy={size} r={size * 0.6} fill="none" stroke="currentColor" opacity="0.5" />
            <circle cx={size} cy={size} r={size * 0.4} fill="none" stroke="currentColor" opacity="0.8" />
            <circle cx={size} cy={size} r={size * 0.2} fill="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#concentric)" /></svg>
    ),
    'squares-overlap': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="sq-lap" width={size} height={size} patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
            <rect x="0" y="0" width={size * 0.8} height={size * 0.8} fill="none" stroke="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#sq-lap)" /></svg>
    ),
    'zigzag': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="zigzag" width={size} height={size} patternUnits="userSpaceOnUse">
            <path d={`M0 ${size} L${size * 0.5} 0 L${size} ${size}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#zigzag)" /></svg>
    ),
    'prism': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="prism" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <path d={`M0 0 L${size} ${size} L${size * 2} 0`} fill="none" stroke="currentColor" opacity="0.5" />
            <path d={`M0 ${size * 2} L${size} ${size} L${size * 2} ${size * 2}`} fill="none" stroke="currentColor" opacity="0.5" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#prism)" /></svg>
    ),

    // --- TEXTURE EXTRAS ---
    'grunge': (size, color) => (
        <svg width="100%" height="100%"><filter id="grungeF"><feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turb" /><feDisplacementMap in="SourceGraphic" in2="turb" scale="20" /></filter><rect width="100%" height="100%" fill="currentColor" opacity="0.1" filter="url(#grungeF)" /></svg>
    ),
    'lines-vertical': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="v-lines" width={size * 0.5} height={size} patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2={size} stroke="currentColor" strokeWidth="1" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#v-lines)" /></svg>
    ),
    'crosshatch': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="crosshatch" width={size} height={size} patternUnits="userSpaceOnUse">
            <path d={`M0 0 L${size} ${size} M${size} 0 L0 ${size}`} stroke="currentColor" strokeWidth="1" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#crosshatch)" /></svg>
    ),
    'noise-static': (size, color) => (
        <svg width="100%" height="100%"><filter id="static"><feNoise /></filter><rect width="100%" height="100%" fill="currentColor" opacity="0.15" /></svg>
    ),

    // --- HUMAN & ORGANIC (USER REQUEST) ---
    'organic-blob': (size, color) => (
        <svg width="100%" height="100%">
            <defs>
                <filter id="blurFilter" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                </filter>
            </defs>
            {/* Soft Organic Circle: Positioned bottom-left, large, blurred */}
            <circle cx="20%" cy="80%" r={size * 1.5} fill={color} opacity="0.6" filter="url(#blurFilter)" />
            {/* Secondary subtle blob for balance */}
            <circle cx="90%" cy="10%" r={size * 0.8} fill={color} opacity="0.3" filter="url(#blurFilter)" />
        </svg>
    ),

    // --- PREMIUM & CREATIVE ---
    'pulse-rings': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="pulse" width={size * 4} height={size * 4} patternUnits="userSpaceOnUse">
            <circle cx={size * 2} cy={size * 2} r={size * 0.5} stroke="currentColor" fill="none" strokeWidth="1" />
            <circle cx={size * 2} cy={size * 2} r={size * 1.2} stroke="currentColor" fill="none" strokeWidth="0.5" opacity="0.6" />
            <circle cx={size * 2} cy={size * 2} r={size * 1.8} stroke="currentColor" fill="none" strokeWidth="0.2" opacity="0.3" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#pulse)" /></svg>
    ),
    'dna-helix': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="dna" width={size * 2} height={size * 4} patternUnits="userSpaceOnUse">
            <path d={`M${size * 0.5} 0 Q${size * 1.5} ${size}, ${size * 0.5} ${size * 2} T${size * 0.5} ${size * 4}`} fill="none" stroke="currentColor" strokeWidth="1" />
            <path d={`M${size * 1.5} 0 Q${size * 0.5} ${size}, ${size * 1.5} ${size * 2} T${size * 1.5} ${size * 4}`} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1={size * 0.6} y1={size * 0.5} x2={size * 1.4} y2={size * 0.5} stroke="currentColor" strokeWidth="0.5" />
            <line x1={size * 0.6} y1={size * 1.5} x2={size * 1.4} y2={size * 1.5} stroke="currentColor" strokeWidth="0.5" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#dna)" /></svg>
    ),
    'constellation': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="const" width={size * 5} height={size * 5} patternUnits="userSpaceOnUse">
            <circle cx={size} cy={size} r="2" fill="currentColor" />
            <circle cx={size * 4} cy={size * 2} r="1.5" fill="currentColor" />
            <circle cx={size * 2} cy={size * 4} r="2" fill="currentColor" />
            <path d={`M${size} ${size} L${size * 4} ${size * 2} L${size * 2} ${size * 4} Z`} fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#const)" /></svg>
    ),
    'liquid-flow': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="liquid" width={size * 6} height={size * 3} patternUnits="userSpaceOnUse">
            <path d={`M0 ${size} C${size * 2} 0, ${size * 4} ${size * 2}, ${size * 6} ${size}`} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
            <path d={`M0 ${size * 2} C${size * 2} ${size}, ${size * 4} ${size * 3}, ${size * 6} ${size * 2}`} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#liquid)" /></svg>
    ),
    'data-stream': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="stream" width={size * 2} height={size * 5} patternUnits="userSpaceOnUse">
            <circle cx={size} cy={size * 0.5} r="1" fill="currentColor" />
            <circle cx={size} cy={size * 1.5} r="1" fill="currentColor" opacity="0.5" />
            <circle cx={size} cy={size * 2.5} r="1" fill="currentColor" opacity="0.8" />
            <circle cx={size} cy={size * 3.5} r="1" fill="currentColor" opacity="0.3" />
            <circle cx={size} cy={size * 4.5} r="1" fill="currentColor" opacity="0.6" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#stream)" /></svg>
    ),
    'blueprint': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="blue" width={size * 4} height={size * 4} patternUnits="userSpaceOnUse">
            <path d={`M0 0 L${size * 4} 0 M0 0 L0 ${size * 4}`} stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <path d={`M${size} ${size} h${size * 2} v${size * 2} h-${size * 2} z`} fill="none" stroke="currentColor" strokeWidth="1" />
            <path d={`M0 0 L${size} ${size} M${size * 4} 0 L${size * 3} ${size}`} stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#blue)" /></svg>
    ),
    'quantum-grid': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="quantum" width={size * 2} height={size * 2} patternUnits="userSpaceOnUse">
            <path d={`M${size} 0 V${size * 2} M0 ${size} H${size * 2}`} stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            <rect x={size - 2} y={size - 2} width="4" height="4" fill="currentColor" />
            <circle cx={size} cy={size} r={size * 0.4} fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#quantum)" /></svg>
    ),
    'topographic': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="topo" width={size * 5} height={size * 5} patternUnits="userSpaceOnUse">
            <path d={`M0 ${size * 2.5} Q${size * 1.25} ${size * 0.5}, ${size * 2.5} ${size * 2.5} T${size * 5} ${size * 2.5}`} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <path d={`M0 ${size * 3.5} Q${size * 1.25} ${size * 1.5}, ${size * 2.5} ${size * 3.5} T${size * 5} ${size * 3.5}`} fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
            <path d={`M0 ${size * 1.5} Q${size * 1.25} ${size * -0.5}, ${size * 2.5} ${size * 1.5} T${size * 5} ${size * 1.5}`} fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#topo)" /></svg>
    ),
    'crystal': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="cryst" width={size * 4} height={size * 4} patternUnits="userSpaceOnUse">
            <path d={`M${size * 2} 0 L${size * 4} ${size * 2} L${size * 2} ${size * 4} L0 ${size * 2} Z`} fill="none" stroke="currentColor" strokeWidth="1" />
            <path d={`M0 0 L${size * 4} ${size * 4} M${size * 4} 0 L0 ${size * 4}`} stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#cryst)" /></svg>
    ),
    'radiant-fiber': (size, color) => (
        <svg width="100%" height="100%"><defs><pattern id="fiber" width={size * 8} height={size * 8} patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2={size * 4} y2={size * 4} stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            <line x1={size * 8} y1="0" x2={size * 4} y2={size * 4} stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            <line x1="0" y1={size * 8} x2={size * 4} y2={size * 4} stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            <line x1={size * 8} y1={size * 8} x2={size * 4} y2={size * 4} stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            <circle cx={size * 4} cy={size * 4} r="2" fill="currentColor" />
        </pattern></defs><rect width="100%" height="100%" fill="url(#fiber)" /></svg>
    ),

    // --- ARTISTIC LINES (PROFESSIONAL & NON-REPEATING) ---
    'aurora-lines': (size, color) => (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,20 Q30,10 50,20 T100,20" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
            <path d="M0,40 Q20,35 50,45 T100,40" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
            <path d="M0,60 Q40,50 60,65 T100,60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <path d="M0,80 Q25,85 55,75 T100,85" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
        </svg>
    ),
    'cosmic-flow': (size, color) => (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M-10,50 C20,10 80,90 110,50" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
            <circle cx="30" cy="30" r="1.5" fill="currentColor" opacity="0.5" />
            <circle cx="70" cy="70" r="1" fill="currentColor" opacity="0.4" />
            <path d="M20,100 L80,0" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.2" />
        </svg>
    ),
    'abstract-curves': (size, color) => (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M50,-10 Q70,50 50,110" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.1" />
            <path d="M60,-10 Q80,50 60,110" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
            <path d="M40,-10 Q60,50 40,110" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        </svg>
    ),
    'tech-orbit': (size, color) => (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="0.3" transform="rotate(25 50 50)" opacity="0.4" />
            <ellipse cx="50" cy="50" rx="35" ry="12" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(-15 50 50)" opacity="0.6" />
            <circle cx="82" cy="35" r="1" fill="currentColor" />
        </svg>
    ),
    'zenith-rays': (size, color) => (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="100" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="0.2" opacity="0.2" />
            <line x1="100" y1="0" x2="0" y2="70" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
            <line x1="100" y1="0" x2="20" y2="100" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
            <line x1="100" y1="0" x2="60" y2="100" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
        </svg>
    ),
    'dynamic-ribbon': (size, color) => (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,80 C30,100 70,0 100,20 L100,25 C70,5 30,105 0,85 Z" fill="currentColor" opacity="0.15" />
            <path d="M0,80 C30,100 70,0 100,20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        </svg>
    ),
    'urban-sketch': (size, color) => (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M10,10 L95,15 M15,12 L90,14" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M10,10 L15,90 M12,15 L14,85" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M30,30 L80,30" stroke="currentColor" strokeWidth="2" opacity="0.1" />
        </svg>
    ),
    'fused-wires': (size, color) => (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 L30,50 L50,20 L70,50 L100,50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            <circle cx="30" cy="50" r="0.8" fill="currentColor" />
            <circle cx="50" cy="20" r="0.8" fill="currentColor" />
            <circle cx="70" cy="50" r="0.8" fill="currentColor" />
        </svg>
    ),
    'minimal-pulse': (size, color) => (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 L40,50 L45,30 L55,70 L60,50 L100,50" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            <path d="M0,52 L40,52 L45,32 L55,72 L60,52 L100,52" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
        </svg>
    ),
    'wave-motion': (size, color) => (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 C20,30 40,70 60,50 S100,50 100,50" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.1" />
            <path d="M0,55 C20,35 40,75 60,55 S100,55 100,55" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
            <path d="M0,45 C20,25 40,65 60,45 S100,45 100,45" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        </svg>
    ),

    // --- ECONOMIC ARTISTRY (50 NEW PATTERNS) ---

    // 1. ECON WIND (Market Momentum & Breeze)
    'econ-wind-1': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 20 Q 25 10 50 20 T 100 20" fill="none" stroke={c} strokeWidth="0.2" opacity="0.3" /></svg>,
    'econ-wind-2': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 40 Q 30 50 60 40 T 100 40" fill="none" stroke={c} strokeWidth="0.3" opacity="0.4" /></svg>,
    'econ-wind-3': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 60 Q 40 50 80 60 T 100 60" fill="none" stroke={c} strokeWidth="0.4" opacity="0.2" /></svg>,
    'econ-wind-4': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 80 Q 20 90 50 80 T 100 80" fill="none" stroke={c} strokeWidth="0.2" opacity="0.5" /></svg>,
    'econ-wind-5': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 30 C 20 10 80 50 100 30" fill="none" stroke={c} strokeWidth="0.5" opacity="0.3" /></svg>,
    'econ-wind-6': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 70 C 40 90 60 50 100 70" fill="none" stroke={c} strokeWidth="0.4" opacity="0.4" /></svg>,
    'econ-wind-7': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 50 Q 50 0 100 50" fill="none" stroke={c} strokeWidth="0.2" opacity="0.2" /></svg>,
    'econ-wind-8': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 50 Q 50 100 100 50" fill="none" stroke={c} strokeWidth="0.3" opacity="0.3" /></svg>,
    'econ-wind-9': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 10 L 100 90 M 0 90 L 100 10" fill="none" stroke={c} strokeWidth="0.1" opacity="0.1" /></svg>,
    'econ-wind-10': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M10 0 V 100 M 90 0 V 100" fill="none" stroke={c} strokeWidth="0.1" opacity="0.2" /></svg>,

    // 2. ECON VECTOR (Direction & Growth)
    'econ-vector-1': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M10 90 L 90 10" stroke={c} strokeWidth="0.5" fill="none" opacity="0.4" /><path d="M80 10 H 90 V 20" stroke={c} strokeWidth="0.5" fill="none" opacity="0.4" /></svg>,
    'econ-vector-2': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 100 Q 50 100 100 0" stroke={c} strokeWidth="0.8" fill="none" opacity="0.3" /></svg>,
    'econ-vector-3': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 80 L 30 50 L 60 70 L 100 20" stroke={c} strokeWidth="0.6" fill="none" opacity="0.5" /></svg>,
    'econ-vector-4': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M10 10 L 90 90" stroke={c} strokeWidth="0.2" fill="none" opacity="0.2" /><circle cx="90" cy="90" r="1.5" fill={c} opacity="0.6" /></svg>,
    'econ-vector-5': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M50 0 V 100" stroke={c} strokeWidth="2" opacity="0.05" /><path d="M0 50 H 100" stroke={c} strokeWidth="2" opacity="0.05" /></svg>,
    'econ-vector-6': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 20 L 100 20 M 0 40 L 100 40 M 0 60 L 100 60 M 0 80 L 100 80" stroke={c} strokeWidth="0.1" opacity="0.3" /></svg>,
    'econ-vector-7': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M20 0 V 100 M 40 0 V 100 M 60 0 V 100 M 80 0 V 100" stroke={c} strokeWidth="0.1" opacity="0.3" /></svg>,
    'econ-vector-8': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M10 10 H 30 V 30 H 10 Z" fill={c} opacity="0.2" /><path d="M70 70 H 90 V 90 H 70 Z" fill={c} opacity="0.2" /></svg>,
    'econ-vector-9': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M50 50 L 100 0 M 50 50 L 0 100" stroke={c} strokeWidth="0.3" opacity="0.4" /></svg>,
    'econ-vector-10': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 0 L 100 100 M 100 0 L 0 100" stroke={c} strokeWidth="0.1" opacity="0.2" /></svg>,

    // 3. ECON STRATA (Market Levels & Depth)
    'econ-strata-1': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 10 H 100 M 0 15 H 100" stroke={c} strokeWidth="0.5" opacity="0.2" /></svg>,
    'econ-strata-2': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 30 H 100 M 0 35 H 100" stroke={c} strokeWidth="0.8" opacity="0.1" /></svg>,
    'econ-strata-3': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 50 H 100 M 0 55 H 100" stroke={c} strokeWidth="1.2" opacity="0.05" /></svg>,
    'econ-strata-4': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 70 H 100 M 0 75 H 100" stroke={c} strokeWidth="0.8" opacity="0.1" /></svg>,
    'econ-strata-5': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 90 H 100 M 0 95 H 100" stroke={c} strokeWidth="0.5" opacity="0.2" /></svg>,
    'econ-strata-6': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M10 0 V 100 M 15 0 V 100" stroke={c} strokeWidth="0.3" opacity="0.1" /></svg>,
    'econ-strata-7': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M50 0 V 100 M 55 0 V 100" stroke={c} strokeWidth="0.5" opacity="0.05" /></svg>,
    'econ-strata-8': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M90 0 V 100 M 95 0 V 100" stroke={c} strokeWidth="0.3" opacity="0.1" /></svg>,
    'econ-strata-9': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 0 L 10 10 M 90 90 L 100 100" stroke={c} strokeWidth="2" opacity="0.1" /></svg>,
    'econ-strata-10': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M90 0 L 100 10 M 0 90 L 10 100" stroke={c} strokeWidth="2" opacity="0.1" /></svg>,

    // 4. ECON GLOBAL (Network & Trade)
    'econ-global-1': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><circle cx="50" cy="50" r="40" stroke={c} strokeWidth="0.2" fill="none" opacity="0.3" /></svg>,
    'econ-global-2': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><circle cx="50" cy="50" r="30" stroke={c} strokeWidth="0.4" fill="none" opacity="0.2" /></svg>,
    'econ-global-3': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><circle cx="50" cy="50" r="20" stroke={c} strokeWidth="0.6" fill="none" opacity="0.1" /></svg>,
    'econ-global-4': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><ellipse cx="50" cy="50" rx="45" ry="15" stroke={c} strokeWidth="0.3" fill="none" opacity="0.3" /></svg>,
    'econ-global-5': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><ellipse cx="50" cy="50" rx="15" ry="45" stroke={c} strokeWidth="0.3" fill="none" opacity="0.3" /></svg>,
    'econ-global-6': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M10 50 A 40 40 0 0 1 90 50" stroke={c} strokeWidth="0.5" fill="none" opacity="0.4" /></svg>,
    'econ-global-7': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M10 50 A 40 40 0 0 0 90 50" stroke={c} strokeWidth="0.5" fill="none" opacity="0.4" /></svg>,
    'econ-global-8': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M50 10 A 40 40 0 0 1 50 90" stroke={c} strokeWidth="0.5" fill="none" opacity="0.4" /></svg>,
    'econ-global-9': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M50 10 A 40 40 0 0 0 50 90" stroke={c} strokeWidth="0.5" fill="none" opacity="0.4" /></svg>,
    'econ-global-10': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><circle cx="10" cy="10" r="5" fill={c} opacity="0.2" /><circle cx="90" cy="90" r="5" fill={c} opacity="0.2" /></svg>,

    // 5. ECON PULSE (Volatility & Energy)
    'econ-pulse-1': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 50 L 20 50 L 25 30 L 35 70 L 40 50 L 100 50" stroke={c} strokeWidth="0.5" fill="none" opacity="0.4" /></svg>,
    'econ-pulse-2': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 50 L 40 50 L 45 10 L 55 90 L 60 50 L 100 50" stroke={c} strokeWidth="0.8" fill="none" opacity="0.3" /></svg>,
    'econ-pulse-3': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 50 T 25 30 T 50 50 T 75 70 T 100 50" stroke={c} strokeWidth="1" fill="none" opacity="0.2" /></svg>,
    'econ-pulse-4': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 50 C 20 0 30 100 50 50 S 80 0 100 50" stroke={c} strokeWidth="0.5" fill="none" opacity="0.4" /></svg>,
    'econ-pulse-5': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 20 L 100 80 M 0 80 L 100 20" stroke={c} strokeWidth="0.2" opacity="0.3" /></svg>,
    'econ-pulse-6': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M50 0 Q 0 50 50 100 Q 100 50 50 0" stroke={c} strokeWidth="0.3" fill="none" opacity="0.3" /></svg>,
    'econ-pulse-7': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 0 L 20 0 V 20 H 0 Z" fill={c} opacity="0.1" /><path d="M80 80 L 100 80 V 100 H 80 Z" fill={c} opacity="0.1" /></svg>,
    'econ-pulse-8': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M10 50 H 90" stroke={c} strokeWidth="5" opacity="0.05" /></svg>,
    'econ-pulse-9': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M50 10 V 90" stroke={c} strokeWidth="5" opacity="0.05" /></svg>,
    'econ-pulse-10': (s, c) => <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><circle cx="50" cy="50" r="5" fill={c} opacity="0.5" /></svg>,

    // Fallback for missing
    'none': () => null,
};
