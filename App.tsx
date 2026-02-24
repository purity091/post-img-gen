import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import CardPreview from './components/CardPreview';
import { CardData, PRESET_THEMES, PatternType } from './types';
import { generateInvestmentTitle } from './services/geminiService';

import { PRO_LOGOS } from './components/LogoAssets';
import './App.css';

const PATTERN_CATEGORIES = [
  {
    id: 'econ-wind',
    label: 'Market Winds 🌬️',
    options: Array.from({ length: 10 }, (_, i) => ({ id: `econ-wind-${i + 1}`, label: `Wind ${i + 1}`, icon: '🎐' }))
  },
  {
    id: 'econ-vector',
    label: 'Wealth Vectors 📈',
    options: Array.from({ length: 10 }, (_, i) => ({ id: `econ-vector-${i + 1}`, label: `Vect ${i + 1}`, icon: '🏹' }))
  },
  {
    id: 'econ-strata',
    label: 'Market Strata ⚖️',
    options: Array.from({ length: 10 }, (_, i) => ({ id: `econ-strata-${i + 1}`, label: `Strat ${i + 1}`, icon: '🥪' }))
  },
  {
    id: 'econ-global',
    label: 'Global Capital 🌍',
    options: Array.from({ length: 10 }, (_, i) => ({ id: `econ-global-${i + 1}`, label: `Glob ${i + 1}`, icon: '🌏' }))
  },
  {
    id: 'econ-pulse',
    label: 'Macro Pulse ⚡',
    options: Array.from({ length: 10 }, (_, i) => ({ id: `econ-pulse-${i + 1}`, label: `Pulse ${i + 1}`, icon: '🩺' }))
  },
  {
    id: 'artistic',
    label: 'Artistic Lines 🖋️',
    options: [
      { id: 'aurora-lines', label: 'Aurora', icon: '🪄' },
      { id: 'cosmic-flow', label: 'Cosmic', icon: '🌌' },
      { id: 'abstract-curves', label: 'Curves', icon: '〰️' },
      { id: 'tech-orbit', label: 'Orbit', icon: '🪐' },
      { id: 'zenith-rays', label: 'Zenith', icon: '☀️' },
      { id: 'dynamic-ribbon', label: 'Ribbon', icon: '🎗️' },
      { id: 'urban-sketch', label: 'Sketch', icon: '✍️' },
      { id: 'fused-wires', label: 'Wires', icon: '🕸️' },
      { id: 'minimal-pulse', label: 'Pulse', icon: '📉' },
      { id: 'wave-motion', label: 'Motion', icon: '🌊' },
    ]
  },
  {
    id: 'creative',
    label: 'Premium & Creative ✨',
    options: [
      { id: 'pulse-rings', label: 'Pulse', icon: '🔘' },
      { id: 'dna-helix', label: 'DNA', icon: '🧬' },
      { id: 'constellation', label: 'Stars', icon: '✨' },
      { id: 'liquid-flow', label: 'Liquid', icon: '💧' },
      { id: 'data-stream', label: 'Stream', icon: '🏁' },
      { id: 'blueprint', label: 'Bluep.', icon: '📐' },
      { id: 'quantum-grid', label: 'Quant.', icon: '💠' },
      { id: 'topographic', label: 'Topo.', icon: '🗺️' },
      { id: 'crystal', label: 'Crys.', icon: '💎' },
      { id: 'radiant-fiber', label: 'Radiant', icon: '📡' },
    ]
  },
  {
    id: 'human',
    label: 'Human & Organic',
    options: [
      { id: 'organic-blob', label: 'Soft Circle', icon: '☁️' },
      { id: 'waves-flow', label: 'Flow', icon: '🌊' }
    ]
  },
  {
    id: 'basic',
    label: 'أشكال أساسية',
    options: [
      { id: 'none', icon: '✕', label: 'None' },
      { id: 'circles', icon: '○', label: 'Circles' },
      { id: 'dots', icon: '::', label: 'Dots' },
      { id: 'grid', icon: '▦', label: 'Grid' },
      { id: 'waves', icon: '≈', label: 'Waves' },
      { id: 'hexagons', icon: '⬡', label: 'Hex' },
      { id: 'diagonal', icon: '╱', label: 'Diag' },
      { id: 'plus', icon: '+', label: 'Plus' },
      { id: 'mesh', icon: '#', label: 'Mesh' },
    ]
  },
  {
    id: 'abstract',
    label: 'Abstract',
    options: [
      { id: 'waves-flow', icon: '🌊', label: 'Flow' },
      { id: 'cubes', icon: '🧊', label: 'Cubes' },
      { id: 'prism', icon: '💎', label: 'Prism' },
      { id: 'noise', icon: '░', label: 'Noise' },
      { id: 'lines-diag', icon: '///', label: 'Lines' },
      { id: 'hexagons-3d', icon: '📦', label: '3D Hex' },
      { id: 'triangles-net', icon: '📐', label: 'Tri Net' },
      { id: 'circles-concentric', icon: '◎', label: 'Concentric' },
    ]
  },
  {
    id: 'texture',
    label: 'Texture',
    options: [
      { id: 'halftone', icon: '▒', label: 'Halftone' },
      { id: 'dots-scatter', icon: '⁖', label: 'Scatter' },
      { id: 'grid-dotted', icon: '::::', label: 'Dot Grid' },
      { id: 'lines-vertical', icon: '|||', label: 'Vertical' },
      { id: 'grunge', icon: '▓', label: 'Grunge' },
    ]
  }
];

const BLEND_MODES = ['normal', 'multiply', 'overlay', 'screen', 'darken', 'color-burn', 'hard-light', 'soft-light'];



const MASTER_INDICATORS = [
  // --- 1. Macro Dynamics & Sovereign Flow (الديناميكيات الكلية) ---
  { id: 'mkt-bull', icon: '📈', label: 'زخم التدفقات الرأسمالية', value: 'تجميع مؤسساتي', type: 'primary', trend: 'up', color: '#10b981' },
  { id: 'mkt-bear', icon: '📉', label: 'فلترة المسار التصحيحي', value: 'إعادة توازن', type: 'primary', trend: 'down', color: '#ef4444' },
  { id: 'mkt-vol', icon: '⚡', label: 'سيولة المراكز الاستراتيجية', value: 'تدفقات ذكية', type: 'secondary', trend: 'neutral', color: '#f59e0b' },
  { id: 'mkt-stable', icon: '🛡️', label: 'نقطة التعادل السوقي', value: 'استقرار هيكلي', type: 'secondary', trend: 'neutral', color: '#3b82f6' },
  { id: 'macro-pivot', icon: '🎯', label: 'نقطة التحول الهيكلية', value: 'ارتكاز سيادي', type: 'primary', trend: 'up' },
  { id: 'macro-yield', icon: '🌾', label: 'محصول العائد الاستثماري', value: 'نمو مستدام', type: 'primary', trend: 'up' },
  { id: 'macro-cycles', icon: '🔄', label: 'دورة التدفق الزمنية', value: 'توسع استراتيجي', type: 'secondary' },

  // --- 2. Institutional Mastery (السيادة المؤسساتية) ---
  { id: 'inst-depth', icon: '🌊', label: 'عمق المحافظ الكبرى', value: 'تمركز قيادي', type: 'primary', trend: 'up', color: '#8b5cf6' },
  { id: 'inst-whale', icon: '🐋', label: 'تتبع كبار الملاك', value: 'استحواذ هادئ', type: 'primary', trend: 'neutral' },
  { id: 'inst-flow', icon: '🌪️', label: 'توربينات السيولة الضخمة', value: 'دفع مؤسساتي', type: 'primary', trend: 'up' },
  { id: 'inst-exit', icon: '🚪', label: 'مسار التخارج الاحترافي', value: 'تسييل منظم', type: 'secondary', trend: 'down' },
  { id: 'inst-entry', icon: '🔑', label: 'مفتاح الدخول النوعي', value: 'اقتناص فرص', type: 'primary', trend: 'up' },

  // --- 3. Behavioral Analysis & Sentiment (السلوك والمزاج) ---
  { id: 'sent-fear', icon: '😰', label: 'ميزان سيكولوجية الاستثمار', value: 'طمع مؤسساتي', type: 'primary', trend: 'up', color: '#f59e0b' },
  { id: 'sent-analyst', icon: '👨‍🔬', label: 'الإجماع البحثي الموحد', value: 'تمركز شرائي', type: 'primary' },
  { id: 'sent-euphoria', icon: '🌈', label: 'مؤشر التفاؤل المفرط', value: 'ذروة الطلب', type: 'secondary', trend: 'up' },
  { id: 'sent-panic', icon: '⛔', label: 'فلترة الهلع البيعي', value: 'امتصاص الضغط', type: 'primary', trend: 'down' },
  { id: 'sent-logic', icon: '🧠', label: 'بوصلة العقلانية المالية', value: 'قرار متزن', type: 'secondary' },

  // --- 4. Technical Precision & Geometry (الدقة الهندسية) ---
  { id: 'tech-rsi', icon: '📏', label: 'بوصلة الزخم السعري', value: 'توازن القوى', type: 'primary', trend: 'neutral' },
  { id: 'tech-macd', icon: '➰', label: 'تقارب الاتجاهات الذكية', value: 'إيجابي هيكلي', type: 'primary', trend: 'up', color: '#10b981' },
  { id: 'tech-ema', icon: '〽️', label: 'مجال الدعم الديناميكي', value: 'ارتكاز قوي', type: 'secondary', trend: 'up' },
  { id: 'tech-fib', icon: '📐', label: 'هندسة النسب الذهبية', value: 'تصحيح نموذجي', type: 'passive' },
  { id: 'tech-ceiling', icon: '🏗️', label: 'سقف المقاومة الفنية', value: 'اختراق وشيك', type: 'primary', trend: 'up' },
  { id: 'tech-floor', icon: '🧱', label: 'أرضية الدعم الفولاذي', value: 'حماية القاع', type: 'primary' },

  // --- 5. Risk, Alpha & Resilience (المخاطر والمرونة) ---
  { id: 'risk-beta', icon: '⚖️', label: 'حساسية المخاطر السوقية', value: 'مرونة عالية', type: 'secondary', trend: 'neutral' },
  { id: 'risk-alpha', icon: '🏆', label: 'عائد التفوق الاستراتيجي', value: 'أداء استثنائي', type: 'primary', trend: 'up', color: '#10b981' },
  { id: 'risk-hedge', icon: '⛱️', label: 'مظلة التحوط السيادي', value: 'وقاية مالية', type: 'secondary', trend: 'neutral' },
  { id: 'risk-vol', icon: '💥', label: 'انفجار التقلبات الكامنة', value: 'حركة وشيكة', type: 'primary', trend: 'neutral' },
  { id: 'risk-shield', icon: '🛡️', label: 'درع حماية المحفظة', value: 'تحصين رأس المال', type: 'secondary' },


  // --- 7. Future Horizons & Prophecy (آفاق مستقبلية) ---
  { id: 'fut-vision', icon: '🔭', label: 'منظار الرؤية المستقبلية', value: 'أهداف بعلامات', type: 'primary', trend: 'up' },
  { id: 'fut-breakout', icon: '🔥', label: 'إشارة انفجار سعري', value: 'تجاوز الحواجز', type: 'primary', trend: 'up', color: '#f59e0b' },
  { id: 'fut-bluechip', icon: '💠', label: 'مسار العمالقة القادم', value: 'نمو ريادي', type: 'primary' },
  { id: 'fut-tech', icon: '🚀', label: 'ريادة التكنولوجيا العميقة', value: 'تحول جذري', type: 'primary', trend: 'up' },

  // --- 8. Market Liquidity Footprint (بصمة السيولة) ---
  { id: 'stat-vol', icon: '📶', label: 'بصمة السيولة المتداولة', value: 'تدفق قياسي', type: 'primary', trend: 'up' },
  { id: 'stat-cap', icon: '🏙️', label: 'حجم السيادة السوقية', value: 'ضخامة رأسمالية', type: 'primary' },
  { id: 'stat-float', icon: '🌊', label: 'المعروض النقدي المتاح', value: 'وفرة مالية', type: 'passive' },
  { id: 'stat-dry', icon: '🌵', label: 'مؤشر جفاف السيولة', value: 'تراجع النشاط', type: 'secondary', trend: 'down' },
  { id: 'stat-absorb', icon: '🧽', label: 'قدرة امتصاص العروض', value: 'قوة شرائية', type: 'primary', trend: 'up' },

  // --- 9. Advanced Strategic Indicators (استراتيجيات متقدمة) ---
  { id: 'strat-momentum', icon: '🌪️', label: 'زخم تدفق الأرباح', value: 'نمو متسارع', type: 'primary', trend: 'up', color: '#10b981' },
  { id: 'strat-rotation', icon: '🔄', label: 'دوران السيولة القطاعية', value: 'تغيير مراكز', type: 'secondary', trend: 'neutral' },
  { id: 'strat-smart-cap', icon: '🧙', label: 'تمركز رؤوس الأموال الذكية', value: 'تجميع خفي', type: 'primary', trend: 'up' },
  { id: 'strat-alpha-gen', icon: '🏭', label: 'مصنع توليد العوائد', value: 'كفاءة تشغيلية', type: 'primary' },
  { id: 'strat-resilience', icon: '🧱', label: 'اختبار صلابة المراكز', value: 'ثبات هيكلي', type: 'secondary' },

  // --- 10. Industry & Sector Lead (القيادة القطاعية) ---
  { id: 'sec-energy', icon: '⚡', label: 'أمن الطاقة العالمي', value: 'تفوّق نفطي', type: 'primary' },
  { id: 'sec-infra', icon: '🌉', label: 'قاعدة البنية التحتية', value: 'أصول صلبة', type: 'secondary' },
  { id: 'sec-digital', icon: '📱', label: 'التحول الرقمي الشامل', value: 'رقمنة اقتصادية', type: 'primary', trend: 'up' },
  { id: 'sec-logistics', icon: '📦', label: 'شريان الإمداد اللوجستي', value: 'تدفق لوجستي', type: 'secondary' }
] as const;

