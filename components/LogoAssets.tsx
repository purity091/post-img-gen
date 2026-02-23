import React from 'react';

// iOS-style Squircle SVG Path
const squirclePath = "M 0,24 C 0,8.4 8.4,0 24,0 H 56 C 71.6,0 80,8.4 80,24 V 56 C 80,71.6 71.6,80 56,80 H 24 C 8.4,80 0,71.6 0,56 Z";

export const PRO_LOGOS = [
    {
        id: 'finance-pro',
        label: 'Finance Pro',
        category: 'Finance',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="finGrad" x1="0" y1="0" x2="80" y2="80">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                </defs>
                <path d={squirclePath} fill="url(#finGrad)" />
                <path d="M40 20V60M25 35L40 20L55 35" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="40" cy="55" r="4" fill="white" />
            </svg>
        )
    },
    {
        id: 'growth-chart',
        label: 'Growth',
        category: 'Finance',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="growthGrad" x1="0" y1="0" x2="80" y2="80">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                </defs>
                <path d={squirclePath} fill="url(#growthGrad)" />
                <path d="M20 55L32 43L44 55L60 25" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M60 25H48M60 25V37" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'wallet-x',
        label: 'Wallet X',
        category: 'Finance',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="wallGrad" x1="0" y1="0" x2="80" y2="80">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>
                </defs>
                <path d={squirclePath} fill="url(#wallGrad)" />
                <rect x="20" y="25" width="40" height="30" rx="4" stroke="white" strokeWidth="4" />
                <path d="M20 35H60" stroke="white" strokeWidth="2" opacity="0.5" />
                <circle cx="40" cy="40" r="3" fill="white" />
            </svg>
        )
    },
    {
        id: 'abstract-flow',
        label: 'Flow',
        category: 'Abstract',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="flowGrad" x1="0" y1="0" x2="80" y2="80">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                </defs>
                <path d={squirclePath} fill="url(#flowGrad)" />
                <path d="M20 40C20 40 30 20 40 40C50 60 60 40 60 40" stroke="white" strokeWidth="6" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'tech-core',
        label: 'Core',
        category: 'Tech',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="techGrad" x1="0" y1="0" x2="80" y2="80">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#4338ca" />
                    </linearGradient>
                </defs>
                <path d={squirclePath} fill="url(#techGrad)" />
                <circle cx="40" cy="40" r="12" stroke="white" strokeWidth="4" />
                <path d="M40 20V25M40 55V60M60 40H55M25 40H20" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'shield-secure',
        label: 'Secure',
        category: 'Tech',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="shieldGrad" x1="0" y1="0" x2="80" y2="80">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#be185d" />
                    </linearGradient>
                </defs>
                <path d={squirclePath} fill="url(#shieldGrad)" />
                <path d="M40 22L22 30V44C22 56 40 64 40 64C40 64 58 56 58 44V30L40 22Z" stroke="white" strokeWidth="4" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'eco-leaf',
        label: 'Eco',
        category: 'Nature',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="leafGrad" x1="0" y1="0" x2="80" y2="80">
                        <stop offset="0%" stopColor="#84cc16" />
                        <stop offset="100%" stopColor="#4d7c0f" />
                    </linearGradient>
                </defs>
                <path d={squirclePath} fill="url(#leafGrad)" />
                <path d="M40 60C40 60 30 50 30 35C30 20 50 20 50 20C50 20 50 40 35 40" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'crown-royal',
        label: 'Royal',
        category: 'Luxury',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="crownGrad" x1="0" y1="0" x2="80" y2="80">
                        <stop offset="0%" stopColor="#facc15" />
                        <stop offset="100%" stopColor="#a16207" />
                    </linearGradient>
                </defs>
                <path d={squirclePath} fill="url(#crownGrad)" />
                <path d="M25 50L25 35L35 45L40 30L45 45L55 35L55 50H25Z" stroke="white" strokeWidth="4" strokeLinejoin="round" fill="none" />
            </svg>
        )
    },
    {
        id: 'infinite-loop',
        label: 'Infinite',
        category: 'Abstract',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="infGrad" x1="0" y1="0" x2="80" y2="80">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#0369a1" />
                    </linearGradient>
                </defs>
                <path d={squirclePath} fill="url(#infGrad)" />
                <path d="M25 40C25 30 35 30 40 40C45 50 55 50 55 40C55 30 45 30 40 40C35 50 25 50 25 40Z" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </svg>
        )
    },
    // Minimal Shapes
    {
        id: 'shape-cube',
        label: 'Cube',
        category: 'Minimal',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="cubeGrad" x1="0" y1="0" x2="80" y2="80">
                        <stop offset="0%" stopColor="#111827" />
                        <stop offset="100%" stopColor="#000000" />
                    </linearGradient>
                </defs>
                <path d={squirclePath} fill="url(#cubeGrad)" />
                <path d="M40 25L55 32.5V47.5L40 55L25 47.5V32.5L40 25Z" stroke="white" strokeWidth="3" />
                <path d="M40 25V40M40 40L25 47.5M40 40L55 47.5" stroke="white" strokeWidth="3" />
            </svg>
        )
    },
    {
        id: 'star-sparkle',
        label: 'Sparkle',
        category: 'Minimal',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="80" y2="80">
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="100%" stopColor="#db2777" />
                    </linearGradient>
                </defs>
                <path d={squirclePath} fill="url(#sparkGrad)" />
                <path d="M40 20L45 35L60 40L45 45L40 60L35 45L20 40L35 35L40 20Z" fill="white" />
            </svg>
        )
    },
    {
        id: 'bolt-power',
        label: 'Power',
        category: 'Minimal',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="boltGrad" x1="0" y1="0" x2="80" y2="80">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                </defs>
                <path d={squirclePath} fill="url(#boltGrad)" />
                <path d="M45 20L30 45H42L35 65L55 35H41L45 20Z" fill="white" />
            </svg>
        )
    },
    // --- ECONOMIC EXPANSION (50 ICONS) ---
    // 1. Charts & Growth
    {
        id: 'ec-bar-growth', label: 'Bar Growth', category: 'Finance',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec1" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#15803d" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec1)" />
                <path d="M25 55V45M35 55V35M45 55V25M55 55V40" stroke="white" strokeWidth="5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'ec-line-up', label: 'Uptrend', category: 'Finance',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec2" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#1e3a8a" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec2)" />
                <path d="M20 50L35 40L45 50L60 30" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M60 30H50M60 30V40" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'ec-pie', label: 'Pie Chart', category: 'Analytics',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec3" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#eab308" /><stop offset="100%" stopColor="#a16207" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec3)" />
                <path d="M40 40L40 20A20 20 0 0 1 60 40H40Z" fill="white" />
                <circle cx="40" cy="40" r="18" stroke="white" strokeWidth="4" />
            </svg>
        )
    },
    {
        id: 'ec-scatter', label: 'Scatter', category: 'Analytics',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec4" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#5b21b6" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec4)" />
                <circle cx="30" cy="50" r="3" fill="white" />
                <circle cx="40" cy="40" r="3" fill="white" />
                <circle cx="50" cy="30" r="3" fill="white" />
                <circle cx="35" cy="35" r="3" fill="white" />
                <circle cx="55" cy="45" r="3" fill="white" />
            </svg>
        )
    },
    {
        id: 'ec-area', label: 'Area', category: 'Finance',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec5" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#ec4899" /><stop offset="100%" stopColor="#be185d" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec5)" />
                <path d="M20 50L35 35L45 45L60 25V55H20V50Z" fill="white" fillOpacity="0.5" stroke="white" strokeWidth="3" />
            </svg>
        )
    },

    // 2. Currency & Wealth
    {
        id: 'ec-coin', label: 'Coin', category: 'Currency',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec6" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#b45309" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec6)" />
                <circle cx="40" cy="40" r="15" stroke="white" strokeWidth="4" />
                <path d="M40 32V48M36 36H40M36 44H44" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'ec-dollar', label: 'Dollar', category: 'Currency',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec7" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#065f46" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec7)" />
                <path d="M40 25V55M35 30H40C42.7614 30 45 32.2386 45 35C45 37.7614 42.7614 40 40 40H40C37.2386 40 35 42.2386 35 45C35 47.7614 37.2386 50 40 50H45" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'ec-wallet', label: 'Wallet', category: 'Wealth',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec8" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#6b21a8" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec8)" />
                <path d="M25 30H55C57.7614 30 60 32.2386 60 35V50C60 52.7614 57.7614 55 55 55H25C22.2386 55 20 52.7614 20 50V35C20 32.2386 22.2386 30 25 30Z" stroke="white" strokeWidth="4" />
                <circle cx="50" cy="42" r="3" fill="white" />
            </svg>
        )
    },
    {
        id: 'ec-diamond', label: 'Diamond', category: 'Wealth',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec9" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#0e7490" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec9)" />
                <path d="M25 35L40 55L55 35L47.5 25H32.5L25 35Z" stroke="white" strokeWidth="4" strokeLinejoin="round" />
                <line x1="25" y1="35" x2="55" y2="35" stroke="white" strokeWidth="2" />
                <line x1="32.5" y1="25" x2="40" y2="55" stroke="white" strokeWidth="2" />
                <line x1="47.5" y1="25" x2="40" y2="55" stroke="white" strokeWidth="2" />
            </svg>
        )
    },
    {
        id: 'ec-gold-bar', label: 'Gold', category: 'Wealth',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec10" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#fcd34d" /><stop offset="100%" stopColor="#b45309" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec10)" />
                <path d="M25 45L35 30H60L50 45H25Z" stroke="white" strokeWidth="4" />
                <path d="M25 45V55H50V45" stroke="white" strokeWidth="4" />
            </svg>
        )
    },

    // 3. Trade & Exchange
    {
        id: 'ec-scale', label: 'Scale', category: 'Legal',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec11" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#64748b" /><stop offset="100%" stopColor="#334155" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec11)" />
                <path d="M40 25V55M25 35L20 45H30L25 35ZM55 35L50 45H60L55 35Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="25" y1="35" x2="55" y2="35" stroke="white" strokeWidth="3" />
            </svg>
        )
    },
    {
        id: 'ec-briefcase', label: 'Case', category: 'Business',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec12" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#4b5563" /><stop offset="100%" stopColor="#1f2937" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec12)" />
                <rect x="25" y="35" width="30" height="20" rx="2" stroke="white" strokeWidth="4" />
                <path d="M35 35V30C35 28 36 28 40 28C44 28 45 28 45 30V35" stroke="white" strokeWidth="4" />
            </svg>
        )
    },
    {
        id: 'ec-building', label: 'Bank', category: 'Institutions',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec13" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#0f172a" /><stop offset="100%" stopColor="#000000" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec13)" />
                <path d="M20 55H60M25 55V35M35 55V35M45 55V35M55 55V35M20 35H60L40 20L20 35Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'ec-handshake', label: 'Deal', category: 'Business',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec14" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#ea580c" /><stop offset="100%" stopColor="#9a3412" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec14)" />
                <path d="M25 45L35 35L45 45M55 35L45 45" stroke="white" strokeWidth="4" strokeLinecap="round" />
                <rect x="20" y="45" width="40" height="10" stroke="white" strokeWidth="1" opacity="0.3" />
            </svg>
        )
    },
    {
        id: 'ec-target', label: 'Goal', category: 'Strategy',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec15" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#ef4444" /><stop offset="100%" stopColor="#b91c1c" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec15)" />
                <circle cx="40" cy="40" r="15" stroke="white" strokeWidth="3" />
                <circle cx="40" cy="40" r="8" stroke="white" strokeWidth="3" />
                <circle cx="40" cy="40" r="2" fill="white" />
            </svg>
        )
    },

    // 4. Global & Networks
    {
        id: 'ec-globe', label: 'Global', category: 'Global',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec16" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#0ea5e9" /><stop offset="100%" stopColor="#0284c7" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec16)" />
                <circle cx="40" cy="40" r="18" stroke="white" strokeWidth="3" />
                <ellipse cx="40" cy="40" rx="18" ry="8" stroke="white" strokeWidth="2" />
                <path d="M40 22V58" stroke="white" strokeWidth="2" />
                <path d="M22 40H58" stroke="white" strokeWidth="2" />
            </svg>
        )
    },
    {
        id: 'ec-network', label: 'Network', category: 'Tech',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec17" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#4f46e5" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec17)" />
                <circle cx="40" cy="30" r="4" fill="white" />
                <circle cx="25" cy="50" r="4" fill="white" />
                <circle cx="55" cy="50" r="4" fill="white" />
                <line x1="40" y1="30" x2="25" y2="50" stroke="white" strokeWidth="2" />
                <line x1="40" y1="30" x2="55" y2="50" stroke="white" strokeWidth="2" />
                <line x1="25" y1="50" x2="55" y2="50" stroke="white" strokeWidth="2" />
            </svg>
        )
    },
    {
        id: 'ec-cloud-data', label: 'Cloud', category: 'Tech',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec18" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#7e22ce" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec18)" />
                <path d="M25 45C25 45 25 35 35 35C35 30 45 30 50 35C55 35 60 40 55 45H25Z" stroke="white" strokeWidth="4" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'ec-server', label: 'Server', category: 'Tech',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec19" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#334155" /><stop offset="100%" stopColor="#1e293b" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec19)" />
                <rect x="25" y="25" width="30" height="8" rx="2" stroke="white" strokeWidth="3" />
                <rect x="25" y="36" width="30" height="8" rx="2" stroke="white" strokeWidth="3" />
                <rect x="25" y="47" width="30" height="8" rx="2" stroke="white" strokeWidth="3" />
            </svg>
        )
    },
    {
        id: 'ec-lock', label: 'Lock', category: 'Security',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec20" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#f43f5e" /><stop offset="100%" stopColor="#e11d48" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec20)" />
                <rect x="30" y="38" width="20" height="15" rx="2" fill="white" />
                <path d="M34 38V32C34 26 46 26 46 32V38" stroke="white" strokeWidth="4" />
            </svg>
        )
    },

    // 5. Abstract & Misc
    {
        id: 'ec-bulb', label: 'Idea', category: 'Strategy',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec21" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#d97706" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec21)" />
                <path d="M40 25C47 25 50 35 45 40C45 45 40 45 40 45C40 45 35 45 35 40C30 35 33 25 40 25Z" stroke="white" strokeWidth="3" />
                <path d="M36 50H44" stroke="white" strokeWidth="3" />
            </svg>
        )
    },
    {
        id: 'ec-rocket', label: 'Launch', category: 'Growth',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec22" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#ef4444" /><stop offset="100%" stopColor="#991b1b" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec22)" />
                <path d="M40 25C40 25 30 40 30 50H50C50 40 40 25 40 25Z" fill="white" />
                <path d="M30 50L25 55M50 50L55 55" stroke="white" strokeWidth="3" />
            </svg>
        )
    },
    {
        id: 'ec-pulse-line', label: 'Pulse', category: 'Health',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec23" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#14b8a6" /><stop offset="100%" stopColor="#0f766e" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec23)" />
                <path d="M20 40H30L35 30L45 50L50 40H60" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'ec-key', label: 'Key', category: 'Security',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec24" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#64748b" /><stop offset="100%" stopColor="#475569" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec24)" />
                <circle cx="35" cy="35" r="8" stroke="white" strokeWidth="4" />
                <path d="M42 42L55 55M55 55V50M55 55H50" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'ec-flag', label: 'Flag', category: 'Milestone',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec25" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#eab308" /><stop offset="100%" stopColor="#ca8a04" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec25)" />
                <path d="M30 60V25L50 35L30 45" stroke="white" strokeWidth="4" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'ec-medal', label: 'Star', category: 'Award',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec26" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#b45309" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec26)" />
                <path d="M40 25L44 35H55L46 42L50 52L40 46L30 52L34 42L25 35H36L40 25Z" fill="white" />
            </svg>
        )
    },
    {
        id: 'ec-paper', label: 'Document', category: 'Office',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec27" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#94a3b8" /><stop offset="100%" stopColor="#64748b" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec27)" />
                <path d="M30 25H50L55 30V55H30V25Z" stroke="white" strokeWidth="3" />
                <path d="M35 35H45M35 45H50" stroke="white" strokeWidth="3" />
            </svg>
        )
    },
    {
        id: 'ec-clock', label: 'Time', category: 'Office',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec28" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#2563eb" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec28)" />
                <circle cx="40" cy="40" r="15" stroke="white" strokeWidth="3" />
                <path d="M40 30V40L45 45" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'ec-megaphone', label: 'Alert', category: 'Marketing',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec29" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#f43f5e" /><stop offset="100%" stopColor="#e11d48" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec29)" />
                <path d="M25 35V45L35 45L45 55V25L35 35H25Z" fill="white" />
                <path d="M50 30C55 35 55 45 50 50" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'ec-eye', label: 'Vision', category: 'Strategy',
        render: (color: string) => (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ec30" x1="0" y1="0" x2="80" y2="80"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#7c3aed" /></linearGradient></defs>
                <path d={squirclePath} fill="url(#ec30)" />
                <path d="M25 40C25 40 30 30 40 30C50 30 55 40 55 40C55 40 50 50 40 50C30 50 25 40 25 40Z" stroke="white" strokeWidth="3" fill="none" />
                <circle cx="40" cy="40" r="5" fill="white" />
            </svg>
        )
    }
];

