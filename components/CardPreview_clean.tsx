import React from 'react';
import { CardData, PatternType } from '../types';
import { PATTERN_PATHS } from './PatternPaths';
import { PRO_LOGOS, PRO_INDICATOR_ICONS } from './LogoAssets';

interface CardPreviewProps {
  data: CardData & { logoSize?: number; logoRadius?: number; logoShadow?: boolean; logoGlass?: boolean; dashboardGridGap?: number; logoType?: string };
}

const PatternOverlay: React.FC<{ type: PatternType; color: string; opacity: number; size: number }> = ({ type, color, opacity, size }) => {
  if (type === 'none') return null;

  const commonProps = {
    className: "absolute inset-0 pointer-events-none z-0",
    style: { color, opacity: opacity }
  };

  const PatternComponent = PATTERN_PATHS[type] || PATTERN_PATHS['none'];

  return (
    <div {...commonProps}>
      {PatternComponent(size, color)}
    </div>
  );
};

const CardPreview: React.FC<CardPreviewProps> = ({ data }) => {

  // --- Layout Renderers ---

  const renderClassic = () => {
    const isDarkBg = data.backgroundMode === 'gradient' && (data.backgroundGradient.includes('#0B1120') || data.backgroundGradient.includes('#000000') || data.backgroundGradient.includes('#0F1035'));

    return (
      <div className="flex-1 relative flex flex-col z-10"
        style={{
          padding: `${data.cardMargin}px`,
          gap: `${data.elementsGap}px`
        }}
      >
        {/* Global Background Layer for Classic */}
        <div className="absolute inset-0 z-0" style={{
          background: data.backgroundMode === 'color' ? data.backgroundColor : (data.backgroundGradient || 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)'),
          borderRadius: 0 // Background always fills full canvas
        }}></div>

        <div className={`flex-1 overflow-hidden flex flex-col relative ${isDarkBg ? 'bg-white/5 border border-white/10 text-white' : 'bg-white text-slate-900'}`}
          style={{
            backdropFilter: isDarkBg ? 'blur(20px)' : 'none',
            borderRadius: `${data.borderRadius}px`,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' // Restore shadow
          }}
        >
          {/* Inner Content Padding */}
          <div className={`flex-1 flex flex-col ${data.contentVerticalAlign === 'start' ? 'justify-start' : data.contentVerticalAlign === 'end' ? 'justify-end' : 'justify-center'} relative z-10`}
            style={{ padding: `${data.cardPadding}px` }}
          >
            {renderHeader(isDarkBg)}
            <div className="my-auto">
              {renderKeyContent(isDarkBg)}
              {renderVisualSection()}
            </div>
          </div>
          {renderFooter(!isDarkBg)}
        </div>
      </div>
    );
  };

  const renderModern = () => {
    // Dynamic styles based on theme/background brightness
    const isDarkBg = data.backgroundMode === 'color' && ['#1e293b', '#0f172a', '#000000', '#18181b', '#111827'].includes(data.backgroundColor);
    const primaryTextColor = isDarkBg ? 'text-white' : 'text-slate-900';
    const secondaryTextColor = isDarkBg ? 'text-slate-400' : 'text-slate-500';

    return (
      <div className="flex-1 relative flex flex-col z-10 h-full">
        {/* Full Bleed Grid - No outer padding/card wrapper */}
        <div className="flex-1 grid grid-cols-12 relative overflow-hidden"
          style={{ fontFamily: data.fontFamily }}>

          {/* Global Background (Gradient/Color) */}
          <div className="absolute inset-0 z-0" style={{
            background: data.backgroundMode === 'color' ? data.backgroundColor : (data.backgroundGradient || 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)'),
          }}>
            {/* Pattern Overlay on top of gradient */}
            {data.backgroundMode !== 'image' && <PatternOverlay type={data.patternType} color={data.accentColor} opacity={data.patternOpacity} size={data.patternSize} />}

            {/* Smooth Grain Texture */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opaciry='1'/%3E%3C/svg%3E")` }}></div>
          </div>

          {/* Text Side (The Message) - Now order-1 on mobile for hierarchy */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center relative z-10 order-1"
            style={{ padding: `${data.cardPadding}px` }}
          >
            <div className={`flex flex-col gap-6 ${data.textAlign === 'center' ? 'items-center' : data.textAlign === 'left' ? 'items-start' : 'items-end'}`}>

              {/* Brand Identity (The Signature) - MOVED TO OPPOSITE SIDE (LEFT) per request */}
              <div className="opacity-90 w-full flex justify-start">
                {renderHeader(isDarkBg)}
              </div>

              {/* Main Typography (The Headline) */}
              <div className="w-full">
                {renderKeyContent(isDarkBg)}
              </div>

            </div>
          </div>

          {/* Visual Side (The Data) - Now order-2 on mobile */}
          <div className="col-span-12 lg:col-span-5 relative z-10 order-2 flex flex-col justify-center"
            style={{ padding: `${data.cardPadding}px` }}
          >

            {/* Apple-style Soft Grid */}
            <div className="grid grid-cols-2 w-full aspect-square content-center"
              style={{ gap: `${data.glassGap || 24}px` }}>

              {data.indicators.slice(0, 4).map((ind, i) => (
                <div key={ind.id}
                  className={`backdrop-blur-2xl shadow-2xl border flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] overflow-hidden
                        ${isDarkBg ? 'border-white/20' : 'border-white/40'}
                        `}
                  style={{
                    height: '240px', // Fixed height to stabilize layout
                    padding: `${data.glassPadding || 32}px`,
                    borderRadius: `${data.glassRadius || 48}px`,
                    backgroundColor: isDarkBg
                      ? `rgba(255,255,255,${data.glassOpacity || 0.08})`
                      : `rgba(255,255,255,${(data.glassOpacity || 0.1) + 0.6})`,
                    borderWidth: `${data.glassBorder || 1}px`,
                    boxShadow: `0 ${(data.glassShadow || 40) / 2}px ${data.glassShadow || 40}px -10px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.1)`,
                    fontFamily: "'IBM Plex Sans Arabic', sans-serif"
                  }}
                >

                  {/* Icon Wrapper - Apple Glass Style */}
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 flex items-center justify-center p-3.5"
                      style={{
                        borderRadius: `${(data.glassRadius || 48) * 0.5}px`,
                        backgroundColor: 'transparent',
                        color: data.accentColor || '#6366f1'
                      }}
                    >
                      {PRO_INDICATOR_ICONS[ind.id] ? PRO_INDICATOR_ICONS[ind.id](data.accentColor || '#6366f1') : ind.icon}
                    </div>

                    {ind.trend && (
                      <div className={`px-2.5 py-1.5 rounded-full flex items-center justify-center backdrop-blur-md border ${ind.trend === 'up' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}
                        style={{ backgroundColor: ind.trend === 'up' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', opacity: 0.8 + (data.glassOpacity * 2) }}>
                        {ind.trend === 'up' ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-col" style={{ gap: `${data.glassTextGap || 4}px` }}>
                      <span className="block"
                        style={{
                          color: data.glassValueColor || (isDarkBg ? 'white' : data.titleColor || '#0f172a'),
                          textShadow: isDarkBg ? '0 4px 15px rgba(0,0,0,0.3)' : 'none',
                          fontSize: `${data.glassValueSize || 60}px`,
                          letterSpacing: `${data.glassValueTracking || -2}px`,
                          fontWeight: data.glassValueWeight || '900',
                          fontStyle: data.glassValueItalic ? 'italic' : 'normal',
                          textDecoration: data.glassValueUnderline ? 'underline' : 'none',
                          textTransform: data.glassValueCase || 'none',
                          marginTop: `${data.glassValueMarginTop || 0}px`,
                          marginBottom: `${data.glassValueMarginBottom || 0}px`,
                          lineHeight: '1'
                        }}
                      >{ind.value}</span>
                      <span className="opacity-40 block"
                        style={{
                          fontSize: `${data.glassLabelSize || 13}px`,
                          color: data.glassLabelColor || (isDarkBg ? '#94a3b8' : '#64748b'),
                          letterSpacing: `${data.glassLabelTracking || 2.5}px`,
                          fontWeight: data.glassLabelWeight || '900',
                          fontStyle: data.glassLabelItalic ? 'italic' : 'normal',
                          textDecoration: data.glassLabelUnderline ? 'underline' : 'none',
                          textTransform: data.glassLabelCase || 'uppercase',
                          marginTop: `${data.glassLabelMarginTop || 0}px`,
                          marginBottom: `${data.glassLabelMarginBottom || 0}px`
                        }}>{ind.label}</span>
                    </div>
                  </div>
                </div>
              ))}

              {data.indicators.length < 4 && Array.from({ length: 4 - data.indicators.length }).map((_, i) => (
                <div key={`empty-${i}`} className={`rounded-[2rem] shadow-sm border ${isDarkBg ? 'bg-white/5 border-white/10' : 'bg-white/30 border-white/20'}`}></div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  };

  const renderPoster = () => (
    <div className="flex-1 relative h-full flex flex-col z-10" style={{ padding: `${data.cardMargin}px` }}>
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full"
          style={{
            backgroundImage: `url(${data.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: `${data.imagePositionX}% ${data.imagePositionY}%`,
            filter: getFilterString()
          }}
        />
      </div>

      {/* Overlay Gradient */}
      <div className={`absolute inset-0 z-0 ${data.overlayGradient === 'fade-bottom' ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent' :
        data.overlayGradient === 'fade-top' ? 'bg-gradient-to-b from-black/90 via-black/40 to-transparent' :
          data.overlayGradient === 'scrim' ? 'bg-black/60' :
            data.overlayGradient === 'center' ? 'bg-[radial-gradient(circle,rgba(0,0,0,0.8)_0%,transparent_100%)]' :
              'bg-transparent'
        }`} style={{ opacity: data.overlayOpacity + 0.2 }}></div>

      {/* Content Layer */}
      <div className={`relative z-10 flex-1 flex flex-col`} style={{ padding: `${data.cardPadding}px` }}>
        <div className="flex justify-between items-start">
          {renderHeader(true)} {/* Is Dark Mode forced? Yes for poster */}
        </div>

        <div className={`flex-1 flex flex-col ${data.contentVerticalAlign === 'start' ? 'justify-start pt-12' : data.contentVerticalAlign === 'end' ? 'justify-end pb-12' : 'justify-center'} gap-8`}>
          <div className="">
            {renderKeyContent(true)} {/* Force White Text */}
          </div>
        </div>

        {renderFooter(true)}
      </div>
    </div>
  );

  const renderMagazine = () => (
    <div className="flex-1 relative flex flex-col z-10 bg-white h-full" style={{ padding: `${data.cardMargin}px` }}>
      {/* Magazine Grid */}
      <div className="flex-1 grid grid-cols-12 grid-rows-12 h-full gap-6" style={{ padding: `${data.cardPadding}px` }}>

        {/* Header Area */}
        <div className="col-span-12 row-span-1 border-b-2 border-slate-900 pb-4 flex justify-between items-end">
          <span className="text-6xl font-black uppercase tracking-tighter" style={{ color: data.accentColor, fontFamily: data.fontFamily }}>MAG</span>
          <div className="flex flex-col items-end">
            {renderHeader()}
          </div>
        </div>

        {/* Main Image - Takes prominent space */}
        <div className="col-span-8 row-span-7 relative bg-slate-100 rounded-lg overflow-hidden border border-slate-900">
          <div className="w-full h-full" style={{
            backgroundImage: `url(${data.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: `${data.imagePositionX}% ${data.imagePositionY}%`,
            filter: getFilterString()
          }} />
        </div>

        {/* Sidebar Info */}
        <div className="col-span-4 row-span-7 flex flex-col gap-4 border-l-2 border-slate-100 pl-6 justify-center">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Featured Article</span>
          {renderKeyContent()}
        </div>

        {/* Footer / Body Text Area */}
        <div className="col-span-12 row-span-4 border-t-2 border-slate-900 pt-6 flex gap-8">
          <div className="flex-1">
          </div>
          <div className="w-1/3 flex items-end justify-end">
            {renderFooter(false)}
          </div>
        </div>

      </div>
    </div>
  );

  const renderMinimal = () => (
    <div className="flex-1 relative flex flex-col z-10 bg-white items-center justify-center text-center"
      style={{ padding: `calc(${data.cardMargin}px + ${data.cardPadding}px)` }}
    >
      <div className="absolute top-12 w-full flex justify-center opacity-50 contrast-50 grayscale">
        {renderHeader()}
      </div>

      <div className="max-w-2xl mx-auto space-y-12">
        <div className="w-2 h-1 mx-auto bg-slate-900"></div>
        {renderKeyContent()}

        {data.showFooter && (
          <div className="pt-12 mt-12 border-t border-slate-100 w-full flex justify-center">
            {renderFooter(false)}
          </div>
        )}
      </div>
    </div>
  );


// --- Helper Components & Renderers ---

const getFilterString = () => `blur(${data.imageBlur}px) brightness(${data.imageBrightness}) contrast(${data.imageContrast}) saturate(${data.imageSaturation}) sepia(${data.imageSepia}) grayscale(${data.imageGrayscale})`;

const renderVisualSection = () => (
  <div
    className="relative mt-8"
    style={{
      marginLeft: data.imageFullWidth ? `-${data.cardPadding + 48}px` : `${data.imageMarginLeft}px`, // +48 compensates for p-12 padding in classic
      marginRight: data.imageFullWidth ? `-${data.cardPadding + 48}px` : `${data.imageMarginRight}px`,
      marginTop: `${data.imageMarginTop}px`,
      marginBottom: `${data.imageMarginBottom}px`,
      paddingTop: `${data.imagePaddingTop}px`,
      paddingBottom: `${data.imagePaddingBottom}px`,
      paddingLeft: `${data.imagePaddingLeft}px`,
      paddingRight: `${data.imagePaddingRight}px`,
      borderRadius: `${data.imageBorderRadius}px`,
      borderWidth: `${data.imageBorderWidth}px`,
      borderColor: data.imageBorderColor,
      boxShadow: data.imageShadow ? '0 10px 40px -10px rgba(0,0,0,0.3)' : 'none',
      overflow: 'hidden',
      backgroundColor: data.backgroundMode === 'color' ? data.backgroundColor : 'transparent'
    }}
  >
    <div className="relative overflow-hidden w-full" style={{ height: `${data.imageHeight}px` }}>
      <div className="w-full h-full"
        style={{
          backgroundImage: `url(${data.backgroundMode === 'color' ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : data.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: `${data.imagePositionX}% ${data.imagePositionY}%`,
          filter: getFilterString()
        }}
      ></div>
    </div>
  </div>
);

const renderHeader = (forceDarkMode = false) => (
  <div className="flex items-center gap-4"
    style={{
      transform: `translate(${(data.headerPositionX || 0) + (data.logoOffsetX || 0)}px, ${(data.headerPositionY || 0) + (data.logoOffsetY || 0)}px) scale(${data.headerScale || 1})`,
      transformOrigin: 'center left'
    }}
  >
    <div
      className="flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: 'transparent',
        width: `${data.logoSize}px`,
        height: `${data.logoSize}px`,
        opacity: data.logoOpacity,
        borderRadius: `${data.logoRadius}%`,
        boxShadow: 'none'
      }}
    >
      {data.logoUrl ? (
        <img src={data.logoUrl} className="w-full h-full object-contain p-1" />
      ) : data.logoType ? (
        <div className="w-full h-full">
          {PRO_LOGOS.find(l => l.id === data.logoType)?.render(data.logoTransparent ? data.accentColor : '#ffffff')}
        </div>
      ) : (
        <span className={`font-black text-2xl ${data.logoTransparent ? 'text-indigo-600' : 'text-white'}`}>I</span>
      )}
    </div>
    <div className="flex flex-col gap-0.5">
      <span className={`block font-black leading-snug ${forceDarkMode || data.layoutStyle === 'poster' ? 'text-white' : 'text-slate-900'}`}
        style={{ fontFamily: data.fontFamily, fontSize: `${data.headerTitleSize || 14}px` }}>{data.headerTitle}</span>
      <span className={`block opacity-80 leading-snug`}
        style={{
          fontFamily: data.fontFamily,
          fontSize: `${data.headerSubtitleSize || 10}px`,
          color: (forceDarkMode || data.layoutStyle === 'poster') ? 'rgba(255,255,255,0.8)' : data.accentColor
        }}>{data.headerSubtitle}</span>
    </div>
  </div>
);

const renderKeyContent = (forceWhite = false) => (
  <div className={`w-full flex flex-col ${data.textAlign === 'center' ? 'items-center' : data.textAlign === 'left' ? 'items-start' : 'items-end'}`}>

    <h1
      style={{
        fontSize: `${data.titleSize}rem`,
        color: forceWhite ? 'white' : (data.titleEffect === 'hollow' ? 'transparent' : data.titleColor),
        fontWeight: data.titleWeight,
        fontStyle: data.titleItalic ? 'italic' : 'normal',
        textDecoration: data.titleUnderline ? 'underline' : 'none',
        lineHeight: data.lineHeight,
        letterSpacing: `${data.letterSpacing}px`,
        textAlign: data.textAlign as any,
        // Effects
        textShadow:
          data.titleEffect === 'shadow' ? `${data.titleEffectOffsetX}px ${data.titleEffectOffsetY}px ${data.titleEffectSize}px ${data.titleEffectColor}${Math.floor(data.titleEffectOpacity * 255).toString(16).padStart(2, '0')}` :
            data.titleEffect === 'lift' ? `${data.titleEffectOffsetX}px ${data.titleEffectOffsetY}px ${data.titleEffectSize + 10}px rgba(0,0,0,${data.titleEffectOpacity})` :
              data.titleEffect === 'neon' ? `0 0 ${data.titleEffectSize}px ${data.titleEffectColor}, 0 0 ${data.titleEffectSize * 3}px ${data.titleEffectColor}` : 'none',
        WebkitTextStroke: (data.titleEffect === 'outline' || data.titleEffect === 'hollow')
          ? `${data.titleEffectSize}px ${forceWhite ? 'white' : data.titleEffectColor}`
          : '0'
      }}
      className="leading-tight mb-4 w-full"
    >
      {data.title}
    </h1>

    {/* Dynamic Title Underlines */}
    <div className={`w-full flex gap-2 mb-6 ${data.titleLineAlign === 'center' ? 'justify-center' :
      data.titleLineAlign === 'left' ? 'justify-end' :
        'justify-start'
      }`}>
      <div className="rounded-full" style={{ width: `${data.titleLine1Width}px`, height: `${data.titleLineHeight}px`, backgroundColor: forceWhite ? 'white' : data.titleLineColor, opacity: data.titleLineOpacity }}></div>
      <div className="rounded-full" style={{ width: `${data.titleLine2Width}px`, height: `${data.titleLineHeight}px`, backgroundColor: forceWhite ? 'white' : data.titleLineColor, opacity: data.titleLineOpacity * 0.5 }}></div>
    </div>

    {data.showSubtitle && (
      <div className={`w-full flex items-center gap-6 mb-8 ${data.subtitleBarAlign === 'center' ? 'justify-center' :
        data.subtitleBarAlign === 'left' ? 'justify-end flex-row-reverse' :
          'justify-start flex-row'
        }`}>
        <div className="shrink-0 rounded-full" style={{ width: `${data.subtitleBarWidth}px`, height: `${data.subtitleBarHeight}px`, backgroundColor: forceWhite ? 'white' : data.subtitleBarColor, opacity: data.subtitleBarOpacity }}></div>
        <p className="opacity-90" style={{
          fontSize: `${data.subtitleSize}rem`,
          color: forceWhite ? 'rgba(255,255,255,0.9)' : data.subtitleColor,
          fontWeight: data.subtitleWeight as any,
          lineHeight: data.subtitleLineHeight,
          fontFamily: "'IBM Plex Sans Arabic', sans-serif"
        }}>{data.subtitle}</p>
      </div>
    )}
  </div>
);


const renderFooter = (transparentBg = false) => {
  if (!data.showFooter) return null;

  const isDarkBg = data.backgroundMode === 'color' && ['#000000', '#0f172a', '#1e293b', '#171717'].includes(data.backgroundColor.toLowerCase());

  const floatingStyles: React.CSSProperties = data.footerIsFloating ? {
    position: 'absolute',
    bottom: `${data.footerBottomOffset}px`,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 80px)', // Pill width
    borderRadius: `${data.borderRadius / 2}px`,
    boxShadow: data.footerShadow ? '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)' : 'none',
    zIndex: 50,
    overflow: 'hidden'
  } : {
    marginTop: 'auto',
  };

  // --- Layout: Floating (Apple Dynamic Island Style) ---
  // If user specifically selected 'floating' layout, we override some defaults
  if (data.footerLayout === 'floating' || data.footerIsFloating) {
    return (
      <div className={`${data.footerIsFloating ? '' : 'w-full flex justify-center mb-8 absolute bottom-0 left-0 right-0 z-50 pointer-events-none px-4'}`}
        style={data.footerIsFloating ? floatingStyles : {}}>
        <div className={`${data.footerIsFloating ? 'w-full' : 'bg-black/80 backdrop-blur-xl text-white rounded-full py-3 px-8 shadow-2xl flex items-center gap-8 pointer-events-auto border border-white/10'}`}
          style={{
            backgroundColor: data.footerIsFloating ? (transparentBg ? 'transparent' : data.footerBgColor) : data.footerBgColor,
            borderColor: data.footerBorderColor,
            padding: data.footerIsFloating ? '16px 32px' : '',
            display: 'flex',
            alignItems: 'center',
            justifyContent: data.footerAlignment === 'center' ? 'center' : 'space-between',
            gap: '2rem',
            color: data.footerTextColor,
            opacity: data.footerOpacity
          }}
        >
          <div className="flex items-center gap-4">
            {data.showAuthorImage && (
              <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex flex-col" style={{ gap: `${data.glassTextGap || 4}px` }}>
              <span className="text-2xl block"
                style={{
                  color: data.glassValueColor || (isDarkBg ? 'white' : data.titleColor || '#0f172a'),
                  letterSpacing: `${data.glassValueTracking || -1}px`,
                  fontWeight: data.glassValueWeight || '900',
                  fontStyle: data.glassValueItalic ? 'italic' : 'normal',
                  textDecoration: data.glassValueUnderline ? 'underline' : 'none',
                  textTransform: data.glassValueCase || 'none',
                  marginTop: `${data.glassValueMarginTop || 0}px`,
                  marginBottom: `${data.glassValueMarginBottom || 0}px`
                }}>{data.authorName || 'اقتصاد العرب'}</span>
              <span className="text-xs opacity-50 tracking-widest block"
                style={{
                  color: data.glassLabelColor || (isDarkBg ? '#94a3b8' : '#64748b'),
                  letterSpacing: `${data.glassLabelTracking || 2}px`,
                  fontWeight: data.glassLabelWeight || '700',
                  fontStyle: data.glassLabelItalic ? 'italic' : 'normal',
                  textDecoration: data.glassLabelUnderline ? 'underline' : 'none',
                  textTransform: data.glassLabelCase || 'uppercase',
                  marginTop: `${data.glassLabelMarginTop || 0}px`,
                  marginBottom: `${data.glassLabelMarginBottom || 0}px`
                }}>{data.website || 'ECONOMY.ARAB'}</span>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-white/20"></div>

          {/* CTA Button in Floating */}
          {data.footerStyle === 'cta' && (
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black ${data.ctaButtonStyle === 'solid' ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
              style={{ borderRadius: `${data.ctaRadius}px` }}>
              {data.ctaText} ←
            </div>
          )}

          {!data.footerStyle && <div className="font-mono text-xs opacity-80 dir-ltr">{data.website}</div>}
        </div>
      </div>
    );
  }

  // --- Layout: Clean (Minimal Text) ---
  if (data.footerLayout === 'clean') {
    return (
      <div className="w-full text-center opacity-60 mix-blend-difference"
        style={{ ...floatingStyles, color: data.footerTextColor, padding: '24px' }}>
        <p className="text-xs font-black uppercase tracking-[0.3em] font-mono">{data.authorName} — {data.website}</p>
      </div>
    );
  }

  // --- Layout: Standard Bar (Refined) ---
  return (
    <div
      className={`flex items-center ${data.footerAlignment === 'center' ? 'flex-col gap-6 text-center' : 'justify-between'}`}
      style={{
        ...floatingStyles,
        backgroundColor: transparentBg ? 'transparent' : data.footerBgColor,
        padding: `${data.footerPadding}px 40px`,
        borderTop: !data.footerIsFloating ? `${data.footerBorderTop}px solid ${data.footerBorderColor}` : 'none',
        color: data.footerTextColor,
        opacity: data.footerOpacity
      }}
    >
      <div className={`flex items-center gap-4 ${data.footerAlignment === 'center' ? 'flex-col' : ''}`}>
        {data.showAuthorImage && (
          <div className="w-12 h-12 rounded-[1rem] border border-white/10 overflow-hidden shadow-sm">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex flex-col items-start">
          {/* Author Name Removed as per request */}
          {data.showWebsite && <p className="font-semibold uppercase tracking-wider opacity-60 leading-tight" style={{ fontSize: `${data.footerWebSize}px`, color: 'inherit' }}>{data.website}</p>}
        </div>
      </div>

      <div className={`flex flex-col ${data.footerAlignment === 'center' ? 'items-center w-full' : 'items-end'}`}>
        {data.footerStyle === 'cta' && (
          <div className={`flex items-center gap-3 px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95`}
            style={{
              borderRadius: `${data.ctaRadius}px`,
              backgroundColor: data.ctaButtonStyle === 'solid' ? data.ctaBackgroundColor :
                data.ctaButtonStyle === 'glass' ? 'rgba(255,255,255,0.1)' : 'transparent',
              background: data.ctaButtonStyle === 'gradient' ? data.ctaGradient : undefined,
              border: data.ctaButtonStyle === 'outline' ? `2px solid ${data.ctaBorderColor}` :
                data.ctaButtonStyle === 'glass' ? '1px solid rgba(255,255,255,0.2)' : 'none',
              backdropFilter: data.ctaButtonStyle === 'glass' ? 'blur(10px)' : 'none',
              color: data.ctaTextColor,
              transform: `translate(${data.ctaOffsetX}px, ${data.ctaOffsetY}px)`,
              opacity: data.ctaOpacity
            }}
          >
            <span className="font-bold text-sm tracking-wide">{data.ctaText}</span>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-sm"
              style={{
                backgroundColor: data.ctaTextColor,
                color: data.ctaButtonStyle === 'solid' ? data.ctaBackgroundColor :
                  data.ctaButtonStyle === 'gradient' ? 'white' :
                    data.ctaButtonStyle === 'outline' ? data.ctaBorderColor : 'black'
              }}
            >
              ⏴
            </div>
          </div>
        )}

        {data.footerStyle === 'social' && (
          <div className="flex gap-4 text-current opacity-80">
            {data.socialInstagram && <span className="font-mono text-xs">📸 {data.socialInstagram}</span>}
            {data.socialTwitter && <span className="font-mono text-xs">✖ {data.socialTwitter}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

const renderLogo2 = () => {
  if (!data.showLogo2) return null;
  return (
    <div
      className={`absolute z-40 flex items-center justify-end gap-3 transition-all duration-300 pointer-events-none ${data.logo2TextPosition === 'right' ? 'flex-row-reverse' : 'flex-row'}`}
      style={{
        bottom: '40px',
        right: '40px',
        transform: `translate(${data.logo2OffsetX}px, ${data.logo2OffsetY}px)`,
      }}
    >
      {/* Optional Text */}
      {data.logo2Text && (
        <span
          className="font-bold whitespace-nowrap"
          style={{
            fontSize: `${data.logo2TextSize}px`,
            color: data.logo2TextColor || data.accentColor,
            fontFamily: data.fontFamily,
            fontWeight: data.logo2TextWeight as any,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {data.logo2Text}
        </span>
      )}

      {/* Logo Container */}
      <div
        className="flex items-center justify-center overflow-hidden shadow-lg"
        style={{
          width: `${data.logo2Size}px`,
          height: `${data.logo2Size}px`,
          backgroundColor: data.logo2Transparent ? 'transparent' : (data.logo2Glass ? 'rgba(255,255,255,0.1)' : data.accentColor),
          borderRadius: `${data.logo2Radius}%`,
          boxShadow: (!data.logo2Transparent && data.logo2Shadow > 0) ? `0 ${data.logo2Shadow}px ${data.logo2Shadow * 2}px rgba(0,0,0,0.2)` : 'none',
          backdropFilter: data.logo2Glass ? 'blur(10px)' : 'none',
          border: data.logo2Glass ? '1px solid rgba(255,255,255,0.2)' : 'none',
          opacity: data.logo2Opacity
        }}
      >
        {data.logo2Url ? (
          <img src={data.logo2Url} className="w-full h-full object-contain p-1" />
        ) : data.logo2Type ? (
          <div className="w-full h-full p-2">
            {PRO_LOGOS.find(l => l.id === data.logo2Type)?.render(data.accentColor)}
          </div>
        ) : (
          <span className={`font-black text-2xl ${data.logo2Transparent ? 'text-indigo-600' : 'text-white'}`}>LOGO</span>
        )}
      </div>
    </div>
  );
};

const renderLeftSideText = () => {
  if (!data.leftSideText) return null;
  return (
    <div
      className="absolute left-6 top-1/2 -translate-y-1/2 z-30 origin-center rotate-90 pointer-events-none"
      style={{
        color: data.accentColor,
      }}
    >
      <span className="font-black tracking-[0.2em] text-xs uppercase opacity-80 whitespace-nowrap" style={{ fontFamily: 'IBM Plex Sans Arabic' }}>
        {data.leftSideText}
      </span>
    </div>
  );
};

return (
  <div
    id="printable-card"
    className="relative mx-auto overflow-hidden shadow-2xl flex flex-col bg-slate-50"
    style={{
      width: `${data.exportWidth}px`,
      height: `${data.exportHeight}px`,
      aspectRatio: `${data.exportWidth} / ${data.exportHeight}`, // Fallback for container
      borderRadius: `${data.borderRadius}px`,
      fontFamily: data.fontFamily,
      textAlign: data.textAlign,
      direction: 'rtl'
    }}
  >
    {/* Background Pattern Layer (Global) - REMOVED TO AVOID DUPLICATION */}
    {/* <div className="absolute inset-0 z-0 bg-slate-50" style={{ backgroundColor: data.backgroundColor }}>
        {data.backgroundMode !== 'image' && <PatternOverlay type={data.patternType} color={data.accentColor} opacity={data.patternOpacity} size={data.patternSize} />}
      </div> */}

    {/* Main Layout Switch */}
    {data.layoutStyle === 'classic' && renderClassic()}
    {data.layoutStyle === 'modern' && renderModern()}
    {data.layoutStyle === 'poster' && renderPoster()}
    {data.layoutStyle === 'magazine' && renderMagazine()}
    {data.layoutStyle === 'minimal' && renderMinimal()}

    {renderLogo2()}
    {renderLeftSideText()}
  </div>
);
};

export default CardPreview;