const PROFESSIONAL_THEMES = [
  // --- 1. Brand Core System (The Identity) ---
  {
    id: 'brand-hero',
    name: 'Brand Hero (Dark)',
    backgroundGradient: 'linear-gradient(to right, #0B0F2B 0%, #12163A 60%, #1A1F4D 100%)',
    accentColor: '#00E5C4', labelColor: '#9CA3AF', titleColor: '#FFFFFF', // Body Dark
    borderColor: '#1E293B', // Dark Border
    glassOpacity: 0.1
  },
  {
    id: 'brand-light',
    name: 'Surface (Light)',
    backgroundGradient: 'linear-gradient(to right, #FFFFFF 0%, #F5F7FB 100%)',
    accentColor: '#00E5C4', labelColor: '#6B7280', titleColor: '#0B0F2B', borderColor: '#E6EAF0'
  },
  {
    id: 'accent-turquoise',
    name: 'Turquoise Flow',
    backgroundGradient: 'linear-gradient(to right, #00E5C4 0%, #00D1B2 50%, #00BFA5 100%)',
    accentColor: '#FFFFFF', labelColor: '#ccfbf1', titleColor: '#ffffff', borderColor: '#00BFA5'
  },
  {
    id: 'accent-highlight',
    name: 'Highlight Mix',
    backgroundGradient: 'linear-gradient(to right, #00E5C4 0%, #7C3AED 100%)',
    accentColor: '#FFFFFF', labelColor: '#e0e7ff', titleColor: '#ffffff', borderColor: '#7C3AED'
  },

  // --- 2. Executive Suite (Restored & Refined) ---
  {
    id: 'midnight-executive',
    name: 'Midnight Executive',
    backgroundGradient: 'linear-gradient(to right, #0f172a, #1e293b, #000000)',
    accentColor: '#2dd4bf', labelColor: '#cbd5e1', titleColor: '#ffffff', borderColor: '#334155'
  },
  {
    id: 'royal-amethyst',
    name: 'Royal Amethyst',
    backgroundGradient: 'linear-gradient(to right, #2e1065, #4c1d95, #000000)',
    accentColor: '#facc15', labelColor: '#e9d5ff', titleColor: '#ffffff', borderColor: '#581c87'
  },
  {
    id: 'corporate-slate',
    name: 'Corporate Slate',
    backgroundGradient: 'linear-gradient(to right, #334155, #475569, #1e293b)',
    accentColor: '#38bdf8', labelColor: '#cbd5e1', titleColor: '#ffffff', borderColor: '#475569'
  },
  {
    id: 'emerald-prestige',
    name: 'Emerald Prestige',
    backgroundGradient: 'linear-gradient(to right, #064e3b, #065f46, #022c22)',
    accentColor: '#34d399', labelColor: '#a7f3d0', titleColor: '#ffffff', borderColor: '#065f46'
  },
  {
    id: 'crimson-elite',
    name: 'Crimson Elite',
    backgroundGradient: 'linear-gradient(to right, #7f1d1d, #991b1b, #450a0a)',
    accentColor: '#f87171', labelColor: '#fca5a5', titleColor: '#ffffff', borderColor: '#991b1b'
  },
  {
    id: 'obsidian-minimal',
    name: 'Obsidian Minimal',
    backgroundGradient: 'linear-gradient(to right, #000000, #111111, #000000)',
    accentColor: '#ffffff', labelColor: '#a3a3a3', titleColor: '#ffffff', borderColor: '#262626'
  },

  // --- 3. Apple Design Collection ---
  {
    id: 'apple-titanium',
    name: 'Titanium Pro',
    backgroundGradient: 'linear-gradient(to right, #47474a 0%, #88888b 50%, #47474a 100%)',
    accentColor: '#d6d3d1', labelColor: '#e5e7eb', titleColor: '#ffffff', borderColor: '#52525b'
  },
  {
    id: 'apple-sierra',
    name: 'Sierra Blue',
    backgroundGradient: 'linear-gradient(to right, #58788C, #7A96A8, #9DB4C0)',
    accentColor: '#bfdbfe', labelColor: '#e0f2fe', titleColor: '#ffffff', borderColor: '#7A96A8'
  },
  {
    id: 'apple-purple',
    name: 'Deep Purple',
    backgroundGradient: 'linear-gradient(to right, #251830, #32233E, #4A3B56)',
    accentColor: '#e9d5ff', labelColor: '#f3e8ff', titleColor: '#ffffff', borderColor: '#581c87'
  },
  {
    id: 'apple-alpine',
    name: 'Alpine Green',
    backgroundGradient: 'linear-gradient(to right, #1A221B, #2C392E, #3E4D40)',
    accentColor: '#86efac', labelColor: '#dcfce7', titleColor: '#ffffff', borderColor: '#14532d'
  },
  {
    id: 'apple-sunset',
    name: 'Sunset Gold',
    backgroundGradient: 'linear-gradient(to right, #D1B394, #E8CDB0, #F5DDC5)',
    accentColor: '#fb923c', labelColor: '#78350f', titleColor: '#451a03', borderColor: '#d6d3d1'
  },

  // --- 4. Luxury & Precious Metals ---
  {
    id: 'lux-gold',
    name: 'Solid Gold',
    backgroundGradient: 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
    accentColor: '#FFFFFF', labelColor: '#78350f', titleColor: '#381c04', borderColor: '#DAA520'
  },
  {
    id: 'lux-platinum',
    name: 'Platinum Elite',
    backgroundGradient: 'linear-gradient(to right, #2C3E50, #4CA1AF)',
    accentColor: '#E0E0E0', labelColor: '#f1f5f9', titleColor: '#ffffff', borderColor: '#2C3E50'
  },
  {
    id: 'lux-rose',
    name: 'Rose Gold',
    backgroundGradient: 'linear-gradient(to right, #B76E79, #E6C2BF, #B76E79)',
    accentColor: '#FFF0F5', labelColor: '#4a044e', titleColor: '#ffffff', borderColor: '#9d174d'
  },

  // --- 5. Digital & Vanguard ---
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    backgroundGradient: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
    accentColor: '#00f260', labelColor: '#c084fc', titleColor: '#ffffff', borderColor: '#7c3aed'
  },
  {
    id: 'digital-ocean',
    name: 'Digital Ocean',
    backgroundGradient: 'linear-gradient(to right, #43cea2, #185a9d)',
    accentColor: '#ffffff', labelColor: '#e0f2fe', titleColor: '#ffffff', borderColor: '#0ea5e9'
  },
  {
    id: 'electric-violet',
    name: 'Electric Violet',
    backgroundGradient: 'linear-gradient(to right, #4776E6, #8E54E9)',
    accentColor: '#ffffff', labelColor: '#e9d5ff', titleColor: '#ffffff', borderColor: '#7c3aed'
  },

  // --- 6. Human Centric (Calm Finance) ---
  {
    id: 'human-calm',
    name: 'Calm Humanity',
    // Gradient: Peach to White (Warm & Clean)
    backgroundGradient: 'linear-gradient(90deg, #FDE6D3 0%, #FAF7F3 45%, #FFFFFF 70%)',
    accentColor: '#52525b', // Dark Grey for text contrast (Calm)
    labelColor: '#78716c', // Stone 500
    titleColor: '#292524', // Stone 800
    bodyColor: '#44403c', // Stone 700
    borderColor: '#e7e5e4', // Stone 200
  },

  // --- 7. LUXURY EXPANSION (30+ Options - Color to White Fade) ---

  // A. PRECIOUS METALS (Soft)
  {
    id: 'lux-champagne', name: 'Champagne Silk',
    backgroundGradient: 'linear-gradient(90deg, #F7E7CE 0%, #FAF5EF 45%, #FFFFFF 70%)',
    accentColor: '#BFA05F', labelColor: '#78716c', titleColor: '#451a03', borderColor: '#e7e5e4'
  },
  {
    id: 'lux-silver-mist', name: 'Silver Mist',
    backgroundGradient: 'linear-gradient(90deg, #D4D4D8 0%, #E4E4E7 45%, #FFFFFF 70%)',
    accentColor: '#52525b', labelColor: '#71717a', titleColor: '#18181b', borderColor: '#e4e4e7'
  },
  {
    id: 'lux-rose-gold-light', name: 'Rose Gold Air',
    backgroundGradient: 'linear-gradient(90deg, #FECDD3 0%, #FFE4E6 45%, #FFF1F2 70%)',
    accentColor: '#E11D48', labelColor: '#9f1239', titleColor: '#881337', borderColor: '#fecdd3'
  },
  {
    id: 'lux-antique-bronze', name: 'Antique Bronze',
    backgroundGradient: 'linear-gradient(90deg, #E7CBA9 0%, #F5E6D3 45%, #FFFFFF 70%)',
    accentColor: '#78350F', labelColor: '#92400e', titleColor: '#451a03', borderColor: '#f3e8ff'
  },
  {
    id: 'lux-white-gold', name: 'White Gold',
    backgroundGradient: 'linear-gradient(90deg, #F1F5F9 0%, #F8FAFC 45%, #FFFFFF 70%)',
    accentColor: '#64748B', labelColor: '#475569', titleColor: '#0f172a', borderColor: '#e2e8f0'
  },

  // B. GEMSTONES (Soft/Pastel)
  {
    id: 'gem-pearl', name: 'Pearl Lustre',
    backgroundGradient: 'linear-gradient(90deg, #F3F4F6 0%, #F9FAFB 45%, #FFFFFF 70%)',
    accentColor: '#9CA3AF', labelColor: '#6b7280', titleColor: '#111827', borderColor: '#e5e7eb'
  },
  {
    id: 'gem-aquamarine', name: 'Aquamarine Mist',
    backgroundGradient: 'linear-gradient(90deg, #CFFAFE 0%, #ECFEFF 45%, #FFFFFF 70%)',
    accentColor: '#0891B2', labelColor: '#155e75', titleColor: '#164e63', borderColor: '#cffafe'
  },
  {
    id: 'gem-jade-soft', name: 'Jade Soft',
    backgroundGradient: 'linear-gradient(90deg, #D1FAE5 0%, #E2E8F0 45%, #FFFFFF 70%)',
    accentColor: '#059669', labelColor: '#065f46', titleColor: '#022c22', borderColor: '#d1fae5'
  },
  {
    id: 'gem-moonstone', name: 'Moonstone Glow',
    backgroundGradient: 'linear-gradient(90deg, #E0E7FF 0%, #EEF2FF 45%, #FFFFFF 70%)',
    accentColor: '#6366F1', labelColor: '#4338ca', titleColor: '#312e81', borderColor: '#e0e7ff'
  },
  {
    id: 'gem-opal', name: 'Opal Fire',
    backgroundGradient: 'linear-gradient(90deg, #FAE8FF 0%, #F5F3FF 45%, #FFFFFF 70%)',
    accentColor: '#C084FC', labelColor: '#7e22ce', titleColor: '#581c87', borderColor: '#fae8ff'
  },

  // C. ORGANIC LUXURY
  {
    id: 'org-sand', name: 'Sand Dune',
    backgroundGradient: 'linear-gradient(90deg, #E5E5E5 0%, #F5F5F5 45%, #FFFFFF 70%)', // Beige-Grey
    accentColor: '#737373', labelColor: '#525252', titleColor: '#171717', borderColor: '#e5e5e5'
  },
  {
    id: 'org-linen', name: 'Linen Fiber',
    backgroundGradient: 'linear-gradient(90deg, #F0EBE3 0%, #F7F5F2 45%, #FFFFFF 70%)',
    accentColor: '#8D8271', labelColor: '#5D5448', titleColor: '#2B2621', borderColor: '#e6ded5'
  },
  {
    id: 'org-olive', name: 'Olive Grove',
    backgroundGradient: 'linear-gradient(90deg, #ECFCCB 0%, #F7FEE7 45%, #FFFFFF 70%)',
    accentColor: '#65A30D', labelColor: '#3f6212', titleColor: '#1a2e05', borderColor: '#ecfccb'
  },
  {
    id: 'org-vanilla', name: 'Vanilla Bean',
    backgroundGradient: 'linear-gradient(90deg, #FEF3C7 0%, #FFFBEB 45%, #FFFFFF 70%)',
    accentColor: '#D97706', labelColor: '#92400e', titleColor: '#451a03', borderColor: '#fef3c7'
  },
  {
    id: 'org-clay', name: 'Terracotta Fade',
    backgroundGradient: 'linear-gradient(90deg, #FFEDD5 0%, #FFF7ED 45%, #FFFFFF 70%)',
    accentColor: '#EA580C', labelColor: '#9a3412', titleColor: '#7c2d12', borderColor: '#ffedd5'
  },

  // D. MODERN & CORPORATE
  {
    id: 'mod-graphite', name: 'Graphite Air',
    backgroundGradient: 'linear-gradient(90deg, #CBD5E1 0%, #E2E8F0 45%, #FFFFFF 70%)',
    accentColor: '#475569', labelColor: '#334155', titleColor: '#0f172a', borderColor: '#cbd5e1'
  },
  {
    id: 'mod-blue', name: 'Executive Blue',
    backgroundGradient: 'linear-gradient(90deg, #DBEAFE 0%, #EFF6FF 45%, #FFFFFF 70%)',
    accentColor: '#2563EB', labelColor: '#1e40af', titleColor: '#1e3a8a', borderColor: '#dbeafe'
  },
  {
    id: 'mod-slate', name: 'Slate Foundation',
    backgroundGradient: 'linear-gradient(90deg, #E2E8F0 0%, #F1F5F9 45%, #FFFFFF 70%)',
    accentColor: '#64748B', labelColor: '#475569', titleColor: '#0f172a', borderColor: '#e2e8f0'
  },
  {
    id: 'mod-lavender', name: 'Lavender Haze',
    backgroundGradient: 'linear-gradient(90deg, #F3E8FF 0%, #FAF5FF 45%, #FFFFFF 70%)',
    accentColor: '#9333EA', labelColor: '#6b21a8', titleColor: '#3b0764', borderColor: '#f3e8ff'
  },
  {
    id: 'mod-mint', name: 'Mint Capital',
    backgroundGradient: 'linear-gradient(90deg, #CCFBF1 0%, #F0FDFA 45%, #FFFFFF 70%)',
    accentColor: '#0D9488', labelColor: '#115e59', titleColor: '#134e4a', borderColor: '#ccfbf1'
  },

  // E. VIBRANT LUXURY
  {
    id: 'vib-coral', name: 'Coral Living',
    backgroundGradient: 'linear-gradient(90deg, #FFE4E6 0%, #FFF1F2 45%, #FFFFFF 70%)',
    accentColor: '#E11D48', labelColor: '#9f1239', titleColor: '#881337', borderColor: '#ffe4e6'
  },
  {
    id: 'vib-sky', name: 'Sky High',
    backgroundGradient: 'linear-gradient(90deg, #E0F2FE 0%, #F0F9FF 45%, #FFFFFF 70%)',
    accentColor: '#0284C7', labelColor: '#075985', titleColor: '#0c4a6e', borderColor: '#e0f2fe'
  },
  {
    id: 'vib-sunset', name: 'Soft Sunset',
    backgroundGradient: 'linear-gradient(90deg, #FFDEDE 0%, #FFEEEE 45%, #FFFFFF 70%)',
    accentColor: '#F43F5E', labelColor: '#be123c', titleColor: '#881337', borderColor: '#ffdede'
  },
  {
    id: 'vib-lime', name: 'Lime Zest',
    backgroundGradient: 'linear-gradient(90deg, #ECFCCB 0%, #F7FEE7 45%, #FFFFFF 70%)',
    accentColor: '#65A30D', labelColor: '#3f6212', titleColor: '#1a2e05', borderColor: '#ecfccb'
  },
  {
    id: 'vib-lemon', name: 'Lemon Chiffon',
    backgroundGradient: 'linear-gradient(90deg, #FEF3C7 0%, #FFFBEB 45%, #FFFFFF 70%)',
    accentColor: '#D97706', labelColor: '#92400e', titleColor: '#451a03', borderColor: '#fef3c7'
  },

  // F. DEEP ACCENTS
  {
    id: 'deep-cherry', name: 'Cherry Blossom',
    backgroundGradient: 'linear-gradient(90deg, #FCE7F3 0%, #FDF2F8 45%, #FFFFFF 70%)',
    accentColor: '#DB2777', labelColor: '#9d174d', titleColor: '#831843', borderColor: '#fce7f3'
  },

  // --- 8. DARK LUXURY (High Contrast w/ Black Fade) ---

  // A. MIDNIGHT METALS
  {
    id: 'dark-gold', name: 'Black Gold',
    backgroundGradient: 'linear-gradient(90deg, #78350F 0%, #451a03 45%, #000000 85%)',
    accentColor: '#F59E0B', labelColor: '#d1d5db', titleColor: '#FFFFFF', borderColor: '#78350f'
  },
  {
    id: 'dark-gunmetal', name: 'Gunmetal Void',
    backgroundGradient: 'linear-gradient(90deg, #374151 0%, #111827 45%, #000000 85%)',
    accentColor: '#94A3B8', labelColor: '#e5e7eb', titleColor: '#FFFFFF', borderColor: '#374151'
  },
  {
    id: 'dark-bronze', name: 'Deep Bronze',
    backgroundGradient: 'linear-gradient(90deg, #431407 0%, #2a0a04 45%, #000000 85%)',
    accentColor: '#D97706', labelColor: '#e5e5e5', titleColor: '#FFFFFF', borderColor: '#431407'
  },
  {
    id: 'dark-silver', name: 'Obsidian Silver',
    backgroundGradient: 'linear-gradient(90deg, #1F2937 0%, #030712 45%, #000000 85%)',
    accentColor: '#E2E8F0', labelColor: '#f3f4f6', titleColor: '#FFFFFF', borderColor: '#1f2937'
  },
  {
    id: 'dark-platinum', name: 'Midnight Platinum',
    backgroundGradient: 'linear-gradient(90deg, #334155 0%, #0F172A 45%, #000000 85%)',
    accentColor: '#CBD5E1', labelColor: '#f1f5f9', titleColor: '#FFFFFF', borderColor: '#334155'
  },

  // B. NOCTURNAL GEMS
  {
    id: 'dark-emerald', name: 'Emerald Shadow',
    backgroundGradient: 'linear-gradient(90deg, #064E3B 0%, #022c22 45%, #000000 85%)',
    accentColor: '#34D399', labelColor: '#d1fae5', titleColor: '#FFFFFF', borderColor: '#064e3b'
  },
  {
    id: 'dark-sapphire', name: 'Sapphire Night',
    backgroundGradient: 'linear-gradient(90deg, #1E3A8A 0%, #172554 45%, #000000 85%)',
    accentColor: '#60A5FA', labelColor: '#dbeafe', titleColor: '#FFFFFF', borderColor: '#1e3a8a'
  },
  {
    id: 'dark-ruby', name: 'Ruby Depth',
    backgroundGradient: 'linear-gradient(90deg, #881337 0%, #4c0519 45%, #000000 85%)',
    accentColor: '#FB7185', labelColor: '#ffe4e6', titleColor: '#FFFFFF', borderColor: '#881337'
  },
  {
    id: 'dark-amethyst', name: 'Amethyst Void',
    backgroundGradient: 'linear-gradient(90deg, #581C87 0%, #3b0764 45%, #000000 85%)',
    accentColor: '#C084FC', labelColor: '#f3e8ff', titleColor: '#FFFFFF', borderColor: '#581c87'
  },
  {
    id: 'dark-topaz', name: 'Topaz Dark',
    backgroundGradient: 'linear-gradient(90deg, #713F12 0%, #422006 45%, #000000 85%)',
    accentColor: '#FACC15', labelColor: '#fef9c3', titleColor: '#FFFFFF', borderColor: '#713f12'
  },

  // C. EXECUTIVE DARK
  {
    id: 'dark-navy', name: 'Presidential Navy',
    backgroundGradient: 'linear-gradient(90deg, #0B1120 0%, #020617 45%, #000000 100%)', // Almost full black
    accentColor: '#38BDF8', labelColor: '#e0f2fe', titleColor: '#FFFFFF', borderColor: '#0b1120'
  },
  {
    id: 'dark-charcoal', name: 'Charcoal Matte',
    backgroundGradient: 'linear-gradient(90deg, #262626 0%, #171717 45%, #000000 85%)',
    accentColor: '#A3A3A3', labelColor: '#e5e5e5', titleColor: '#FFFFFF', borderColor: '#262626'
  },
  {
    id: 'dark-slate-blue', name: 'Slate Abyss',
    backgroundGradient: 'linear-gradient(90deg, #0F172A 0%, #020617 45%, #000000 85%)',
    accentColor: '#94A3B8', labelColor: '#f1f5f9', titleColor: '#FFFFFF', borderColor: '#0f172a'
  },
  {
    id: 'dark-forest', name: 'Forest Deep',
    backgroundGradient: 'linear-gradient(90deg, #14532D 0%, #052e16 45%, #000000 85%)',
    accentColor: '#4ADE80', labelColor: '#dcfce7', titleColor: '#FFFFFF', borderColor: '#14532d'
  },
  {
    id: 'dark-plum', name: 'Plum Executive',
    backgroundGradient: 'linear-gradient(90deg, #4A044E 0%, #2e0231 45%, #000000 85%)',
    accentColor: '#E879F9', labelColor: '#fae8ff', titleColor: '#FFFFFF', borderColor: '#4a044e'
  },

  // D. COSMIC & NEON LUXURY
  {
    id: 'dark-cosmos', name: 'Deep Space',
    backgroundGradient: 'linear-gradient(90deg, #312E81 0%, #1e1b4b 45%, #000000 85%)',
    accentColor: '#818CF8', labelColor: '#e0e7ff', titleColor: '#FFFFFF', borderColor: '#312e81'
  },
  {
    id: 'dark-cyber', name: 'Cyber Noir',
    backgroundGradient: 'linear-gradient(90deg, #831843 0%, #500724 45%, #000000 85%)',
    accentColor: '#F472B6', labelColor: '#fce7f3', titleColor: '#FFFFFF', borderColor: '#831843'
  },
  {
    id: 'dark-aurora', name: 'Aurora Dark',
    backgroundGradient: 'linear-gradient(90deg, #115E59 0%, #042f2e 45%, #000000 85%)',
    accentColor: '#2DD4BF', labelColor: '#ccfbf1', titleColor: '#FFFFFF', borderColor: '#115e59'
  },
  {
    id: 'dark-sunset', name: 'Sunset Void',
    backgroundGradient: 'linear-gradient(90deg, #7C2D12 0%, #431407 45%, #000000 85%)',
    accentColor: '#FB923C', labelColor: '#ffedd5', titleColor: '#FFFFFF', borderColor: '#7c2d12'
  },
  {
    id: 'dark-royal', name: 'Royal Velvet',
    backgroundGradient: 'linear-gradient(90deg, #4C1D95 0%, #2e1065 45%, #000000 85%)',
    accentColor: '#A78BFA', labelColor: '#ede9fe', titleColor: '#FFFFFF', borderColor: '#4c1d95'
  },

  // E. EXOTIC DARK
  {
    id: 'dark-jungle', name: 'Jungle Night',
    backgroundGradient: 'linear-gradient(90deg, #064E3B 0%, #022c22 45%, #1a2e05 100%)',
    accentColor: '#A3E635', labelColor: '#ecfccb', titleColor: '#FFFFFF', borderColor: '#064e3b'
  },
  {
    id: 'dark-ocean', name: 'Abyssal Zone',
    backgroundGradient: 'linear-gradient(90deg, #0C4A6E 0%, #082f49 45%, #000000 85%)',
    accentColor: '#38BDF8', labelColor: '#e0f2fe', titleColor: '#FFFFFF', borderColor: '#0c4a6e'
  },
  {
    id: 'dark-wine', name: 'Vintage Wine',
    backgroundGradient: 'linear-gradient(90deg, #500724 0%, #3e041b 45%, #000000 85%)',
    accentColor: '#FDA4AF', labelColor: '#ffe4e6', titleColor: '#FFFFFF', borderColor: '#500724'
  },
  {
    id: 'dark-steel', name: 'Blue Steel',
    backgroundGradient: 'linear-gradient(90deg, #1E293B 0%, #0f172a 45%, #000000 85%)',
    accentColor: '#94A3B8', labelColor: '#f1f5f9', titleColor: '#FFFFFF', borderColor: '#1e293b'
  },
  {
    id: 'dark-copper', name: 'Oxidized Copper',
    backgroundGradient: 'linear-gradient(90deg, #0F766E 0%, #042f2e 45%, #000000 85%)',
    accentColor: '#5EEAD4', labelColor: '#ccfbf1', titleColor: '#FFFFFF', borderColor: '#0f766e'
  },

  // F. ULTRA DARK (Pitch Black Bases)
  {
    id: 'dark-vader', name: 'Vader Core',
    backgroundGradient: 'linear-gradient(90deg, #000000 0%, #111111 45%, #000000 100%)',
    accentColor: '#EF4444', labelColor: '#fee2e2', titleColor: '#FFFFFF', borderColor: '#333333'
  },
  {
    id: 'dark-matrix', name: 'Matrix Code',
    backgroundGradient: 'linear-gradient(90deg, #000000 0%, #022c22 45%, #000000 100%)',
    accentColor: '#22C55E', labelColor: '#dcfce7', titleColor: '#FFFFFF', borderColor: '#064e3b'
  },
  {
    id: 'dark-gold-rush', name: 'Gold Rush NB',
    backgroundGradient: 'linear-gradient(90deg, #000000 0%, #171717 45%, #000000 100%)',
    accentColor: '#EAB308', labelColor: '#fef9c3', titleColor: '#FFFFFF', borderColor: '#422006'
  },
  {
    id: 'dark-ice', name: 'Black Ice',
    backgroundGradient: 'linear-gradient(90deg, #000000 0%, #082f49 45%, #000000 100%)',
    accentColor: '#7DD3FC', labelColor: '#e0f2fe', titleColor: '#FFFFFF', borderColor: '#0c4a6e'
  },
  {
    id: 'dark-royal-plus', name: 'Majestic Dark',
    backgroundGradient: 'linear-gradient(90deg, #2E1065 0%, #000000 45%, #000000 100%)',
    accentColor: '#C4B5FD', labelColor: '#ede9fe', titleColor: '#FFFFFF', borderColor: '#2e1065'
  },
  {
    id: 'deep-indigo', name: 'Indigo Soft',
    backgroundGradient: 'linear-gradient(90deg, #E0E7FF 0%, #EEF2FF 45%, #FFFFFF 70%)',
    accentColor: '#4F46E5', labelColor: '#3730a3', titleColor: '#312e81', borderColor: '#e0e7ff'
  },
  {
    id: 'deep-teal', name: 'Teal Essence',
    backgroundGradient: 'linear-gradient(90deg, #CCFBF1 0%, #E0F2FE 45%, #FFFFFF 70%)',
    accentColor: '#0D9488', labelColor: '#115e59', titleColor: '#134e4a', borderColor: '#ccfbf1'
  },
  {
    id: 'deep-coffee', name: 'Coffee Roast',
    backgroundGradient: 'linear-gradient(90deg, #E7D5C5 0%, #F0E6DD 45%, #FFFFFF 70%)',
    accentColor: '#78350F', labelColor: '#451a03', titleColor: '#281203', borderColor: '#e7d5c5'
  },
  {
    id: 'deep-forest', name: 'Forest Mist',
    backgroundGradient: 'linear-gradient(90deg, #DCFCE7 0%, #F0FDF4 45%, #FFFFFF 70%)',
    accentColor: '#16A34A', labelColor: '#14532d', titleColor: '#052e16', borderColor: '#dcfce7'
  },

  // G. MODERN VIBRANT (Soft Gradients)
  {
    id: 'modern-peach', name: 'Sunset Peach',
    backgroundGradient: 'linear-gradient(90deg, #ffedd5 0%, #fff7ed 45%, #FFFFFF 70%)',
    accentColor: '#ea580c', labelColor: '#7c2d12', titleColor: '#431407', borderColor: '#ffedd5'
  },
  {
    id: 'modern-berry', name: 'Berry Delight',
    backgroundGradient: 'linear-gradient(90deg, #ffe4e6 0%, #fff1f2 45%, #FFFFFF 70%)',
    accentColor: '#e11d48', labelColor: '#881337', titleColor: '#4c0519', borderColor: '#ffe4e6'
  },
  {
    id: 'modern-lavender', name: 'Lavender Haze',
    backgroundGradient: 'linear-gradient(90deg, #f3e8ff 0%, #faf5ff 45%, #FFFFFF 70%)',
    accentColor: '#9333ea', labelColor: '#581c87', titleColor: '#3b0764', borderColor: '#f3e8ff'
  },
  {
    id: 'modern-sky', name: 'Sky Blue',
    backgroundGradient: 'linear-gradient(90deg, #e0f2fe 0%, #f0f9ff 45%, #FFFFFF 70%)',
    accentColor: '#0284c7', labelColor: '#075985', titleColor: '#0c4a6e', borderColor: '#e0f2fe'
  },
  {
    id: 'modern-mint', name: 'Mint Fresh',
    backgroundGradient: 'linear-gradient(90deg, #d1fae5 0%, #ecfdf5 45%, #FFFFFF 70%)',
    accentColor: '#059669', labelColor: '#064e3b', titleColor: '#022c22', borderColor: '#d1fae5'
  },
  {
    id: 'modern-lemon', name: 'Lemon Glow',
    backgroundGradient: 'linear-gradient(90deg, #fef9c3 0%, #fefce8 45%, #FFFFFF 70%)',
    accentColor: '#ca8a04', labelColor: '#713f12', titleColor: '#422006', borderColor: '#fef9c3'
  },
  {
    id: 'modern-coral', name: 'Coral Reef',
    backgroundGradient: 'linear-gradient(90deg, #ffccbc 0%, #fff3e0 45%, #FFFFFF 70%)',
    accentColor: '#e64a19', labelColor: '#bf360c', titleColor: '#3e2723', borderColor: '#ffccbc'
  },
  {
    id: 'modern-slate', name: 'Cool Slate',
    backgroundGradient: 'linear-gradient(90deg, #f1f5f9 0%, #f8fafc 45%, #FFFFFF 70%)',
    accentColor: '#475569', labelColor: '#334155', titleColor: '#0f172a', borderColor: '#f1f5f9'
  },
  {
    id: 'modern-violet', name: 'Electric Violet',
    backgroundGradient: 'linear-gradient(90deg, #ede9fe 0%, #f5f3ff 45%, #FFFFFF 70%)',
    accentColor: '#7c3aed', labelColor: '#4c1d95', titleColor: '#2e1065', borderColor: '#ede9fe'
  },
  {
    id: 'modern-aqua', name: 'Aqua Marine',
    backgroundGradient: 'linear-gradient(90deg, #cffafe 0%, #ecfeff 45%, #FFFFFF 70%)',
    accentColor: '#0891b2', labelColor: '#155e75', titleColor: '#164e63', borderColor: '#cffafe'
  },

  // H. EXPANDED PALETTE (30 NEW VIBRANT THEMES)
  // Reds & Pinks
  {
    id: 'mx-crimson', name: 'Crimson Tide',
    backgroundGradient: 'linear-gradient(90deg, #fee2e2 0%, #fecaca 45%, #FFFFFF 70%)',
    accentColor: '#dc2626', labelColor: '#7f1d1d', titleColor: '#450a0a', borderColor: '#fee2e2'
  },
  {
    id: 'mx-ruby', name: 'Ruby Shine',
    backgroundGradient: 'linear-gradient(90deg, #fff1f2 0%, #ffe4e6 45%, #FFFFFF 70%)',
    accentColor: '#be123c', labelColor: '#881337', titleColor: '#4c0519', borderColor: '#fff1f2'
  },
  {
    id: 'mx-rose', name: 'Soft Rose',
    backgroundGradient: 'linear-gradient(90deg, #fff0f7 0%, #ffeef5 45%, #FFFFFF 70%)',
    accentColor: '#e11d48', labelColor: '#9f1239', titleColor: '#881337', borderColor: '#fff0f7'
  },
  {
    id: 'mx-blush', name: 'Blush Pink',
    backgroundGradient: 'linear-gradient(90deg, #fdf2f8 0%, #fce7f3 45%, #FFFFFF 70%)',
    accentColor: '#db2777', labelColor: '#831843', titleColor: '#500724', borderColor: '#fdf2f8'
  },
  {
    id: 'mx-watermelon', name: 'Fresh Melon',
    backgroundGradient: 'linear-gradient(90deg, #ffeef2 0%, #ffcdd2 45%, #FFFFFF 70%)',
    accentColor: '#ff5252', labelColor: '#c62828', titleColor: '#b71c1c', borderColor: '#ffeef2'
  },

  // Oranges & Yellows
  {
    id: 'mx-tangerine', name: 'Tangerine Dream',
    backgroundGradient: 'linear-gradient(90deg, #ffedd5 0%, #fed7aa 45%, #FFFFFF 70%)',
    accentColor: '#f97316', labelColor: '#9a3412', titleColor: '#7c2d12', borderColor: '#ffedd5'
  },
  {
    id: 'mx-amber', name: 'Amber Glow',
    backgroundGradient: 'linear-gradient(90deg, #fffbeb 0%, #fef3c7 45%, #FFFFFF 70%)',
    accentColor: '#d97706', labelColor: '#92400e', titleColor: '#78350f', borderColor: '#fffbeb'
  },
  {
    id: 'mx-marigold', name: 'Marigold Petal',
    backgroundGradient: 'linear-gradient(90deg, #fefce8 0%, #fef9c3 45%, #FFFFFF 70%)',
    accentColor: '#eab308', labelColor: '#854d0e', titleColor: '#713f12', borderColor: '#fefce8'
  },
  {
    id: 'mx-champagne', name: 'Champagne Gold',
    backgroundGradient: 'linear-gradient(90deg, #fafaf9 0%, #f5f5f4 45%, #FFFFFF 70%)',
    accentColor: '#b45309', labelColor: '#78350f', titleColor: '#451a03', borderColor: '#fafaf9'
  },
  {
    id: 'mx-honey', name: 'Sweet Honey',
    backgroundGradient: 'linear-gradient(90deg, #fff7ed 0%, #ffedd5 45%, #FFFFFF 70%)',
    accentColor: '#ea580c', labelColor: '#9a3412', titleColor: '#7c2d12', borderColor: '#fff7ed'
  },

  // Greens & Teals
  {
    id: 'mx-lime', name: 'Lime Zest',
    backgroundGradient: 'linear-gradient(90deg, #f7fee7 0%, #ecfccb 45%, #FFFFFF 70%)',
    accentColor: '#65a30d', labelColor: '#365314', titleColor: '#1a2e05', borderColor: '#f7fee7'
  },
  {
    id: 'mx-emerald', name: 'Emerald City',
    backgroundGradient: 'linear-gradient(90deg, #ecfdf5 0%, #d1fae5 45%, #FFFFFF 70%)',
    accentColor: '#059669', labelColor: '#064e3b', titleColor: '#022c22', borderColor: '#ecfdf5'
  },
  {
    id: 'mx-sage', name: 'Sage Wisdom',
    backgroundGradient: 'linear-gradient(90deg, #f0fdfa 0%, #ccfbf1 45%, #FFFFFF 70%)',
    accentColor: '#0d9488', labelColor: '#134e4a', titleColor: '#115e59', borderColor: '#f0fdfa'
  },
  {
    id: 'mx-olive', name: 'Olive Branch',
    backgroundGradient: 'linear-gradient(90deg, #fefce8 0%, #fef08a 45%, #FFFFFF 70%)',
    accentColor: '#854d0e', labelColor: '#422006', titleColor: '#3f6212', borderColor: '#fefce8'
  },
  {
    id: 'mx-spring', name: 'Spring Leaf',
    backgroundGradient: 'linear-gradient(90deg, #f0fdf4 0%, #dcfce7 45%, #FFFFFF 70%)',
    accentColor: '#16a34a', labelColor: '#14532d', titleColor: '#052e16', borderColor: '#f0fdf4'
  },

  // Blues & Cyans
  {
    id: 'mx-azure', name: 'Azure Sky',
    backgroundGradient: 'linear-gradient(90deg, #eff6ff 0%, #dbeafe 45%, #FFFFFF 70%)',
    accentColor: '#2563eb', labelColor: '#1e3a8a', titleColor: '#172554', borderColor: '#eff6ff'
  },
  {
    id: 'mx-cobalt', name: 'Cobalt Blue',
    backgroundGradient: 'linear-gradient(90deg, #e0e7ff 0%, #c7d2fe 45%, #FFFFFF 70%)',
    accentColor: '#4f46e5', labelColor: '#312e81', titleColor: '#1e1b4b', borderColor: '#e0e7ff'
  },
  {
    id: 'mx-steel', name: 'Steel Blue',
    backgroundGradient: 'linear-gradient(90deg, #f8fafc 0%, #f1f5f9 45%, #FFFFFF 70%)',
    accentColor: '#475569', labelColor: '#1e293b', titleColor: '#0f172a', borderColor: '#f8fafc'
  },
  {
    id: 'mx-ice', name: 'Ice Cold',
    backgroundGradient: 'linear-gradient(90deg, #f0f9ff 0%, #e0f2fe 45%, #FFFFFF 70%)',
    accentColor: '#0284c7', labelColor: '#0c4a6e', titleColor: '#082f49', borderColor: '#f0f9ff'
  },
  {
    id: 'mx-ocean', name: 'Ocean Depth',
    backgroundGradient: 'linear-gradient(90deg, #ecfeff 0%, #cffafe 45%, #FFFFFF 70%)',
    accentColor: '#0891b2', labelColor: '#155e75', titleColor: '#0e7490', borderColor: '#ecfeff'
  },

  // Purples & Violets
  {
    id: 'mx-mauve', name: 'Mauve Mist',
    backgroundGradient: 'linear-gradient(90deg, #faf5ff 0%, #f3e8ff 45%, #FFFFFF 70%)',
    accentColor: '#9333ea', labelColor: '#581c87', titleColor: '#3b0764', borderColor: '#faf5ff'
  },
  {
    id: 'mx-lilac', name: 'Lilac Field',
    backgroundGradient: 'linear-gradient(90deg, #f5f3ff 0%, #ede9fe 45%, #FFFFFF 70%)',
    accentColor: '#7c3aed', labelColor: '#4c1d95', titleColor: '#2e1065', borderColor: '#f5f3ff'
  },
  {
    id: 'mx-grape', name: 'Grape Vine',
    backgroundGradient: 'linear-gradient(90deg, #f3e8ff 0%, #e9d5ff 45%, #FFFFFF 70%)',
    accentColor: '#a855f7', labelColor: '#6b21a8', titleColor: '#581c87', borderColor: '#f3e8ff'
  },
  {
    id: 'mx-plum', name: 'Plum Royal',
    backgroundGradient: 'linear-gradient(90deg, #fae8ff 0%, #f5d0fe 45%, #FFFFFF 70%)',
    accentColor: '#c026d3', labelColor: '#86198f', titleColor: '#701a75', borderColor: '#fae8ff'
  },
  {
    id: 'mx-orchid', name: 'Wild Orchid',
    backgroundGradient: 'linear-gradient(90deg, #fdf4ff 0%, #fae8ff 45%, #FFFFFF 70%)',
    accentColor: '#d946ef', labelColor: '#a21caf', titleColor: '#86198f', borderColor: '#fdf4ff'
  },

  // Neutrals & Grays
  {
    id: 'mx-sand', name: 'Desert Sand',
    backgroundGradient: 'linear-gradient(90deg, #fdf8f6 0%, #f5ebe0 45%, #FFFFFF 70%)',
    accentColor: '#d6ccc2', labelColor: '#5e503f', titleColor: '#493628', borderColor: '#fdf8f6'
  },
  {
    id: 'mx-stone', name: 'Stone Gray',
    backgroundGradient: 'linear-gradient(90deg, #fafaf9 0%, #e7e5e4 45%, #FFFFFF 70%)',
    accentColor: '#78716c', labelColor: '#44403c', titleColor: '#292524', borderColor: '#fafaf9'
  },
  {
    id: 'mx-zinc', name: 'Zinc Plate',
    backgroundGradient: 'linear-gradient(90deg, #fafafa 0%, #f4f4f5 45%, #FFFFFF 70%)',
    accentColor: '#71717a', labelColor: '#3f3f46', titleColor: '#27272a', borderColor: '#fafafa'
  },
  {
    id: 'mx-pearl', name: 'Pearl White',
    backgroundGradient: 'linear-gradient(90deg, #ffffff 0%, #f9fafb 45%, #FFFFFF 90%)',
    accentColor: '#9ca3af', labelColor: '#4b5563', titleColor: '#1f2937', borderColor: '#f3f4f6'
  },
  {
    id: 'mx-taupe', name: 'Warm Taupe',
    backgroundGradient: 'linear-gradient(90deg, #fff1f2 0%, #fff7ed 45%, #FFFFFF 70%)',
    accentColor: '#a1a1aa', labelColor: '#52525b', titleColor: '#27272a', borderColor: '#fff1f2'
  },

  // I. PREMIUM DARK (Rich Diagonal Gradients)
  {
    id: 'prem-aurora', name: 'Midnight Aurora',
    backgroundGradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    accentColor: '#818cf8', labelColor: '#c7d2fe', titleColor: '#ffffff', borderColor: '#312e81'
  },
  {
    id: 'prem-cyber', name: 'Cyber Future',
    backgroundGradient: 'linear-gradient(135deg, #09090b 0%, #27272a 100%)',
    accentColor: '#22c55e', labelColor: '#dcfce7', titleColor: '#ffffff', borderColor: '#27272a'
  },
  {
    id: 'prem-velvet', name: 'Royal Velvet',
    backgroundGradient: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 100%)',
    accentColor: '#d8b4fe', labelColor: '#f3e8ff', titleColor: '#ffffff', borderColor: '#5b21b6'
  },
  {
    id: 'prem-forest', name: 'Deep Forest',
    backgroundGradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
    accentColor: '#34d399', labelColor: '#d1fae5', titleColor: '#ffffff', borderColor: '#065f46'
  },
  {
    id: 'prem-red', name: 'Red Velvet',
    backgroundGradient: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)',
    accentColor: '#f87171', labelColor: '#fee2e2', titleColor: '#ffffff', borderColor: '#991b1b'
  },
  {
    id: 'prem-gold', name: 'Luxury Gold',
    backgroundGradient: 'linear-gradient(135deg, #1c1917 0%, #451a03 100%)',
    accentColor: '#fbbf24', labelColor: '#fef3c7', titleColor: '#ffffff', borderColor: '#78350f'
  },
  {
    id: 'prem-abyss', name: 'Ocean Abyss',
    backgroundGradient: 'linear-gradient(135deg, #083344 0%, #155e75 100%)',
    accentColor: '#22d3ee', labelColor: '#cffafe', titleColor: '#ffffff', borderColor: '#164e63'
  },
  {
    id: 'prem-gunmetal', name: 'Gunmetal Gray',
    backgroundGradient: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
    accentColor: '#9ca3af', labelColor: '#f3f4f6', titleColor: '#ffffff', borderColor: '#4b5563'
  },
  {
    id: 'prem-amethyst', name: 'Amethyst Dark',
    backgroundGradient: 'linear-gradient(135deg, #3b0764 0%, #6b21a8 100%)',
    accentColor: '#e9d5ff', labelColor: '#f5d0fe', titleColor: '#ffffff', borderColor: '#7e22ce'
  },
  {
    id: 'prem-night', name: 'Night Sky',
    backgroundGradient: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
    accentColor: '#38bdf8', labelColor: '#e0f2fe', titleColor: '#ffffff', borderColor: '#1e293b'
  }
];