export const PRO_INDICATOR_ICONS: Record<string, (color: string) => React.ReactNode> = {
    // --- 1. Macro & Sovereign ---
    'mkt-bull': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
    'mkt-bear': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>,
    'mkt-vol': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-10z" /></svg>,
    'mkt-stable': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    'macro-pivot': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    'macro-yield': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M2 20s1-8 7-8c5 0 8 3 8 3V2M7 12c0-5 5-7 5-7" /></svg>,
    'macro-cycles': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64L21 6" /><path d="M16 6h5v5" /></svg>,

    // --- 2. Institutional ---
    'inst-depth': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.6 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.6 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.6 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /></svg>,
    'inst-whale': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 20h.01M7 20h.01M17 20h.01M2 16c0-4.4 3.6-8 8-8s8 3.6 8 8M22 16h-4" /><path d="M12 8V4" /></svg>,
    'inst-flow': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.59-7A2 2 0 1 1 19 12H2" /></svg>,
    'inst-exit': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" /></svg>,
    'inst-entry': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M20 12h-9M12 17l-5-5 5-5" /></svg>,

    // --- 3. Sentiment & Logic ---
    'sent-fear': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><circle cx="12" cy="12" r="10" /><path d="M8 16s1.5-2 4-2 4 2 4 2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>,
    'sent-analyst': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    'sent-euphoria': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>,
    'sent-panic': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>,
    'sent-logic': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1 .34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 3.8-2.54Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-3.8-2.54Z" /></svg>,

    // --- 4. Technical ---
    'tech-rsi': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="m3 11 18-5v12L3 14v-3z" /></svg>,
    'tech-macd': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M3 12h18" /><path d="M12 3c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9z" /><path d="M3 12c3 0 5-4 9-4s6 4 9 4" /></svg>,
    'tech-ema': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M3 16h4l3-9 4 9 3-4h4" /></svg>,
    'tech-fib': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 15h18M3 9h18M9 3v18M15 3v18" /></svg>,
    'tech-ceiling': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M3 21h18M3 7h18" /><path d="M12 17V7" /><path d="m9 10 3-3 3 3" /></svg>,
    'tech-floor': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M3 3h18M3 17h18" /><path d="M12 3v10" /><path d="m9 10 3 4 3-4" /></svg>,

    // --- 5. Risk & Alpha ---
    'risk-beta': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M4 12V4h16v8" /><path d="M12 4v16" /><path d="M8 20h8" /></svg>,
    'risk-alpha': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M6 9l6 6 6-6" /></svg>,
    'risk-hedge': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 2s8 3 8 9v5l-8 3-8-3v-5c0-6 8-9 8-9z" /></svg>,
    'risk-vol': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
    'risk-shield': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,

    // --- 6. Islamic ---
    'isl-sharia': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    'isl-sukuk': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    'isl-ethics': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M11 3 8 9l3 12 3-12-3-6" /><path d="M2 9h20" /></svg>,
    'isl-waqf': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M3 21h18" /><path d="M9 21V9l3-4 3 4v12" /><path d="M7 21h4" /><path d="M13 21h4" /></svg>,

    // --- 7. Future ---
    'fut-vision': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M10 10 2 22M20 2 13 9" /><path d="m14 14 1 1-1 1-1-1 1-1Z" /><path d="M12 2A10 10 0 1 0 22 12" /></svg>,
    'fut-breakout': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.292 1.3-3C10 11 11 10 11 10c0 1.5-1.5 3-2.5 4.5Z" /></svg>,
    'fut-bluechip': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
    'fut-tech': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M4.5 16.5c-1.5 1.26-2 2.67-2 3.5 0 1 2 1 2 1s.17-2 1.5-3M16.5 4.5c1.26-1.5 2.67-2 3.5-2 1 0 1 2 1 2s-2 .17-3 1.5" /><path d="m8 8 9 9" /><path d="m15 8 1 .5 4.5-4.5-.5-1L15 8Z" /><path d="m8 15-.5 1-4.5 4.5 1 .5L8 15Z" /></svg>,

    // --- 8. Stats ---
    'stat-vol': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 20v-8m-4 8v-6m-4 6v-4m12 4v-10m4 10v-12" /></svg>,
    'stat-cap': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    'stat-float': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>,
    'stat-dry': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 22s-8-4.5-8-11.8c0-4.4 3.6-8 8-8s8 3.6 8 8c0 7.3-8 11.8-8 11.8Z" /></svg>,
    'stat-absorb': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,

    // --- 9. Strategies ---
    'strat-momentum': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>,
    'strat-rotation': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>,
    'strat-smart-cap': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></svg>,
    'strat-alpha-gen': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M7 12h10M12 7v10" /></svg>,
    'strat-resilience': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M7 11h10M7 15h10M7 19h10" /></svg>,

    // --- 10. Industry ---
    'sec-fin': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M7 11h10M7 15h10M12 7v10" /></svg>,
    'sec-energy': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-10z" /></svg>,
    'sec-infra': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M3 21h18M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1" /><path d="M19 21V11M5 21V11M4 7l8-5 8 5" /></svg>,
    'sec-digital': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
    'sec-logistics': (color) => <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="m7.5 4.21 4.5 2.6 4.5-2.6m-9 15.58V14.6L2.9 12.1v5.1m13.6 2.58V14.6l4.6-2.5V17.2M12 22.01V12.6l9.6-5.5v10m-9.6 5.5-9.6-5.5V7.1l9.6 5.5ZM12 12.6l9.6-5.5-9.6-5.5-9.6 5.5Z" /></svg>,
};
