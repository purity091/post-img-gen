
export type PatternType =
  | 'none'
  // Basic
  | 'circles' | 'dots' | 'grid' | 'waves' | 'hexagons' | 'diagonal' | 'plus' | 'mesh'
  // Finance & Economy
  | 'candles' | 'graph-bar' | 'coins' | 'circuit' | 'globe-net' | 'arrows-up' | 'percent' | 'scales'
  | 'bull-market' | 'briefcase' | 'calculator' | 'bank' | 'growth-curve' | 'target' | 'pie-chart'
  // Islamic & Geometric
  | 'arabesque' | 'star-oct' | 'moroccan' | 'kufic-geom' | 'hex-star' | 'islamic-interlace' | 'mosque-dome' | 'crescent-star'
  // Abstract & Modern
  | 'waves-flow' | 'cubes' | 'prism' | 'noise' | 'lines-diag' | 'hexagons-3d' | 'triangles-net' | 'circles-concentric' | 'squares-overlap' | 'zigzag'
  // Texture & Minimal
  | 'halftone' | 'grunge' | 'dots-scatter' | 'grid-dotted' | 'lines-vertical' | 'crosshatch' | 'noise-static'
  // Premium & Creative
  | 'pulse-rings' | 'dna-helix' | 'constellation' | 'liquid-flow' | 'data-stream'
  | 'blueprint' | 'quantum-grid' | 'topographic' | 'crystal' | 'radiant-fiber'
  // Artistic Lines (Requested)
  | 'aurora-lines' | 'cosmic-flow' | 'abstract-curves' | 'tech-orbit' | 'zenith-rays'
  | 'dynamic-ribbon' | 'urban-sketch' | 'fused-wires' | 'minimal-pulse' | 'wave-motion'
  // Economic Artistry (50 New)
  | 'econ-wind-1' | 'econ-wind-2' | 'econ-wind-3' | 'econ-wind-4' | 'econ-wind-5' | 'econ-wind-6' | 'econ-wind-7' | 'econ-wind-8' | 'econ-wind-9' | 'econ-wind-10'
  | 'econ-vector-1' | 'econ-vector-2' | 'econ-vector-3' | 'econ-vector-4' | 'econ-vector-5' | 'econ-vector-6' | 'econ-vector-7' | 'econ-vector-8' | 'econ-vector-9' | 'econ-vector-10'
  | 'econ-strata-1' | 'econ-strata-2' | 'econ-strata-3' | 'econ-strata-4' | 'econ-strata-5' | 'econ-strata-6' | 'econ-strata-7' | 'econ-strata-8' | 'econ-strata-9' | 'econ-strata-10'
  | 'econ-global-1' | 'econ-global-2' | 'econ-global-3' | 'econ-global-4' | 'econ-global-5' | 'econ-global-6' | 'econ-global-7' | 'econ-global-8' | 'econ-global-9' | 'econ-global-10'
  | 'econ-pulse-1' | 'econ-pulse-2' | 'econ-pulse-3' | 'econ-pulse-4' | 'econ-pulse-5' | 'econ-pulse-6' | 'econ-pulse-7' | 'econ-pulse-8' | 'econ-pulse-9' | 'econ-pulse-10';

export interface CardData {
  showSubtitle: boolean;
  subtitlePosition: 'below-title' | 'below-image'; // New
  title: string;
  subtitle: string;
  imageUrl: string;
  accentColor: string;
  secondaryColor: string;
  authorName: string;
  website: string;
  themeType: 'modern' | 'glass' | 'bold';
  titleSize: number;
  subtitleSize: number;
  imageHeight: number;
  patternType: PatternType;
  patternOpacity: number;
  patternSize: number;
  showFooter: boolean;
  footerBgColor: string;
  footerOpacity: number;
  footerBottomOffset: number;
  footerIsFloating: boolean;
  footerShadow: boolean;
  footerAlignment: 'between' | 'center';
  contentPadding: number;
  contentVerticalAlign: 'start' | 'center' | 'end';
  overlayOpacity: number;
  borderRadius: number;
  footerText: string;
  cardPadding: number;
  cardMargin: number; // New External Margin
  elementsGap: number;