const PRESET_BRAND_LOGOS = [
  { id: 'brand1', url: '/logos/logo1.png', label: 'شعار 1' },
  { id: 'brand2', url: '/logos/logo2.png', label: 'شعار 2' },
  { id: 'brand3', url: '/logos/logo3.png', label: 'شعار 3' },
  { id: 'brand4', url: '/logos/logo4.png', label: 'شعار 4' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'analysis' | 'visuals' | 'typography' | 'logos' | 'footer' | 'layout' | 'presets'>('content');
  const [savedPresets, setSavedPresets] = useState<Array<{ id: string, name: string, data: CardData, timestamp: number }>>([]);
  const [presetName, setPresetName] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [topicInput, setTopicInput] = useState('');
  const [exportScale, setExportScale] = useState<1 | 2 | 3>(1); // Default to 1x (Screen)

  const initialCardData: CardData = {
    showSubtitle: true,
    title: 'استراتيجيات الاستثمار الذكي في الأسواق المالية',
    subtitle: 'دليلك الشامل لتحقيق عوائد مستدامة وتقليل المخاطر',
    imageUrl: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=1000',
    accentColor: '#00E5C4',
    secondaryColor: '#3B82F6',
    authorName: 'أ. محمد العلي',
    website: 'SmartInvestor.SA',
    headerTitle: 'منصة المسثتمر',
    headerSubtitle: 'في رحلة لتطوير الاقتصاد العربي',
    headerTitleSize: 16,
    headerSubtitleSize: 11,

    // Logo & Branding Controls
    logoSize: 48,
    logoRadius: 20,
    logoShadow: 10,
    logoGlass: true,
    logoOffsetX: 0,
    logoOffsetY: 0,
    logoOpacity: 1,
    logoTransparent: true,
    headerScale: 1,
    headerPositionX: 0,
    headerPositionY: 0,

    // Secondary Logo (Bottom Right)
    showLogo2: false,
    logo2Size: 80,
    logo2Radius: 20,
    logo2Shadow: 10,
    logo2Glass: true,
    logo2OffsetX: 0,
    logo2OffsetY: 0,
    logo2Opacity: 1,
    logo2Transparent: false,
    logo2Text: '',
    logo2TextColor: '',
    logo2TextSize: 12,
    logo2TextWeight: 'bold',
    logo2TextPosition: 'left',

    // Smart Analysis Data
    volatilityVal: 'استقرار مؤسساتي',
    volumeVal: 'سيولة تجميعية',
    sentimentVal: 'شراء قوية (Buy)',
    marketVal: 'نقطة المقاومة',
    marketChange: '+3.85%',

    // Dashboard Controls
    dashboardGridGap: 16,
    dashboardGlassOpacity: 0.1,

    layoutStyle: 'modern',
    overlayGradient: 'fade-bottom',

    // Title Decoration Defaults
    titleLine1Width: 60,
    titleLine2Width: 15,
    titleLineHeight: 4,
    titleLineColor: '#00E5C4',
    titleLineOpacity: 1,
    titleLineAlign: 'right',

    // Subtitle Decoration Defaults
    subtitleBarWidth: 6,
    subtitleBarHeight: 48,
    subtitleBarColor: '#00E5C4',
    subtitleBarOpacity: 0.3,
    subtitleBarAlign: 'right',
    subtitleWeight: '600',
    subtitleLineHeight: 1.6,



    backgroundMode: 'gradient',
    backgroundColor: '#0B0F2B',
    backgroundGradient: 'linear-gradient(to right, #0B0F2B 0%, #12163A 60%, #1A1F4D 100%)', // Brand Hero Default
    themeType: 'modern',
    titleSize: 1.5,
    subtitleSize: 1.0,
    imageHeight: 280,
    patternType: 'grid',
    patternOpacity: 0.05,
    patternSize: 20,
    showFooter: true,
    footerBgColor: '#0f172a',
    footerOpacity: 1,
    footerBottomOffset: 30,
    footerIsFloating: true,
    footerShadow: true,
    footerAlignment: 'between',
    contentPadding: 40,
    contentVerticalAlign: 'center',
    overlayOpacity: 0.2,
    borderRadius: 32,
    footerText: 'اقرأ المزيد',
    cardPadding: 40,
    cardMargin: 0,
    elementsGap: 24,
    imageBlur: 0,
    imageBrightness: 1,
    imageGrayscale: 0,

    // Image Spacing & Borders
    imageMarginTop: 0,
    imageMarginBottom: 0,
    imageMarginLeft: 0,
    imageMarginRight: 0,
    imagePaddingTop: 0,
    imagePaddingBottom: 0,
    imagePaddingLeft: 0,
    imagePaddingRight: 0,
    imageBorderRadius: 20,
    imageBorderWidth: 0,
    imageBorderColor: '#000000',
    imageShadow: false,
    imagePositionX: 50,
    imagePositionY: 50,
    imageFullWidth: false,

    subtitlePosition: 'below-title',

    titleEffect: 'none',
    titleEffectColor: '#000000',
    titleEffectOpacity: 0.2,
    titleEffectSize: 4,
    titleEffectOffsetX: 2,
    titleEffectOffsetY: 2,

    overlayColor: '#000000',
    overlayBlendMode: 'normal',
    footerPadding: 30,
    footerAuthorSize: 14,
    footerWebSize: 10,
    footerBlur: 0,
    footerTextColor: '#ffffff',
    footerBorderTop: 1,
    footerBorderColor: 'rgba(255,255,255,0.1)',
    footerStyle: 'simple',
    footerLayout: 'bar', // Apple-like default
    ctaButtonStyle: 'solid',
    ctaBackgroundColor: '#4f46e5',
    ctaGradient: 'linear-gradient(45deg, #4f46e5, #818cf8)',
    ctaBorderColor: '#4f46e5',
    ctaTextColor: '#ffffff',
    ctaOpacity: 1,
    ctaOffsetX: 0,
    ctaOffsetY: 0,

    // Smart Indicators
    indicators: MASTER_INDICATORS.slice(0, 6).map(i => ({ ...i, id: i.id, type: i.type as any, trend: (i as any).trend })),
    socialInstagram: '@smart_investor',
    socialTwitter: '@smart_sa',
    ctaText: 'أكمل القراءة عبر المنصة',

    // Export Defaults
    aspectRatio: '1.91:1', // Standard Open Graph
    exportWidth: 1200,
    exportHeight: 630,

    ctaPaddingX: 24,
    ctaPaddingY: 12,
    ctaFontSize: 12,
    ctaRadius: 32,
    ctaMarginTop: 0,
    showAuthor: true,
    showAuthorImage: true,
    showWebsite: true,
    titleColor: '#1e293b',
    subtitleColor: '#475569',
    imageContrast: 1,
    imageSaturation: 1,
    imageSepia: 0,

    // Glass Container Typography
    glassValueSize: 28,
    glassLabelSize: 10,
    glassValueColor: '', // default to automatic
    glassLabelColor: '', // default to automatic
    glassValueTracking: 0,
    glassLabelTracking: 0,
    glassValueWeight: '900',
    glassLabelWeight: '900',
    glassValueItalic: false,
    glassLabelItalic: false,
    glassValueUnderline: false,
    glassLabelUnderline: false,
    glassValueCase: 'none',
    glassLabelCase: 'uppercase',
    glassValueMarginTop: 0,
    glassValueMarginBottom: 0,
    glassLabelMarginTop: 0,
    glassLabelMarginBottom: 0,
    glassTextGap: 4,
    glassPadding: 20,
    glassGap: 16,
    glassRadius: 12,
    glassOpacity: 0.1,
    glassBorder: 1,
    glassShadow: 40,

    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    titleWeight: '900',
    lineHeight: 1.5,
    letterSpacing: 0,
    textAlign: 'right',
    titleItalic: false,
    titleUnderline: false,

    // Spacing Defaults
    titleMarginTop: 0,
    titleMarginBottom: 0,
    titleMarginLeft: 0,
    titleMarginRight: 0,
    titlePaddingTop: 0,
    titlePaddingBottom: 0,
    titlePaddingLeft: 0,
    titlePaddingRight: 0,

  };

  const toggleIndicator = (indicator: typeof MASTER_INDICATORS[number]) => {
    setCardData(prev => {
      const exists = prev.indicators.find(i => i.id === indicator.id);
      if (exists) {
        return { ...prev, indicators: prev.indicators.filter(i => i.id !== indicator.id) };
      } else {
        return { ...prev, indicators: [...prev.indicators, { ...indicator, id: indicator.id, type: indicator.type as any, trend: (indicator as any).trend }] };
      }
    });
  };

  const updateIndicatorType = (id: string, type: 'primary' | 'secondary' | 'passive') => {
    setCardData(prev => ({
      ...prev,
      indicators: prev.indicators.map(i => i.id === id ? { ...i, type } : i)
    }));
  };

  // Load from LocalStorage or use Initial
  const [cardData, setCardData] = useState<CardData>(() => {
    const saved = localStorage.getItem('smartInvestorCardData');
    return saved ? { ...initialCardData, ...JSON.parse(saved) } : initialCardData;
  });

  // Save to LocalStorage on Change
  useEffect(() => {
    localStorage.setItem('smartInvestorCardData', JSON.stringify(cardData));
  }, [cardData]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => console.log("Fonts ready"));
    }
    // Load saved presets from localStorage
    const savedPresetsData = localStorage.getItem('smartInvestorPresets');
    if (savedPresetsData) {
      setSavedPresets(JSON.parse(savedPresetsData));
    }
  }, []);

  // Save presets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('smartInvestorPresets', JSON.stringify(savedPresets));
  }, [savedPresets]);

  // Preset Management Functions
  const savePreset = () => {
    if (!presetName.trim()) {
      alert('الرجاء إدخال اسم للإعداد');
      return;
    }
    const newPreset = {
      id: Date.now().toString(),
      name: presetName.trim(),
      data: { ...cardData },
      timestamp: Date.now()
    };
    setSavedPresets(prev => [...prev, newPreset]);
    setPresetName('');
    alert('تم حفظ الإعداد بنجاح! ✅');
  };

  const loadPreset = (preset: { id: string, name: string, data: CardData, timestamp: number }) => {
    setCardData(preset.data);
    alert(`تم تحميل الإعداد: ${preset.name} ✅`);
  };

  const deletePreset = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الإعداد؟')) {
      setSavedPresets(prev => prev.filter(p => p.id !== id));
      alert('تم حذف الإعداد بنجاح! 🗑️');
    }
  };

  const exportPresets = () => {
    const dataStr = JSON.stringify(savedPresets, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `presets-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importPresets = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setSavedPresets(prev => [...prev, ...imported]);
        alert('تم استيراد الإعدادات بنجاح! ✅');
      } catch (error) {
        alert('خطأ في قراءة الملف! ❌');
      }
    };
    reader.readAsText(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : (type === 'range' || type === 'number' ? parseFloat(value) : value);
    setCardData(prev => ({ ...prev, [name]: val }));
  };

  const downloadImage = async (format: 'png' | 'jpg' | 'pdf' = 'png') => {
    const node = document.getElementById('printable-card');
    if (!node || isDownloading) return;
    setIsDownloading(true);

    const parent = node.parentElement;
    if (parent) parent.style.overflow = 'visible';

    try {
      await document.fonts.ready;
      await new Promise(resolve => setTimeout(resolve, 800));

      const width = cardData.exportWidth || 1200;
      const height = cardData.exportHeight || 630;

      const elementWidth = node.offsetWidth;
      const scaleFactor = width / elementWidth; // Calculate how much to scale to reach 1080px base
      const finalScale = scaleFactor * exportScale;

      const canvas = await html2canvas(node, {
        scale: finalScale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        // width and height removed to allow auto-sizing based on scale
        onclone: (clonedDoc) => {
          const element = clonedDoc.getElementById('printable-card');
          if (element) {
            element.style.transform = 'none';
            element.style.boxShadow = 'none';
            element.style.fontFamily = cardData.fontFamily;

            // Fix for Arabic Text Overlap - Essential for html2canvas
            const textElements = element.querySelectorAll('h1, p, span, div');
            textElements.forEach((el: any) => {
              el.style.letterSpacing = 'normal'; // Reset negative spacing
              el.style.fontVariantLigatures = 'no-common-ligatures'; // Simplify rendering
            });

            // CRITICAL QUALITY FIX: Swap background-image with real <img> during export
            // This forces html2canvas to use the original high-res image file instead of a downsampled background pattern
            const imageDiv = element.querySelector('.export-target-image') as HTMLElement;
            if (imageDiv) {
              const style = window.getComputedStyle(imageDiv);
              const bgImage = style.backgroundImage;
              const bgPosition = style.backgroundPosition; // e.g., "50% 50%"

              // Extract URL from 'url("...")'
              const urlMatch = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
              if (urlMatch && urlMatch[1]) {
                const img = clonedDoc.createElement('img');
                img.src = urlMatch[1];
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.objectPosition = bgPosition;
                img.style.borderRadius = style.borderRadius;
                img.style.filter = style.filter;
                img.style.imageRendering = 'high-quality'; // Hint for browser

                imageDiv.innerHTML = ''; // Clear existing
                imageDiv.appendChild(img);
                imageDiv.style.backgroundImage = 'none'; // Remove background to avoid duplicate
              }
            }
          }
        }
      });

      let dataUrl = '';
      if (format === 'jpg') {
        dataUrl = canvas.toDataURL('image/jpeg', 1.0);
      } else {
        dataUrl = canvas.toDataURL('image/png', 1.0);
      }

      if (format === 'pdf') {
        const pdf = new jsPDF({
          orientation: height > width ? 'p' : 'l',
          unit: 'px',
          format: [width, height]
        });
        pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
        pdf.save(`investor-pro-${Date.now()}.pdf`);
      } else {
        const link = document.createElement('a');
        link.download = `investor-pro-${Date.now()}.${format}`;
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error(error);
      alert(`خطأ في التصدير: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsDownloading(false);
      if (parent) parent.style.overflow = '';
    }
  };



  const suggestContent = async () => {
    if (!topicInput) return;
    setIsLoading(true);
    const { title, subtitle } = await generateInvestmentTitle(topicInput);
    setCardData(prev => ({ ...prev, title, subtitle }));
    setIsLoading(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setCardData(p => ({ ...p, logoUrl: ev.target?.result as string }));
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="main-layout">
      <div className="sidebar">
        <header className="sidebar-header">
          <div className="flex items-center gap-4">
            <div className="sidebar-header-logo">S</div>
            <div>
              <h1 className="sidebar-header-title">استوديو المحرر المحترف</h1>
              <p className="sidebar-header-subtitle">Premium Build v3.0</p>
            </div>
          </div>
        </header>

        <nav className="nav-tabs">
          {['content', 'analysis', 'visuals', 'typography', 'logos', 'footer', 'layout', 'presets'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as any);
              }}
              className={`nav-tab-button ${activeTab === tab ? 'active' : ''}`}
            >
              {tab === 'content' ? 'المحتوى' : tab === 'analysis' ? 'التحليل' : tab === 'visuals' ? 'تأثيرات' : tab === 'typography' ? 'الخطوط' : tab === 'logos' ? 'الشعارات' : tab === 'footer' ? 'الفوتر' : tab === 'layout' ? 'التخطيط' : 'الإعدادات'}
            </button>
          ))}
        </nav>

        <div className="sidebar-content">



          {activeTab === 'analysis' && (
            <div className="space-y-8">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                <h3 className="text-indigo-900 font-bold mb-2">لوحة التحكم الذكي (Smart Analysis)</h3>
                <p className="text-xs text-indigo-700 leading-relaxed opacity-80">اختر المؤشرات التي ستظهر في القسم الأيسر من البطاقة. النظام يدعم حتى 30 مؤشر.</p>
              </div>

              <div className="space-y-6">
                {/* Active Indicators Control */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">المؤشرات النشطة ({cardData.indicators.length})</label>
                  <div className="space-y-2">
                    {cardData.indicators.map((ind) => (
                      <div key={ind.id} className="indicator-item">
                        <div className="indicator-info">
                          <span className="indicator-icon">{ind.icon}</span>
                          <div>
                            <span className="indicator-label">{ind.label}</span>
                            <span className="indicator-value">{ind.value}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={ind.type}
                            onChange={(e) => updateIndicatorType(ind.id, e.target.value as any)}
                            className="text-[10px] bg-slate-100 rounded px-1 py-1 border border-slate-200 outline-none"
                          >
                            <option value="primary">Primary</option>
                            <option value="secondary">Secondary</option>
                            <option value="passive">Passive</option>
                          </select>
                          <button onClick={() => toggleIndicator(ind as any)} className="text-slate-400">✕</button>
                        </div>
                      </div>
                    ))}
                    {cardData.indicators.length === 0 && <p className="text-center text-xs text-slate-400 py-4 italic">لا يوجد مؤشرات نشطة</p>}
                  </div>
                </div>

                {/* Available Indicators Selection */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">كل المؤشرات المتاحة</label>
                  <div className="grid grid-cols-2 gap-2">
                    {MASTER_INDICATORS.map((ind) => {
                      const isActive = cardData.indicators.find(i => i.id === ind.id);
                      return (
                        <button
                          key={ind.id}
                          onClick={() => toggleIndicator(ind)}
                          className={`indicator-item ${isActive ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' : ''}`}
                        >
                          <div className="indicator-info">
                            <span className="indicator-icon">{ind.icon}</span>
                            <div className="flex flex-col text-right">
                              <span className={`indicator-label ${isActive ? 'text-indigo-900' : 'text-slate-700'}`}>{ind.label}</span>
                              <span className="indicator-value">{ind.value}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Header Section */}
              <div className="content-section">
                <label className="section-label">رأس البطاقة (Header)</label>
                <input type="text" name="headerTitle" value={cardData.headerTitle} onChange={handleInputChange} className="input-field" placeholder="العنوان الرئيسي للرأس" />
                <input type="text" name="headerSubtitle" value={cardData.headerSubtitle} onChange={handleInputChange} className="input-field" placeholder="العنوان الفرعي" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="control-label">العنوان</label>
                  <button onClick={suggestContent} className="action-button">تحسين AI ✨</button>
                </div>
                <div className="input-group">
                  <textarea name="title" value={cardData.title} onChange={handleInputChange} rows={2} className="textarea-field" />
                  <input type="color" name="titleColor" value={cardData.titleColor} onChange={handleInputChange} className="color-input" title="لون العنوان" />
                </div>
                <div className="input-group">
                  <textarea name="subtitle" value={cardData.subtitle} onChange={handleInputChange} rows={3} className={`textarea-field ${!cardData.showSubtitle ? 'opacity-50' : ''}`} disabled={!cardData.showSubtitle} />
                  <div className="flex flex-col gap-1">
                    <input type="color" name="subtitleColor" value={cardData.subtitleColor} onChange={handleInputChange} className="color-input" title="لون الوصف" />
                    <button
                      onClick={() => setCardData(p => ({ ...p, showSubtitle: !p.showSubtitle }))}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${cardData.showSubtitle ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}
                      title={cardData.showSubtitle ? 'إخفاء الوصف' : 'إظهار الوصف'}
                    >
                      {cardData.showSubtitle ? '👁️' : '🚫'}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-800 mb-3 block">خلفية البطاقة</label>
                <div className="flex gap-4 mb-4">
                  {cardData.layoutStyle !== 'modern' && (
                    <button onClick={() => setCardData(p => ({ ...p, backgroundMode: 'image' }))} className={`flex-1 py-2 rounded-lg text-xs font-bold border ${cardData.backgroundMode === 'image' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-slate-200'}`}>صورة</button>
                  )}
                  <button onClick={() => setCardData(p => ({ ...p, backgroundMode: 'gradient' }))} className={`flex-1 py-2 rounded-lg text-xs font-bold border ${cardData.backgroundMode === 'gradient' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-slate-200'}`}>تدرج Apple</button>
                  <button onClick={() => setCardData(p => ({ ...p, backgroundMode: 'color' }))} className={`flex-1 py-2 rounded-lg text-xs font-bold border ${cardData.backgroundMode === 'color' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-slate-200'}`}>لون</button>
                </div>

                {cardData.backgroundMode === 'image' && cardData.layoutStyle !== 'modern' && (
                  <div onClick={() => fileInputRef.current?.click()} className="h-32 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group">
                    <img src={cardData.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-20" />
                    <span className="relative z-10 text-xs font-bold text-slate-500">رفع صورة جديدة</span>
                    <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => setCardData(p => ({ ...p, imageUrl: ev.target?.result as string }));
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </div>
                )}

                {cardData.backgroundMode === 'gradient' && (
                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">اختر ثيم احترافي</label>
                    <div className="grid grid-cols-2 gap-3">
                      {PROFESSIONAL_THEMES.map((theme, i) => (
                        <button
                          key={theme.id}
                          onClick={() => setCardData(p => ({
                            ...p,
                            backgroundGradient: theme.backgroundGradient,
                            accentColor: theme.accentColor,
                            titleColor: theme.titleColor,
                            subtitleColor: theme.labelColor,
                            // Also set footer colors for consistency
                            footerBgColor: 'transparent',
                            footerTextColor: theme.labelColor,
                            footerBorderColor: theme.borderColor,
                            // CTA Linkage (User Request)
                            ctaTextColor: theme.titleColor,
                            ctaBackgroundColor: theme.accentColor,
                            ctaBorderColor: theme.accentColor,
                            // Theme Sync (User Request: Lines & Sidebar)
                            titleLineColor: theme.accentColor,
                            subtitleBarColor: theme.accentColor
                          }))}
                          className={`group relative overflow-hidden rounded-2xl h-24 text-right p-4 ${cardData.backgroundGradient === theme.backgroundGradient ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
                          style={{ background: theme.backgroundGradient }}
                        >
                          <div className="absolute inset-0 bg-black/10"></div>
                          <div className="relative z-10 flex flex-col items-start justify-between h-full">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm mb-auto" style={{ backgroundColor: theme.accentColor, color: theme.backgroundGradient.includes('#000000') ? 'black' : 'white' }}>
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            </div>
                            <span className="text-xs font-bold text-white shadow-sm">{theme.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {cardData.backgroundMode === 'color' && (
                  <div className="h-32 rounded-3xl flex items-center justify-center border border-slate-200" style={{ backgroundColor: cardData.backgroundColor }}>
                    <input type="color" name="backgroundColor" value={cardData.backgroundColor} onChange={handleInputChange} className="w-full h-full opacity-0 cursor-pointer" />
                    <span className="absolute pointer-events-none text-xs font-bold bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">اختر لون الخلفية</span>
                  </div>
                )}
              </div>
            </div>
          )}


          {activeTab === 'typography' && (
            <div className="space-y-8">
              <div className="space-y-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">نوع الخط والأسلوب</label>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-2">الخط المستخدم</label>
                    <select name="fontFamily" value={cardData.fontFamily} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500 text-right">
                      <option value="'IBM Plex Sans Arabic', sans-serif">IBM Plex Sans Arabic (عصري)</option>
                      <option value="'Cairo', sans-serif">Cairo (كايرو)</option>
                      <option value="'Tajawal', sans-serif">Tajawal (تجوال)</option>
                      <option value="'Almarai', sans-serif">Almarai (المراعي)</option>
                      <option value="'El Messiri', sans-serif">El Messiri (المسيري)</option>
                      <option value="'Changa', sans-serif">Changa (تشانغا)</option>
                      <option value="'Amiri', serif">Amiri (أميــري)</option>
                      <option value="'Noto Kufi Arabic', sans-serif">Noto Kufi (كوفي)</option>
                      <option value="'Lalezar', system-ui">Lalezar (لاليزار)</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700 block">أسلوب العنوان</label>
                    <div className="flex gap-2">
                      {/* Weight Select */}
                      <select name="titleWeight" value={cardData.titleWeight} onChange={handleInputChange} className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold outline-none">
                        <option value="300">نحيف (300)</option>
                        <option value="400">عادي (400)</option>
                        <option value="500">متوسط (500)</option>
                        <option value="600">نصف عريض (600)</option>
                        <option value="700">عريض (700)</option>
                        <option value="800">عريض جداً (800)</option>
                        <option value="900">أسود (900)</option>
                      </select>

                      {/* Style Toggles */}
                      <div className="flex bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                        <button
                          onClick={() => setCardData(p => ({ ...p, titleItalic: !p.titleItalic }))}
                          className={`w-10 flex items-center justify-center font-serif italic text-lg ${cardData.titleItalic ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
                          title="مائل"
                        >I</button>
                        <div className="w-px bg-slate-200"></div>
                        <button
                          onClick={() => setCardData(p => ({ ...p, titleUnderline: !p.titleUnderline }))}
                          className={`w-10 flex items-center justify-center font-bold underline text-lg ${cardData.titleUnderline ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
                          title="تسطير"
                        >U</button>
                      </div>
                    </div>

                    {/* Alignment */}
                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                      {['right', 'center', 'left'].map((align) => (
                        <button key={align} onClick={() => setCardData(p => ({ ...p, textAlign: align as any }))} className={`flex-1 py-1.5 rounded-lg text-sm ${cardData.textAlign === align ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}>
                          {align === 'right' ? '→' : align === 'center' ? '↔' : '←'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title Spacing Controls */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">مسافات العنوان (Spacing)</label>
                    <div className="grid grid-cols-2 gap-6">
                      {/* Outer Margin */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <label className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-500 font-bold mb-2 inline-block">هامش خارجي (Margin)</label>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="col-start-2"><input type="number" name="titleMarginTop" value={cardData.titleMarginTop} onChange={handleInputChange} className="w-full p-1 text-center text-xs border rounded" placeholder="Top" /></div>
                          <div className="col-start-1 col-end-4 grid grid-cols-3 gap-2">
                            <input type="number" name="titleMarginLeft" value={cardData.titleMarginLeft} onChange={handleInputChange} className="w-full p-1 text-center text-xs border rounded" placeholder="Left" />
                            <div className="bg-slate-200 rounded flex items-center justify-center text-[10px] text-slate-400">Box</div>
                            <input type="number" name="titleMarginRight" value={cardData.titleMarginRight} onChange={handleInputChange} className="w-full p-1 text-center text-xs border rounded" placeholder="Right" />
                          </div>
                          <div className="col-start-2"><input type="number" name="titleMarginBottom" value={cardData.titleMarginBottom} onChange={handleInputChange} className="w-full p-1 text-center text-xs border rounded" placeholder="Bot" /></div>
                        </div>
                      </div>

                      {/* Inner Padding */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <label className="text-[10px] bg-indigo-100 px-2 py-0.5 rounded text-indigo-600 font-bold mb-2 inline-block">هامش داخلي (Padding)</label>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="col-start-2"><input type="number" name="titlePaddingTop" value={cardData.titlePaddingTop} onChange={handleInputChange} className="w-full p-1 text-center text-xs border rounded" placeholder="Top" /></div>
                          <div className="col-start-1 col-end-4 grid grid-cols-3 gap-2">
                            <input type="number" name="titlePaddingLeft" value={cardData.titlePaddingLeft} onChange={handleInputChange} className="w-full p-1 text-center text-xs border rounded" placeholder="Left" />
                            <div className="bg-indigo-100 rounded flex items-center justify-center text-[10px] text-indigo-400">Txt</div>
                            <input type="number" name="titlePaddingRight" value={cardData.titlePaddingRight} onChange={handleInputChange} className="w-full p-1 text-center text-xs border rounded" placeholder="Right" />
                          </div>
                          <div className="col-start-2"><input type="number" name="titlePaddingBottom" value={cardData.titlePaddingBottom} onChange={handleInputChange} className="w-full p-1 text-center text-xs border rounded" placeholder="Bot" /></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-700">ارتفاع السطر</label><span>{cardData.lineHeight}</span></div>
                      <input type="range" name="lineHeight" min="0.8" max="2" step="0.1" value={cardData.lineHeight} onChange={handleInputChange} className="w-full accent-indigo-600" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-700">التباعد</label><span>{cardData.letterSpacing}px</span></div>
                      <input type="range" name="letterSpacing" min="-2" max="10" step="0.5" value={cardData.letterSpacing} onChange={handleInputChange} className="w-full accent-indigo-600" />
                    </div>
                  </div>

                  {/* Title Effects Section */}
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تأثيرات العنوان (Effects)</label>
                    <div className="flex gap-2 flex-wrap bg-slate-50 p-2 rounded-xl border border-slate-200">
                      {['none', 'shadow', 'lift', 'outline', 'hollow', 'neon'].map(effect => (
                        <button
                          key={effect}
                          onClick={() => setCardData(p => ({ ...p, titleEffect: effect as any }))}
                          className={`px-3 py-2 rounded-lg text-xs font-bold border ${cardData.titleEffect === effect ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-200'}`}
                        >
                          {effect === 'none' ? 'بدون' : effect === 'shadow' ? 'ظل' : effect === 'lift' ? 'رفع' : effect === 'outline' ? 'حدود' : effect === 'hollow' ? 'مفرغ' : 'نيون'}
                        </button>
                      ))}
                    </div>

                    {cardData.titleEffect !== 'none' && (
                      <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        {/* Color Control (Not for Lift usually, but good to have) */}
                        {cardData.titleEffect !== 'lift' && (
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 mb-1 block">لون التأثير</label>
                            <div className="flex gap-2 items-center">
                              <input type="color" name="titleEffectColor" value={cardData.titleEffectColor} onChange={handleInputChange} className="w-8 h-8 rounded-lg cursor-pointer border-0" />
                              <span className="text-xs font-mono text-slate-400">{cardData.titleEffectColor}</span>
                            </div>
                          </div>
                        )}

                        {/* Size / Blur / Thickness */}
                        <div>
                          <div className="flex justify-between mb-1"><label className="text-[10px] font-bold text-slate-500">{cardData.titleEffect === 'outline' || cardData.titleEffect === 'hollow' ? 'السماكة (px)' : 'الضبابية (px)'}</label><span>{cardData.titleEffectSize}</span></div>
                          <input type="range" name="titleEffectSize" min="0" max="20" step="0.5" value={cardData.titleEffectSize} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                        </div>

                        {/* Offset Controls (Shadow/Lift Only) */}
                        {(cardData.titleEffect === 'shadow' || cardData.titleEffect === 'lift') && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="flex justify-between mb-1"><label className="text-[10px] font-bold text-slate-500">إزاحة X</label><span>{cardData.titleEffectOffsetX}</span></div>
                              <input type="range" name="titleEffectOffsetX" min="-20" max="20" step="1" value={cardData.titleEffectOffsetX} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1"><label className="text-[10px] font-bold text-slate-500">إزاحة Y</label><span>{cardData.titleEffectOffsetY}</span></div>
                              <input type="range" name="titleEffectOffsetY" min="-20" max="20" step="1" value={cardData.titleEffectOffsetY} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                            </div>
                          </div>
                        )}

                        {/* Opacity Control */}
                        <div>
                          <div className="flex justify-between mb-1"><label className="text-[10px] font-bold text-slate-500">الشفافية</label><span>{Math.round(cardData.titleEffectOpacity * 100)}%</span></div>
                          <input type="range" name="titleEffectOpacity" min="0" max="1" step="0.05" value={cardData.titleEffectOpacity} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Title Decorations (Lines Under Title) */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">زخارف العنوان (Lines)</label>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">عرض الخط 1</label>
                          <input type="range" name="titleLine1Width" min="0" max="200" step="5" value={cardData.titleLine1Width} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">عرض الخط 2</label>
                          <input type="range" name="titleLine2Width" min="0" max="200" step="5" value={cardData.titleLine2Width} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">اللون</label>
                          <input type="color" name="titleLineColor" value={cardData.titleLineColor} onChange={handleInputChange} className="w-full h-8 rounded-lg cursor-pointer border border-slate-200" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">الشفافية</label>
                          <input type="range" name="titleLineOpacity" min="0" max="1" step="0.1" value={cardData.titleLineOpacity} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">المحاذاة</label>
                        <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                          {['right', 'center', 'left'].map((align) => (
                            <button key={align} onClick={() => setCardData(p => ({ ...p, titleLineAlign: align as any }))} className={`flex-1 py-1 rounded-md text-[10px] font-bold ${cardData.titleLineAlign === align ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
                              {align === 'right' ? 'يمين' : align === 'center' ? 'وسط' : 'يسار'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtitle Decoration (Side Bar) */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">شريط الوصف الجانبي (Side Bar)</label>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">عرض الشريط</label>
                          <input type="range" name="subtitleBarWidth" min="0" max="20" step="1" value={cardData.subtitleBarWidth} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">اللون</label>
                          <input type="color" name="subtitleBarColor" value={cardData.subtitleBarColor} onChange={handleInputChange} className="w-full h-8 rounded-lg cursor-pointer border border-slate-200" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">الشفافية</label>
                        <input type="range" name="subtitleBarOpacity" min="0" max="1" step="0.1" value={cardData.subtitleBarOpacity} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">المحاذاة</label>
                        <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                          {['right', 'center', 'left'].map((align) => (
                            <button key={align} onClick={() => setCardData(p => ({ ...p, subtitleBarAlign: align as any }))} className={`flex-1 py-1 rounded-md text-[10px] font-bold ${cardData.subtitleBarAlign === align ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
                              {align === 'right' ? 'يمين' : align === 'center' ? 'وسط' : 'يسار'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtitle Text Weight & Line Height */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">تخصيص نص الوصف (Subtitle)</label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-[10px] text-slate-400 block mb-1">سماكة الخط</label>
                        <select name="subtitleWeight" value={cardData.subtitleWeight} onChange={handleInputChange} className="w-full p-2 bg-slate-50 text-xs font-bold border border-slate-200 rounded-lg outline-none">
                          <option value="300">Light (300)</option>
                          <option value="400">Regular (400)</option>
                          <option value="500">Medium (500)</option>
                          <option value="600">SemiBold (600)</option>
                          <option value="700">Bold (700)</option>
                          <option value="900">Black (900)</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] text-slate-400 block mb-1">ارتفاع السطر</label>
                        <input type="number" name="subtitleLineHeight" min="1" max="3" step="0.1" value={cardData.subtitleLineHeight} onChange={handleInputChange} className="w-full p-2 bg-slate-50 text-xs font-bold border border-slate-200 rounded-lg outline-none" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}



          {activeTab === 'visuals' && (
            <div className="space-y-8">
              <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                تم نقل فلاتر الصورة وتبويب "الصورة" لتخصيص أدق.
              </p>
              <div className="space-y-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">نمط الزخرفة الهندسية</label>
                <div className="space-y-6">
                  {PATTERN_CATEGORIES.map(cat => (
                    <div key={cat.id}>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 block border-b border-slate-100 pb-1">{cat.label}</label>
                      <div className="grid grid-cols-4 gap-2">
                        {cat.options.map((opt: any) => (
                          <button key={opt.id} onClick={() => setCardData(p => ({ ...p, patternType: opt.id }))} className={`py-2 rounded-lg border flex flex-col items-center justify-center gap-1 ${cardData.patternType === opt.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                            <span className="text-sm">{opt.icon}</span>
                            <span className="text-[8px] font-bold truncate w-full px-1 text-center">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-8">
              <div className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm space-y-4">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block border-b border-indigo-50 pb-2 mb-4">بيانات المؤشرات (Indicators)</label>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">الهدف السعري (Price Target)</label>
                    <input type="text" name="marketVal" value={cardData.marketVal} onChange={handleInputChange} className="w-full p-2 rounded-lg border text-sm font-mono" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">نسبة التغير (Change%)</label>
                    <input type="text" name="marketChange" value={cardData.marketChange} onChange={handleInputChange} className="w-full p-2 rounded-lg border text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">درجة المخاطر (Risk Score)</label>
                    <select name="volatilityVal" value={cardData.volatilityVal} onChange={handleInputChange} className="w-full p-2 rounded-lg border text-sm">
                      <option value="استقرار مؤسساتي">استقرار مؤسساتي (Low)</option>
                      <option value="تذبذب واعد">تذبذب واعد (Mid)</option>
                      <option value="نمو متسارع">نمو متسارع (High)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">حجم التداول (Volume)</label>
                    <input type="text" name="volumeVal" value={cardData.volumeVal} onChange={handleInputChange} className="w-full p-2 rounded-lg border text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">مؤشر المزاج (Sent.)</label>
                    <select name="sentimentVal" value={cardData.sentimentVal} onChange={handleInputChange} className="w-full p-2 rounded-lg border text-sm">
                      <option value="شراء قوية (Buy)">شراء قوية (Strong Buy)</option>
                      <option value="نظرة إيجابية">نظرة إيجابية (Bullish)</option>
                      <option value="ترقب وحياد">ترقب وحياد (Neutral)</option>
                      <option value="جني أرباح">جني أرباح (Taking Profit)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm space-y-4">
                <div className="pt-4 border-t border-indigo-50 space-y-4">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block pb-1">تخصيص الخطوط (Typography)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-700">حجم القيم (px)</label>
                        <span className="text-[10px] font-mono text-indigo-500 font-bold">{cardData.glassValueSize}px</span>
                      </div>
                      <input type="range" name="glassValueSize" min="20" max="100" step="2" value={cardData.glassValueSize} onChange={handleInputChange} className="w-full accent-indigo-600 h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-700">حجم العناوين (px)</label>
                        <span className="text-[10px] font-mono text-indigo-500 font-bold">{cardData.glassLabelSize}px</span>
                      </div>
                      <input type="range" name="glassLabelSize" min="8" max="24" step="1" value={cardData.glassLabelSize} onChange={handleInputChange} className="w-full accent-indigo-600 h-1.5" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-700">تباعد أحرف القيم (Tracking)</label>
                        <span className="text-[10px] font-mono text-indigo-500 font-bold">{cardData.glassValueTracking}px</span>
                      </div>
                      <input type="range" name="glassValueTracking" min="-10" max="10" step="0.5" value={cardData.glassValueTracking} onChange={handleInputChange} className="w-full accent-indigo-600 h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-700">تباعد أحرف العناوين</label>
                        <span className="text-[10px] font-mono text-indigo-500 font-bold">{cardData.glassLabelTracking}px</span>
                      </div>
                      <input type="range" name="glassLabelTracking" min="0" max="10" step="0.5" value={cardData.glassLabelTracking} onChange={handleInputChange} className="w-full accent-indigo-600 h-1.5" />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-700 block mb-1">وزن القيم (Weight)</label>
                      <select name="glassValueWeight" value={cardData.glassValueWeight} onChange={handleInputChange} className="w-full p-1.5 rounded-lg border text-[10px] font-bold">
                        <option value="400">Normal</option>
                        <option value="600">Semi Bold</option>
                        <option value="700">Bold</option>
                        <option value="800">Extra Bold</option>
                        <option value="900">Black Case</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 block mb-1">وزن العناوين</label>
                      <select name="glassLabelWeight" value={cardData.glassLabelWeight} onChange={handleInputChange} className="w-full p-1.5 rounded-lg border text-[10px] font-bold">
                        <option value="400">Normal</option>
                        <option value="600">Semi Bold</option>
                        <option value="700">Bold</option>
                        <option value="800">Extra Bold</option>
                        <option value="900">Black Case</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-700 block mb-1">لون القيم (Value Color)</label>
                      <div className="flex gap-2">
                        <input type="color" name="glassValueColor" value={cardData.glassValueColor || '#4f46e5'} onChange={handleInputChange} className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 overflow-hidden" />
                        <button onClick={() => setCardData(p => ({ ...p, glassValueColor: '' }))} className="text-[10px] text-indigo-500 font-bold underline">إعادة للتلقائي</button>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 block mb-1">لون العناوين</label>
                      <div className="flex gap-2">
                        <input type="color" name="glassLabelColor" value={cardData.glassLabelColor || '#64748b'} onChange={handleInputChange} className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 overflow-hidden" />
                        <button onClick={() => setCardData(p => ({ ...p, glassLabelColor: '' }))} className="text-[10px] text-indigo-500 font-bold underline">إعادة للتلقائي</button>
                      </div>
                    </div>

                    <div className="col-span-2 grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block border-b border-indigo-50 pb-1">تنسيق القيم (Value Style)</label>
                        <div className="flex gap-4">
                          <button onClick={() => setCardData(p => ({ ...p, glassValueItalic: !p.glassValueItalic }))} className={`flex-1 p-2 rounded-lg border text-[10px] font-bold transition-all ${cardData.glassValueItalic ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600'}`}>Italic</button>
                          <button onClick={() => setCardData(p => ({ ...p, glassValueUnderline: !p.glassValueUnderline }))} className={`flex-1 p-2 rounded-lg border text-[10px] font-bold transition-all ${cardData.glassValueUnderline ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600'}`}>Underline</button>
                        </div>
                        <select name="glassValueCase" value={cardData.glassValueCase} onChange={handleInputChange} className="w-full p-2 rounded-lg border text-[10px] font-bold">
                          <option value="none">Default Case</option>
                          <option value="uppercase">UPPERCASE</option>
                          <option value="lowercase">lowercase</option>
                          <option value="capitalize">Capitalize</option>
                        </select>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block border-b border-indigo-50 pb-1">تنسيق العناوين (Label Style)</label>
                        <div className="flex gap-4">
                          <button onClick={() => setCardData(p => ({ ...p, glassLabelItalic: !p.glassLabelItalic }))} className={`flex-1 p-2 rounded-lg border text-[10px] font-bold transition-all ${cardData.glassLabelItalic ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600'}`}>Italic</button>
                          <button onClick={() => setCardData(p => ({ ...p, glassLabelUnderline: !p.glassLabelUnderline }))} className={`flex-1 p-2 rounded-lg border text-[10px] font-bold transition-all ${cardData.glassLabelUnderline ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600'}`}>Underline</button>
                        </div>
                        <select name="glassLabelCase" value={cardData.glassLabelCase} onChange={handleInputChange} className="w-full p-2 rounded-lg border text-[10px] font-bold">
                          <option value="none">Default Case</option>
                          <option value="uppercase">UPPERCASE</option>
                          <option value="lowercase">lowercase</option>
                          <option value="capitalize">Capitalize</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-indigo-50 space-y-4">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block pb-1">تخصيص الحاوية (Container)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-700">الهامش الداخلي (px)</label>
                        <span className="text-[10px] font-mono text-indigo-500 font-bold">{cardData.glassPadding}px</span>
                      </div>
                      <input type="range" name="glassPadding" min="0" max="64" step="4" value={cardData.glassPadding} onChange={handleInputChange} className="w-full accent-indigo-600 h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-700">الفراغ (px)</label>
                        <span className="text-[10px] font-mono text-indigo-500 font-bold">{cardData.glassGap}px</span>
                      </div>
                      <input type="range" name="glassGap" min="0" max="64" step="4" value={cardData.glassGap} onChange={handleInputChange} className="w-full accent-indigo-600 h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-700">انحناء الزوايا (px)</label>
                        <span className="text-[10px] font-mono text-indigo-500 font-bold">{cardData.glassRadius}px</span>
                      </div>
                      <input type="range" name="glassRadius" min="0" max="100" step="4" value={cardData.glassRadius} onChange={handleInputChange} className="w-full accent-indigo-600 h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-700">الشفافية (Opacity)</label>
                        <span className="text-[10px] font-mono text-indigo-500 font-bold">{Math.round(cardData.glassOpacity * 100)}%</span>
                      </div>
                      <input type="range" name="glassOpacity" min="0" max="1" step="0.05" value={cardData.glassOpacity} onChange={handleInputChange} className="w-full accent-indigo-600 h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-700">سماكة الحدود (px)</label>
                        <span className="text-[10px] font-mono text-indigo-500 font-bold">{cardData.glassBorder}px</span>
                      </div>
                      <input type="range" name="glassBorder" min="0" max="5" step="0.5" value={cardData.glassBorder} onChange={handleInputChange} className="w-full accent-indigo-600 h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-700">قوة الظل (Shadow)</label>
                        <span className="text-[10px] font-mono text-indigo-500 font-bold">{cardData.glassShadow}px</span>
                      </div>
                      <input type="range" name="glassShadow" min="0" max="100" step="5" value={cardData.glassShadow} onChange={handleInputChange} className="w-full accent-indigo-600 h-1.5" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-indigo-50 space-y-4">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block pb-1">تخصيص مسافات النصوص (Text Spacing)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-700">فراغ بين القيمة والعنوان</label>
                        <span className="text-[10px] font-mono text-indigo-500 font-bold">{cardData.glassTextGap}px</span>
                      </div>
                      <input type="range" name="glassTextGap" min="0" max="60" step="1" value={cardData.glassTextGap} onChange={handleInputChange} className="w-full accent-indigo-600 h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-700">هامش القيمة العلوي</label>
                        <span className="text-[10px] font-mono text-indigo-500 font-bold">{cardData.glassValueMarginTop}px</span>
                      </div>
                      <input type="range" name="glassValueMarginTop" min="-40" max="80" step="1" value={cardData.glassValueMarginTop} onChange={handleInputChange} className="w-full accent-indigo-600 h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-700">هامش القيمة السفلي</label>
                        <span className="text-[10px] font-mono text-indigo-500 font-bold">{cardData.glassValueMarginBottom}px</span>
                      </div>
                      <input type="range" name="glassValueMarginBottom" min="-40" max="80" step="1" value={cardData.glassValueMarginBottom} onChange={handleInputChange} className="w-full accent-indigo-600 h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-700">هامش العنوان السفلي</label>
                        <span className="text-[10px] font-mono text-indigo-500 font-bold">{cardData.glassLabelMarginBottom}px</span>
                      </div>
                      <input type="range" name="glassLabelMarginBottom" min="-40" max="80" step="1" value={cardData.glassLabelMarginBottom} onChange={handleInputChange} className="w-full accent-indigo-600 h-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logos' && (
            <div className="space-y-8">
              {/* PRIMARY LOGO SECTION */}
              <div className="space-y-6">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest border-b border-indigo-100 pb-2 block">الشعار الأساسي (Primary)</label>

                {/* Brand Logos Grid */}
                <div className="grid grid-cols-4 gap-3">
                  {PRESET_BRAND_LOGOS.map(logo => (
                    <button
                      key={logo.id}
                      onClick={() => setCardData(p => ({ ...p, logoUrl: logo.url, logoType: undefined }))}
                      className={`aspect-square rounded-xl bg-white border-2 flex flex-col items-center justify-center gap-1 transition-all p-2 ${cardData.logoUrl === logo.url ? 'border-indigo-600 shadow-md ring-2 ring-indigo-500/20' : 'border-slate-100 hover:border-indigo-200'}`}
                    >
                      <img src={logo.url} className="w-full h-full object-contain" alt={logo.label} />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-slate-100"></div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">أيقونات جاهزة</span>
                  <div className="h-[1px] flex-1 bg-slate-100"></div>
                </div>

                {/* Pro Logo Grid */}
                <div className="grid grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {PRO_LOGOS.map(logo => (
                    <button
                      key={logo.id}
                      onClick={() => setCardData(p => ({ ...p, logoType: logo.id, logoUrl: undefined }))}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 ${cardData.logoType === logo.id && !cardData.logoUrl ? 'bg-white shadow-md ring-2 ring-indigo-500' : 'hover:bg-white/50'}`}
                    >
                      <div className="w-8 h-8 opacity-90">{logo.render(cardData.accentColor)}</div>
                      <span className="text-[8px] font-bold text-slate-500">{logo.label}</span>
                    </button>
                  ))}
                </div>

                {/* Upload Area */}
                <div onClick={() => logoInputRef.current?.click()} className="h-20 border-2 border-dashed border-indigo-100 rounded-3xl bg-indigo-50/30 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 transition-colors">
                  {cardData.logoUrl ? <img src={cardData.logoUrl} className="h-12 w-12 object-contain rounded-xl shadow-sm" /> : <div className="text-center"><span className="text-lg block mb-1">📤</span><span className="text-[10px] font-black text-indigo-400">رفع شعار</span></div>}
                  <input ref={logoInputRef} type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                </div>

                {/* Primary Logo Controls */}
                <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-700">الحجم (px)</label><span>{cardData.logoSize}px</span></div>
                    <input type="range" name="logoSize" min="40" max="200" step="5" value={cardData.logoSize} onChange={handleInputChange} className="w-full accent-indigo-600" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-700">تدوير الحواف</label><span>{cardData.logoRadius}%</span></div>
                    <input type="range" name="logoRadius" min="0" max="50" step="1" value={cardData.logoRadius} onChange={handleInputChange} className="w-full accent-indigo-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 block mb-1">Offset X</label>
                      <input type="range" name="logoOffsetX" min="-50" max="50" step="1" value={cardData.logoOffsetX} onChange={handleInputChange} className="w-full accent-indigo-600" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 block mb-1">Offset Y</label>
                      <input type="range" name="logoOffsetY" min="-50" max="50" step="1" value={cardData.logoOffsetY} onChange={handleInputChange} className="w-full accent-indigo-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" name="logoGlass" checked={cardData.logoGlass} onChange={handleInputChange} className="w-4 h-4 accent-indigo-600 rounded" />
                    <label className="text-xs font-bold text-slate-700">تأثير زجاجي (Glass)</label>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" name="logoTransparent" checked={cardData.logoTransparent} onChange={handleInputChange} className="w-4 h-4 accent-indigo-600 rounded" />
                    <label className="text-xs font-bold text-slate-700">خلفية شفافة</label>
                  </div>
                </div>

                {/* UNIFIED HEADER CONTROLS */}
                <div className="space-y-6 pt-6 border-t border-slate-100">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">مجموعة الرأس (Unified Header)</label>
                  <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 space-y-4">
                    <p className="text-[10px] text-slate-500 mb-2">تحكم في الشعار والنص ككتلة واحدة مترابطة.</p>
                    <div>
                      <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-700">تكبير الكتلة (Scale)</label><span>{cardData.headerScale}x</span></div>
                      <input type="range" name="headerScale" min="0.5" max="2" step="0.05" value={cardData.headerScale} onChange={handleInputChange} className="w-full accent-indigo-600" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 block mb-1">Position X</label>
                        <input type="range" name="headerPositionX" min="-100" max="100" step="2" value={cardData.headerPositionX} onChange={handleInputChange} className="w-full accent-indigo-600" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 block mb-1">Position Y</label>
                        <input type="range" name="headerPositionY" min="-100" max="100" step="2" value={cardData.headerPositionY} onChange={handleInputChange} className="w-full accent-indigo-600" />
                      </div>
                    </div>
                    {/* New Typography Controls for Header */}
                    <div className="grid grid-cols-2 gap-4 border-t border-indigo-50 pt-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <label className="text-[10px] font-bold text-slate-700">حجم العنوان (px)</label>
                          <span className="text-[10px] font-mono text-indigo-500">{cardData.headerTitleSize}px</span>
                        </div>
                        <input type="range" name="headerTitleSize" min="10" max="40" step="1" value={cardData.headerTitleSize} onChange={handleInputChange} className="w-full accent-indigo-600" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <label className="text-[10px] font-bold text-slate-700">حجم الوصف (px)</label>
                          <span className="text-[10px] font-mono text-indigo-500">{cardData.headerSubtitleSize}px</span>
                        </div>
                        <input type="range" name="headerSubtitleSize" min="8" max="24" step="1" value={cardData.headerSubtitleSize} onChange={handleInputChange} className="w-full accent-indigo-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECONDARY LOGO SECTION */}
              <div className="space-y-6 pt-6 border-t-2 border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">الشعار الثانوي (Bottom Right)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400">تفعيل</span>
                    <input type="checkbox" name="showLogo2" checked={cardData.showLogo2} onChange={handleInputChange} className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" />
                  </div>
                </div>

                {cardData.showLogo2 && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-6">
                    {/* Pro Logo Grid 2 */}
                    <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto p-1 custom-scrollbar">
                      {PRO_LOGOS.map(logo => (
                        <button
                          key={logo.id}
                          onClick={() => setCardData(p => ({ ...p, logo2Type: logo.id, logo2Url: undefined }))}
                          className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-1 ${cardData.logo2Type === logo.id && !cardData.logo2Url ? 'bg-indigo-50 border border-indigo-200' : 'bg-white border border-slate-100'}`}
                        >
                          <div className="w-4 h-4 opacity-90">{logo.render(cardData.accentColor)}</div>
                        </button>
                      ))}
                    </div>

                    {/* Upload Area 2 */}
                    <div className="flex gap-4 items-center">
                      <label className="flex-1 h-12 border border-dashed border-slate-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-50">
                        <span className="text-[10px] font-bold text-slate-500">رفع صورة +</span>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => setCardData(p => ({ ...p, logo2Url: ev.target?.result as string }));
                            reader.readAsDataURL(file);
                          }
                        }} />
                      </label>
                      {cardData.logo2Url && <img src={cardData.logo2Url} className="w-12 h-12 object-contain rounded-lg border border-slate-200" />}
                    </div>

                    {/* Secondary Logo Controls */}
                    <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">

                      {/* Text Control */}
                      <div className="space-y-2 mb-4 p-3 bg-white rounded-xl border border-slate-100">
                        <label className="text-xs font-bold text-slate-700 block">نص بجانب الشعار (Tagline)</label>
                        <div className="flex gap-2">
                          <input type="text" name="logo2Text" value={cardData.logo2Text} onChange={handleInputChange} className="flex-1 p-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-indigo-500" placeholder="مثال: Certified Partner" />
                          <div className="flex flex-col gap-1 items-center">
                            <input type="color" name="logo2TextColor" value={cardData.logo2TextColor || cardData.accentColor} onChange={handleInputChange} className="w-8 h-8 rounded-lg cursor-pointer border-none" title="لون النص" />
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                          <span className="text-[10px] font-bold text-slate-400">الحجم (px)</span>
                          <input type="range" name="logo2TextSize" min="8" max="32" step="1" value={cardData.logo2TextSize} onChange={handleInputChange} className="flex-1 accent-indigo-600 h-1" />
                          <span className="text-[10px] font-mono w-4">{cardData.logo2TextSize}</span>
                        </div>
                        {/* Position Toggle */}
                        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 mt-2">
                          <span className="text-[10px] font-bold text-slate-400">موقع النص:</span>
                          <div className="flex bg-slate-100 p-0.5 rounded-lg">
                            <button onClick={() => setCardData(p => ({ ...p, logo2TextPosition: 'left' }))} className={`px-2 py-1 rounded text-[10px] font-bold ${cardData.logo2TextPosition === 'left' ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}>يسار</button>
                            <button onClick={() => setCardData(p => ({ ...p, logo2TextPosition: 'right' }))} className={`px-2 py-1 rounded text-[10px] font-bold ${cardData.logo2TextPosition === 'right' ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}>يمين</button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-700">الحجم (px)</label><span>{cardData.logo2Size}px</span></div>
                        <input type="range" name="logo2Size" min="20" max="150" step="5" value={cardData.logo2Size} onChange={handleInputChange} className="w-full accent-indigo-600" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-black text-slate-400 block mb-1">Offset X</label>
                          <input type="range" name="logo2OffsetX" min="-100" max="100" step="2" value={cardData.logo2OffsetX} onChange={handleInputChange} className="w-full accent-indigo-600" />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 block mb-1">Offset Y</label>
                          <input type="range" name="logo2OffsetY" min="-100" max="100" step="2" value={cardData.logo2OffsetY} onChange={handleInputChange} className="w-full accent-indigo-600" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" name="logo2Glass" checked={cardData.logo2Glass} onChange={handleInputChange} className="w-4 h-4 accent-indigo-600 rounded" />
                          <label className="text-[10px] font-bold text-slate-700">زجاجي</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" name="logo2Transparent" checked={cardData.logo2Transparent} onChange={handleInputChange} className="w-4 h-4 accent-indigo-600 rounded" />
                          <label className="text-[10px] font-bold text-slate-700">شفاف</label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-8">
              <div className="space-y-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تخصيص الفوتر المتقدم</label>
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-2">نمط الفوتر</label>
                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                      {['simple', 'social', 'cta', 'none'].map((style) => (
                        <button key={style} onClick={() => setCardData(p => ({ ...p, footerStyle: style as any }))} className={`flex-1 py-2 rounded-lg text-[10px] font-bold ${cardData.footerStyle === style ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}>
                          {style === 'simple' ? 'بسيط' : style === 'social' ? 'تواصل' : style === 'cta' ? 'CTA' : 'لا شيء'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {cardData.footerStyle === 'social' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 block mb-1">انستجرام</label>
                        <input type="text" name="socialInstagram" value={cardData.socialInstagram} onChange={handleInputChange} className="w-full h-8 px-3 rounded-lg border border-slate-200 text-xs font-mono text-left" dir="ltr" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 block mb-1">تويتر / X</label>
                        <input type="text" name="socialTwitter" value={cardData.socialTwitter} onChange={handleInputChange} className="w-full h-8 px-3 rounded-lg border border-slate-200 text-xs font-mono text-left" dir="ltr" />
                      </div>
                    </div>
                  )}

                  {cardData.footerStyle === 'cta' && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 block mb-1">نص الدعوة لاتخاذ إجراء</label>
                        <input type="text" name="ctaText" value={cardData.ctaText} onChange={handleInputChange} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm font-bold" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 block mb-1">تصميم الزر</label>
                        <div className="grid grid-cols-4 gap-2">
                          {['solid', 'gradient', 'glass', 'outline'].map(s => (
                            <button key={s} onClick={() => setCardData(p => ({ ...p, ctaButtonStyle: s as any }))} className={`py-2 rounded-lg text-[10px] font-bold border ${cardData.ctaButtonStyle === s ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-slate-200 text-slate-500'}`}>
                              {s === 'solid' ? 'لون' : s === 'gradient' ? 'تدرج' : s === 'glass' ? 'زجاجي' : 'إطار'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* New Advanced CTA Controls */}
                      <div className="mt-4 pt-4 border-t border-slate-100 animate-fadeIn">
                        <label className="block text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">CTA Button Settings</label>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                          {/* Dependent color inputs based on style */}
                          {cardData.ctaButtonStyle === 'solid' && (
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 block mb-1">Color</label>
                              <input type="color" name="ctaBackgroundColor" value={cardData.ctaBackgroundColor} onChange={handleInputChange} className="w-full h-8 rounded cursor-pointer" />
                            </div>
                          )}
                          {cardData.ctaButtonStyle === 'outline' && (
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 block mb-1">Border</label>
                              <input type="color" name="ctaBorderColor" value={cardData.ctaBorderColor} onChange={handleInputChange} className="w-full h-8 rounded cursor-pointer" />
                            </div>
                          )}
                          {cardData.ctaButtonStyle === 'gradient' && (
                            <div className="col-span-2">
                              <label className="text-[10px] font-bold text-slate-400 block mb-1">Gradient (CSS)</label>
                              <input type="text" name="ctaGradient" value={cardData.ctaGradient} onChange={handleInputChange} className="w-full p-2 text-[10px] border border-slate-200 rounded font-mono" />
                            </div>
                          )}
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 block mb-1">Text Color</label>
                            <input type="color" name="ctaTextColor" value={cardData.ctaTextColor} onChange={handleInputChange} className="w-full h-8 rounded cursor-pointer" />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Opacity</label>
                            <input type="range" name="ctaOpacity" min="0" max="1" step="0.1" value={cardData.ctaOpacity} onChange={handleInputChange} className="w-full accent-indigo-600" />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Pad X</label>
                            <input type="range" name="ctaPaddingX" min="8" max="48" step="2" value={cardData.ctaPaddingX} onChange={handleInputChange} className="w-full accent-indigo-600" />
                          </div>
                          <div>
                            <input type="range" name="ctaPaddingY" min="4" max="24" step="2" value={cardData.ctaPaddingY} onChange={handleInputChange} className="w-full accent-indigo-600" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-100">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Offset X</label>
                            <input type="range" name="ctaOffsetX" min="-50" max="50" step="1" value={cardData.ctaOffsetX} onChange={handleInputChange} className="w-full accent-indigo-600" />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Offset Y</label>
                            <input type="range" name="ctaOffsetY" min="-50" max="50" step="1" value={cardData.ctaOffsetY} onChange={handleInputChange} className="w-full accent-indigo-600" />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Font Size ({cardData.ctaFontSize}px)</label>
                          <input type="range" name="ctaFontSize" min="10" max="20" step="1" value={cardData.ctaFontSize} onChange={handleInputChange} className="w-full accent-indigo-600" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Radius</label>
                            <input type="range" name="ctaRadius" min="0" max="50" step="2" value={cardData.ctaRadius} onChange={handleInputChange} className="w-full accent-indigo-600" />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Margin Top</label>
                            <input type="range" name="ctaMarginTop" min="0" max="40" step="2" value={cardData.ctaMarginTop} onChange={handleInputChange} className="w-full accent-indigo-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <hr className="border-slate-100" />

                  <div>
                    <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-700">ارتفاع الفوتر (Padding)</label><span>{cardData.footerPadding}px</span></div>
                    <input type="range" name="footerPadding" min="15" max="60" step="1" value={cardData.footerPadding} onChange={handleInputChange} className="w-full accent-indigo-600" />
                  </div>

                  {/* Floating Footer Controls */}
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">تنسيق التذييل العائم (Floating)</label>
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">تفعيل الشكل العائم</span>
                        <span className="text-[10px] text-slate-400">تحويل التذييل ككبسولة طائرة</span>
                      </div>
                      <input type="checkbox" name="footerIsFloating" checked={cardData.footerIsFloating} onChange={handleInputChange} className="w-5 h-5 accent-indigo-600 rounded" />
                    </div>

                    {cardData.footerIsFloating && (
                      <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div>
                          <div className="flex justify-between mb-1">
                            <label className="text-[10px] font-bold text-slate-700">الارتفاع عن الأسفل</label>
                            <span>{cardData.footerBottomOffset}px</span>
                          </div>
                          <input type="range" name="footerBottomOffset" min="0" max="100" step="1" value={cardData.footerBottomOffset} onChange={handleInputChange} className="w-full accent-indigo-600" />
                        </div>
                        <div className="flex items-center gap-2 pt-4">
                          <input type="checkbox" name="footerShadow" checked={cardData.footerShadow} onChange={handleInputChange} className="w-4 h-4 accent-indigo-600 rounded" />
                          <label className="text-[10px] font-bold text-slate-700">تفعيل الظل</label>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs font-bold text-slate-700 block mb-2">حجم العنوان الرئيسي (rem)</label>
                      <input type="range" name="titleSize" min="1" max="5" step="0.1" value={cardData.titleSize} onChange={handleInputChange} className="w-full accent-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-bold text-slate-700 block mb-2">حجم الوصف (rem)</label>
                      <input type="range" name="subtitleSize" min="0.8" max="3" step="0.05" value={cardData.subtitleSize} onChange={handleInputChange} className="w-full accent-indigo-600" />
                    </div>
                  </div>
                </div>

                {/* --- NEW DECORATION CONTROLS --- */}
                <div className="space-y-6 pt-6 border-t border-slate-100">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">زخارف العنوان والوصف</label>

                  {/* Title Underlines */}
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">تخصيص العنوان الرئيسي</label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-[10px] text-slate-400 block mb-1">سماكة الخط</label>
                        <select name="titleWeight" value={cardData.titleWeight} onChange={handleInputChange} className="w-full p-2 bg-slate-50 text-xs font-bold border border-slate-200 rounded-lg outline-none">
                          <option value="300">Light (300)</option>
                          <option value="400">Regular (400)</option>
                          <option value="500">Medium (500)</option>
                          <option value="600">SemiBold (600)</option>
                          <option value="700">Bold (700)</option>
                          <option value="900">Black (900)</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] text-slate-400 block mb-1">ارتفاع السطر</label>
                        <input type="number" name="lineHeight" min="0.8" max="2" step="0.1" value={cardData.lineHeight} onChange={handleInputChange} className="w-full p-2 bg-slate-50 text-xs font-bold border border-slate-200 rounded-lg outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">خطوط تحت العنوان</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">عرض الخط الطويل (px)</label>
                        <input type="range" name="titleLine1Width" min="10" max="300" value={cardData.titleLine1Width} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">عرض الخط القصير (px)</label>
                        <input type="range" name="titleLine2Width" min="5" max="100" value={cardData.titleLine2Width} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">السماكة (px)</label>
                        <input type="range" name="titleLineHeight" min="2" max="20" value={cardData.titleLineHeight} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="text-[10px] text-slate-400 block mb-1">شفافية</label>
                          <input type="range" name="titleLineOpacity" min="0" max="1" step="0.1" value={cardData.titleLineOpacity} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                        </div>
                        <input type="color" name="titleLineColor" value={cardData.titleLineColor} onChange={handleInputChange} className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200" title="لون الخطوط" />
                      </div>
                    </div>
                  </div>

                  {/* Subtitle Bar */}
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">شريط الوصف الجانبي</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">السمك (px)</label>
                        <input type="range" name="subtitleBarWidth" min="2" max="20" value={cardData.subtitleBarWidth} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">الطول (px)</label>
                        <input type="range" name="subtitleBarHeight" min="20" max="200" value={cardData.subtitleBarHeight} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <div className="flex-1">
                          <label className="text-[10px] text-slate-400 block mb-1">شفافية</label>
                          <input type="range" name="subtitleBarOpacity" min="0" max="1" step="0.1" value={cardData.subtitleBarOpacity} onChange={handleInputChange} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                        </div>
                        <input type="color" name="subtitleBarColor" value={cardData.subtitleBarColor} onChange={handleInputChange} className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200" title="لون الشريط" />
                      </div>
                    </div>
                  </div>

                  {/* Subtitle Text Weight & Line Height */}
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">تخصيص نص الوصف</label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-[10px] text-slate-400 block mb-1">سماكة الخط</label>
                        <select name="subtitleWeight" value={cardData.subtitleWeight} onChange={handleInputChange} className="w-full p-2 bg-slate-50 text-xs font-bold border border-slate-200 rounded-lg outline-none">
                          <option value="300">Light (300)</option>
                          <option value="400">Regular (400)</option>
                          <option value="500">Medium (500)</option>
                          <option value="600">SemiBold (600)</option>
                          <option value="700">Bold (700)</option>
                          <option value="900">Black (900)</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] text-slate-400 block mb-1">ارتفاع السطر</label>
                        <input type="number" name="subtitleLineHeight" min="1" max="3" step="0.1" value={cardData.subtitleLineHeight} onChange={handleInputChange} className="w-full p-2 bg-slate-50 text-xs font-bold border border-slate-200 rounded-lg outline-none" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}




          {activeTab === 'layout' && (
            <div className="space-y-8">
              {/* Layout Style Selector */}
              <div className="space-y-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">نمط التصميم (Archetype)</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'modern', label: 'مودرن', desc: '50/50', icon: '🌗' }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setCardData(p => ({ ...p, layoutStyle: style.id as any }))}
                      className={`relative overflow-hidden p-2 py-4 rounded-2xl border-2 flex flex-col items-center gap-1 ${cardData.layoutStyle === style.id ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-md' : 'bg-white border-slate-200 text-slate-500'}`}
                    >
                      <span className="text-2xl">{style.icon}</span>
                      <span className="text-[11px] font-bold">{style.label}</span>
                      {cardData.layoutStyle === style.id && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio Control */}
              <div className="space-y-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">أبعاد التصميم (Aspect Ratio)</label>
                <div className="bg-slate-50 p-1 rounded-xl border border-slate-200 grid grid-cols-4 gap-1">
                  {[
                    { id: '1.91:1', label: 'Link (1.91:1)', w: 1200, h: 630 },
                    { id: '4:5', label: 'Portrait (4:5)', w: 1080, h: 1350 },
                    { id: '1:1', label: 'Square (1:1)', w: 1080, h: 1080 },
                    { id: '16:9', label: 'Wide (16:9)', w: 1920, h: 1080 }
                  ].map((ratio) => (
                    <button
                      key={ratio.id}
                      onClick={() => setCardData(p => ({ ...p, aspectRatio: ratio.id as any, exportWidth: ratio.w, exportHeight: ratio.h }))}
                      className={`py-2 rounded-lg text-[10px] font-bold ${cardData.aspectRatio === ratio.id ? 'bg-white shadow text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Poster Mode Exclusive Controls */}
              {cardData.layoutStyle === 'poster' && (
                <div className="space-y-4 bg-slate-900 p-4 rounded-xl text-white">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">طبقة التباين (Overlay)</label>
                  <div className="grid grid-cols-5 gap-2">
                    {['none', 'fade-bottom', 'fade-top', 'scrim', 'center'].map(grad => (
                      <button
                        key={grad}
                        onClick={() => setCardData(p => ({ ...p, overlayGradient: grad as any }))}
                        className={`h-10 rounded-lg border border-white/20 ${cardData.overlayGradient === grad ? 'bg-indigo-600 border-indigo-500' : 'bg-white/5'}`}
                        title={grad}
                      >
                        <div className={`w-full h-full rounded opacity-80 ${grad === 'none' ? 'bg-transparent' :
                          grad === 'fade-bottom' ? 'bg-gradient-to-t from-black/80 to-transparent' :
                            grad === 'fade-top' ? 'bg-gradient-to-b from-black/80 to-transparent' :
                              grad === 'scrim' ? 'bg-black/40' :
                                'bg-[radial-gradient(circle,rgba(0,0,0,0.8)_0%,transparent_100%)]'
                          }`}></div>
                      </button>
                    ))}
                  </div>
                  <div>
                    <div className="flex justify-between mb-2"><label className="text-[10px] font-bold">الشفافية</label><span>{Math.round(cardData.overlayOpacity * 100)}%</span></div>
                    <input type="range" name="overlayOpacity" min="0" max="1" step="0.1" value={cardData.overlayOpacity} onChange={handleInputChange} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                  </div>
                </div>
              )}



              <div className="space-y-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الهيكل العام</label>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-2">محاذاة المحتوى عمودياً</label>
                      <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                        {['start', 'center', 'end'].map((align) => (
                          <button
                            key={align}
                            onClick={() => setCardData(p => ({ ...p, contentVerticalAlign: align as any }))}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${cardData.contentVerticalAlign === align ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}
                          >
                            {align === 'start' ? 'الأعلى' : align === 'center' ? 'المنتصف' : 'الأسفل'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-700">هوامش البطاقة (Padding)</label><span>{cardData.cardPadding}px</span></div>
                      <input type="range" name="cardPadding" min="0" max="150" step="5" value={cardData.cardPadding} onChange={handleInputChange} className="w-full accent-indigo-600" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-700">تباعد الوحدات (Gap)</label><span>{cardData.elementsGap}px</span></div>
                      <input type="range" name="elementsGap" min="0" max="100" step="4" value={cardData.elementsGap} onChange={handleInputChange} className="w-full accent-indigo-600" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-700">الهامش الخارجي (Margin)</label><span>{cardData.cardMargin}px</span></div>
                      <input type="range" name="cardMargin" min="0" max="60" step="5" value={cardData.cardMargin} onChange={handleInputChange} className="w-full accent-indigo-600" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2"><label className="text-xs font-bold text-slate-700">تدوير الحواف</label><span>{cardData.borderRadius}px</span></div>
                      <input type="range" name="borderRadius" min="0" max="100" step="2" value={cardData.borderRadius} onChange={handleInputChange} className="w-full accent-indigo-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 p-5 rounded-2xl">
                <h3 className="text-indigo-900 font-black text-lg mb-2 flex items-center gap-2">
                  <span>💾</span> إدارة الإعدادات المحفوظة
                </h3>
                <p className="text-sm text-indigo-700 leading-relaxed">
                  احفظ تصميماتك المفضلة واسترجعها في أي وقت. يمكنك أيضاً تصدير واستيراد الإعدادات.
                </p>
              </div>

              {/* Save New Preset */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <label className="text-sm font-black text-slate-800 block">حفظ الإعدادات الحالية</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    placeholder="اسم الإعداد (مثال: تصميم أزرق احترافي)"
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && savePreset()}
                  />
                  <button
                    onClick={savePreset}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <span>💾</span> حفظ
                  </button>
                </div>
              </div>

              {/* Import/Export */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={exportPresets}
                  disabled={savedPresets.length === 0}
                  className="py-3 bg-green-600 text-white rounded-xl font-black text-sm hover:bg-green-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>📤</span> تصدير الكل
                </button>
                <label className="py-3 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2">
                  <span>📥</span> استيراد
                  <input
                    type="file"
                    accept=".json"
                    onChange={importPresets}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Saved Presets List */}
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-800 block flex items-center justify-between">
                  <span>الإعدادات المحفوظة ({savedPresets.length})</span>
                  {savedPresets.length > 0 && (
                    <span className="text-xs font-bold text-slate-400">انقر لتحميل</span>
                  )}
                </label>

                {savedPresets.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-sm font-bold text-slate-400">لا توجد إعدادات محفوظة</p>
                    <p className="text-xs text-slate-400 mt-2">ابدأ بحفظ تصميمك الأول!</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                    {savedPresets.map((preset) => (
                      <div
                        key={preset.id}
                        className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black text-sm text-slate-800 truncate mb-1">
                              {preset.name}
                            </h4>
                            <p className="text-xs text-slate-400 font-bold">
                              {new Date(preset.timestamp).toLocaleDateString('ar-SA', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => loadPreset(preset)}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-black text-xs hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md flex items-center gap-1"
                            >
                              <span>📂</span> تحميل
                            </button>
                            <button
                              onClick={() => deletePreset(preset.id)}
                              className="px-3 py-2 bg-red-50 text-red-600 rounded-lg font-black text-xs hover:bg-red-600 hover:text-white transition-all border border-red-200 hover:border-red-600"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                <div className="flex gap-3">
                  <span className="text-2xl">💡</span>
                  <div className="flex-1">
                    <h4 className="font-black text-sm text-amber-900 mb-1">نصائح</h4>
                    <ul className="text-xs text-amber-800 space-y-1 font-bold">
                      <li>• يتم حفظ الإعدادات تلقائياً في المتصفح</li>
                      <li>• استخدم التصدير لحفظ نسخة احتياطية</li>
                      <li>• يمكنك مشاركة ملف JSON مع الآخرين</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 text-center">دقة التصدير (Resolution)</label>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {[1, 2, 3].map((s) => (
                <button key={s} onClick={() => setExportScale(s as any)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${exportScale === s ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}>
                  {s === 1 ? '1x (شاشة)' : s === 2 ? '2x (عالية)' : '3x (طباعة)'}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => downloadImage('png')} disabled={isDownloading} className="py-4 bg-slate-900 text-white rounded-[1.5rem] text-xs font-black shadow-xl flex items-center justify-center gap-2">
              PNG
            </button>
            <button onClick={() => downloadImage('jpg')} disabled={isDownloading} className="py-4 bg-slate-800 text-white rounded-[1.5rem] text-xs font-black shadow-xl flex items-center justify-center gap-2">
              JPG
            </button>
            <button onClick={() => downloadImage('pdf')} disabled={isDownloading} className="py-4 bg-red-600 text-white rounded-[1.5rem] text-xs font-black shadow-xl flex items-center justify-center gap-2">
              PDF (Print)
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            {isDownloading && <p className="text-center text-[10px] font-bold text-indigo-600">جاري المعالجة بدقة {exportScale}x ...</p>}
          </div>
        </div>
      </div >

      <div className="preview-container">
        <div className="preview-wrapper">
          <CardPreview data={cardData} />
        </div>
        <div className="footer-tag">Smart Investor Professional Studio v3</div>
      </div>
    </div >
  );
};

export default App;