  // Primary Logo & Branding
  logoUrl?: string;
  logoSize: number;
  logoRadius: number;
  logoShadow: number;
  logoGlass: boolean;
  logoOffsetX: number;
  logoOffsetY: number;
  logoOpacity: number;
  logoTransparent: boolean;
  logoType?: string; // ID of preset logo
  headerScale: number;
  headerPositionX: number;
  headerPositionY: number;

  // Secondary Logo (Bottom Right)
  showLogo2: boolean;
  logo2Url?: string;
  logo2Size: number;
  logo2Radius: number;
  logo2Shadow: number;
  logo2Glass: boolean;
  logo2OffsetX: number;
  logo2OffsetY: number;
  logo2Opacity: number;
  logo2Transparent: boolean;
  logo2Type?: string;
  logo2Text: string;
  logo2TextColor: string;
  logo2TextSize: number;
  logo2TextWeight: string;
  logo2TextPosition: 'left' | 'right';

  imageBlur: number;
  imageBrightness: number;
  imageGrayscale: number;

  dashboardGridGap: number;
  dashboardGlassOpacity: number;

  // Image Spacing & Borders
  imageMarginTop: number;
  imageMarginBottom: number;
  imageMarginLeft: number;
  imageMarginRight: number;
  imagePaddingTop: number;
  imagePaddingBottom: number;
  imagePaddingLeft: number;
  imagePaddingRight: number;
  imageBorderRadius: number;
  imageBorderWidth: number;
  imageBorderColor: string;
  imageShadow: boolean;
  imagePositionX: number;
  imagePositionY: number;

  // Smart Analysis Data
  volatilityVal: string;
  volumeVal: string;
  sentimentVal: string;
  marketVal: string;
  marketChange: string;

  overlayColor: string;
  overlayBlendMode: string;
  // Footer Pro Properties
  footerPadding: number;
  footerAuthorSize: number;
  footerWebSize: number;
  footerBlur: number;
  footerTextColor: string; // Restored
  footerBorderTop: number; // thickness
  footerBorderColor: string;
  footerStyle: 'simple' | 'social' | 'cta' | 'none'; // Added 'none'
  ctaButtonStyle: 'solid' | 'gradient' | 'glass' | 'outline'; // New
  ctaBackgroundColor: string;
  ctaGradient: string;
  ctaBorderColor: string;
  ctaTextColor: string;
  ctaOpacity: number;
  ctaOffsetX: number;
  ctaOffsetY: number;
  // Advanced CTA Props
  ctaPaddingX: number;
  ctaPaddingY: number;
  ctaFontSize: number;
  ctaRadius: number;
  ctaMarginTop: number;
  socialInstagram: string; // New
  socialTwitter: string; // New
  ctaText: string; // New
  showAuthor: boolean; // New
  showAuthorImage: boolean; // New
  showWebsite: boolean; // New
  // New Features
  aspectRatio: '4:5' | '9:16' | '1:1' | '16:9' | '1.91:1';
  exportWidth: number;
  exportHeight: number;
  titleColor: string;
  subtitleColor: string;
  // Header & Title Decoration
  headerTitle: string;
  headerSubtitle: string;
  headerTitleSize: number;
  headerSubtitleSize: number;
  titleLine1Width: number; // in pixels
  titleLine2Width: number;
  titleLineHeight: number;
  titleLineColor: string;
  titleLineOpacity: number;
  titleLineAlign: 'right' | 'center' | 'left'; // New

  // Subtitle Decoration & Text
  subtitleBarWidth: number;
  subtitleBarHeight: number; // in pixels
  subtitleBarColor: string;
  subtitleBarOpacity: number;
  subtitleBarAlign: 'right' | 'center' | 'left'; // New
  subtitleWeight: string;   // '400', '600', '700', etc.
  subtitleLineHeight: number;


  imageContrast: number;
  imageSaturation: number;
  imageSepia: number;

  // Site & Author
  backgroundMode: 'image' | 'color' | 'gradient';
  backgroundColor: string;
  backgroundGradient: string; // New for Apple Gradients
  fontFamily: string;
  titleWeight: string; // '700', '900', etc.
  lineHeight: number;
  letterSpacing: number;
  textAlign: 'right' | 'center' | 'left';
  titleItalic: boolean; // New
  titleUnderline: boolean; // New

  // Title Spacing
  titleMarginTop: number;
  titleMarginBottom: number;
  titleMarginLeft: number;
  titleMarginRight: number;
  titlePaddingTop: number;
  titlePaddingBottom: number;
  titlePaddingLeft: number;
  titlePaddingRight: number;

  // Title Effects (Canva-like)
  titleEffect: 'none' | 'shadow' | 'lift' | 'outline' | 'hollow' | 'neon';
  titleEffectColor: string;
  titleEffectOpacity: number;
  titleEffectSize: number; // Blur or Thickness
  titleEffectOffsetX: number;
  titleEffectOffsetY: number;

  imageFullWidth: boolean; // New

  // Layout Engine
  layoutStyle: 'classic' | 'modern' | 'poster' | 'magazine' | 'minimal';
  footerLayout: 'bar' | 'floating' | 'clean';
  overlayGradient: 'none' | 'fade-bottom' | 'fade-top' | 'scrim' | 'center';

  // Smart Indicators
  indicators: ContentIndicator[];

  // Glass Container Customization
  glassValueSize: number;
  glassLabelSize: number;
  glassValueColor: string;
  glassLabelColor: string;
  glassValueTracking: number;
  glassLabelTracking: number;
  glassValueWeight: string;
  glassLabelWeight: string;
  glassValueItalic: boolean;
  glassLabelItalic: boolean;
  glassValueUnderline: boolean;
  glassLabelUnderline: boolean;
  glassValueCase: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  glassLabelCase: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  glassValueMarginTop: number;
  glassValueMarginBottom: number;
  glassLabelMarginTop: number;
  glassLabelMarginBottom: number;
  glassTextGap: number;
  glassPadding: number;
  glassGap: number;
  glassRadius: number;
  glassOpacity: number;
  glassBorder: number;
  glassShadow: number;
}

export interface ContentIndicator {
  id: string;
  icon: string;
  label: string;
  value: string;
  type: 'primary' | 'secondary' | 'passive';
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

export const PRESET_THEMES = [
  { name: 'Midnight Emerald', primary: '#064e3b', secondary: '#f59e0b', bg: '#ecfdf5' },
  { name: 'Royal Velvet', primary: '#4c1d95', secondary: '#10b981', bg: '#f5f3ff' },
  { name: 'Luxury Onyx', primary: '#0f172a', secondary: '#94a3b8', bg: '#f8fafc' },
  { name: 'Desert Sun', primary: '#7c2d12', secondary: '#fbbf24', bg: '#fff7ed' },
  { name: 'Corporate Blue', primary: '#1e3a8a', secondary: '#60a5fa', bg: '#eff6ff' },
  { name: 'Cyber Pink', primary: '#831843', secondary: '#f472b6', bg: '#fdf2f8' },
  { name: 'Golden Slate', primary: '#334155', secondary: '#eab308', bg: '#f1f5f9' },
  { name: 'Nordic Frost', primary: '#0891b2', secondary: '#94a3b8', bg: '#ecfeff' },
  { name: 'Sunset Rose', primary: '#9f1239', secondary: '#fb7185', bg: '#fff1f2' },
  { name: 'Carbon Fiber', primary: '#171717', secondary: '#dc2626', bg: '#fafafa' }
];
