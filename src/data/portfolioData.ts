import { CaseStudy, UsabilityChallenge } from '../types/portfolio';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aura-pay',
    title: 'Aura Pay',
    subtitle: 'Re-architecting cross-border mobile checkout and social bill-splitting',
    category: 'Fintech & Payments',
    year: '2025',
    duration: '6 Months',
    client: 'Aura Financial Ltd.',
    role: 'Lead Product Designer',
    team: '4 Engineers, 1 Product Manager, 1 Compliance Lead',
    prototypeId: 'aura-pay',
    tags: ['Fintech', 'Mobile iOS/Android', 'Design System', 'Micro-Interactions'],
    impactMetrics: [
      { label: 'Cart Abandonment Drop', value: '-28%', context: 'Reduced drop-off across international payment funnels' },
      { label: 'Checkout Velocity', value: '4.2s', context: 'Average time-to-completion decreased from 9.8s to 4.2s' },
      { label: 'Customer NPS', value: '+68', context: 'Up from +31 prior to redesign across 12,000 surveyed users' },
      { label: 'Split-Bill Adoption', value: '3.4x', context: 'Increase in peer-to-peer bill settlement within 24 hours' }
    ],
    heroSummary: 'Cross-border digital payments often induce cognitive anxiety around fluctuating currency exchange rates, hidden intermediary fees, and socially awkward bill splitting. Aura Pay re-imagined checkout with dynamic tactile sliders, locked real-time exchange rates, and instant biometric authorization.',
    problem: {
      context: 'Users shopping internationally or traveling in groups abandoned 38% of checkout flows due to opaque fees disclosed only at final review, complex currency calculations, and a high-friction 7-step bill splitting modal.',
      painPoints: [
        'Hidden FX conversion rates revealed only at final authorization step created buyer remorse and friction.',
        'Group payment requests required manual calculation outside the app, leading to unpaid group debts.',
        'High cognitive load on multi-card wallets with confusing card selection visual states.'
      ],
      userQuote: {
        text: 'I constantly took screenshots to calculate exchange rates in another app. I was always terrified of hitting confirm and seeing unexpected conversion fees.',
        author: 'Elena Rostova',
        role: 'Remote Traveler & Frequent Aura User'
      }
    },
    research: {
      methodology: 'Mixed-method research combining 24 moderated usability sessions across 6 countries, Hotjar funnel telemetry analysis, and card sorting.',
      participants: '24 international power shoppers and group travelers aged 22–45',
      findings: [
        {
          title: 'Guaranteed Rate Transparency Calms Anxiety',
          description: 'Displaying a 10-minute locked exchange rate ticker right next to the payment total reduced abandonment by 41% in usability test prototypes.'
        },
        {
          title: 'Tactile Gestures Outperform Number Keypads for Splitting',
          description: 'A physical drag-slider for adjusting percentage shares of a restaurant bill was completed 3x faster than typing numeric decimals.'
        },
        {
          title: 'Haptic & Audio Confirmation Builds Transfer Trust',
          description: 'Subtle spring-loaded card haptics and a discreet audio frequency confirmation gave users immediate confidence that funds departed securely.'
        }
      ]
    },
    solution: {
      summary: 'Engineered an ultra-fluid 2-gesture checkout engine featuring interactive bill split sliders, auto-switching multi-currency wallets, and instant biometric passkey sign-off.',
      corePillars: [
        {
          title: 'Single-Gesture Tactile Split Slider',
          description: 'A smooth draggable multi-handle slider distributing cost across attendees dynamically with real-time tip presets.'
        },
        {
          title: 'Locked FX Ticker with Zero Hidden Spread',
          description: 'A real-time transparent rate lock with a count-down ring guaranteeing no fee surprises at final settlement.'
        },
        {
          title: 'Spring-Loaded 3D Card Switcher',
          description: 'Tactile card carousel with natural inertial physics and clear reward/points balance indicators.'
        }
      ]
    },
    designSystem: {
      typography: [
        { name: 'Plus Jakarta Sans', role: 'Display Numbers & Headlines', sample: '$142.50' },
        { name: 'DM Sans', role: 'Form Labels & Body Prose', sample: 'Split evenly with 3 friends' },
        { name: 'JetBrains Mono', role: 'Tabular FX Tickers & Time Stamps', sample: '1.00 USD = 0.92 EUR' }
      ],
      colors: [
        { name: 'Aura Cobalt', hex: '#2563EB', role: 'Primary Action & Accent' },
        { name: 'Emerald Settlement', hex: '#10B981', role: 'Positive State & Success' },
        { name: 'Obsidian Neutral', hex: '#0F172A', role: 'Primary Text & Contrast' },
        { name: 'Slate Canvas', hex: '#F8FAFC', role: 'Surface Background' }
      ],
      spacingScale: ['4px', '8px', '12px', '16px', '24px', '32px', '48px']
    }
  },
  {
    id: 'pulse-health',
    title: 'PulseHealth',
    subtitle: 'Circadian biometric telemetry & chronic condition adherence companion',
    category: 'Digital Health & MedTech',
    year: '2024–2025',
    duration: '8 Months',
    client: 'Pulse Therapeutics',
    role: 'Lead Interaction & Systems Designer',
    team: '3 Mobile Engineers, 2 Clinical Advisors, 1 Data Scientist',
    prototypeId: 'pulse-health',
    tags: ['MedTech', 'Accessibility WCAG AAA', 'Data Viz', 'Mobile App'],
    impactMetrics: [
      { label: 'Daily Adherence Rate', value: '84%', context: 'Up from 41% baseline in chronic diabetic patient cohort' },
      { label: 'Emergency Clinical Visits', value: '-19%', context: 'Reduction in acute glycemic spikes over 6-month clinical trial' },
      { label: 'App Store Rating', value: '4.9 ★', context: 'From over 45,000 verified patient reviews' },
      { label: 'Logging Completion Time', value: '1.8s', context: 'One-tap biometric sync vs 14s manual numerical entry' }
    ],
    heroSummary: 'Managing chronic metabolic and cardiovascular conditions traditionally burdens patients with dense spreadsheets, complex graphs, and anxiety-inducing medical jargon. PulseHealth transformed continuous telemetry into a gentle, intuitive circadian day wheel that honors human rhythm and accessibility.',
    problem: {
      context: 'Patients with Type 2 diabetes and hypertension reported severe cognitive fatigue from logging glucose, blood pressure, and medications across 3 separate peripheral devices and a convoluted manual app.',
      painPoints: [
        'Numerical data tables triggered health anxiety without providing actionable contextual advice.',
        'High rate of missed insulin and statin doses due to rigid alert timers that conflicted with shift work.',
        'Interface failed WCAG AA contrast standards in bright outdoor sunlight for elderly patients with macular degeneration.'
      ],
      userQuote: {
        text: 'Other medical apps felt like opening an intimidating hospital chart. I just wanted to know if I was safe right now and what I needed to do before lunch.',
        author: 'Robert M.',
        role: 'Participant, Clinical Trial Cohort B'
      }
    },
    research: {
      methodology: 'Shadowed 14 patients during their daily morning and evening routines, conducted diary studies across 30 days, and performed rigorous contrast/ergonomic testing with low-vision subjects.',
      participants: '18 chronic patients aged 28–74 with varied digital literacy',
      findings: [
        {
          title: 'Color Blind & Low-Vision Resilient Shapes',
          description: 'Relying on color alone to indicate glucose severity led to dangerous misunderstandings. Pairing color with directional arrow icons and distinct haptic patterns eliminated logging confusion.'
        },
        {
          title: 'Circadian Time Anchor vs Linear Lists',
          description: 'Arranging vitals on a circular 24-hour sun cycle made medication timing intuitive regardless of irregular sleep schedules.'
        },
        {
          title: 'One-Tap Micro-Dose Confirmation',
          description: 'A tactile press-and-hold dial prevented accidental logging while maintaining a sub-2-second interaction budget.'
        }
      ]
    },
    solution: {
      summary: 'Designed an ambient circadian wheel visualizing daily bio-rhythms with zero clinical clutter, single-swipe logging, and WCAG AAA compliant optical contrast.',
      corePillars: [
        {
          title: 'Circadian Day Wheel',
          description: 'An interactive 24-hour circular dial mapping glucose curves, medication windows, and meal markers seamlessly.'
        },
        {
          title: 'Micro-Dose Press & Hold Dial',
          description: 'Prevented accidental clinical entries with an organic haptic fill ring that provides affirmative sensory feedback.'
        },
        {
          title: 'Adaptive High-Contrast Visual Mode',
          description: 'Dynamically increases weight, line stroke, and contrast ratios when ambient light sensors detect bright outdoor glare.'
        }
      ]
    },
    designSystem: {
      typography: [
        { name: 'Plus Jakarta Sans', role: 'Vitals Indicators & Headers', sample: '108 mg/dL' },
        { name: 'DM Sans', role: 'Clinical Guidance & Prompts', sample: 'Target in-range for 6 hours' },
        { name: 'JetBrains Mono', role: 'Continuous Glucose Sensor Timestamp', sample: '09:41:00 AM' }
      ],
      colors: [
        { name: 'Calm Sage', hex: '#059669', role: 'Stable In-Range Metric' },
        { name: 'Amber Attention', hex: '#D97706', role: 'Pending Medication Reminder' },
        { name: 'Deep Indigo', hex: '#1E1B4B', role: 'High-Contrast Text Anchor' },
        { name: 'Pure Canvas', hex: '#FFFFFF', role: 'Clinical Clarity Background' }
      ],
      spacingScale: ['4px', '8px', '16px', '24px', '32px', '48px', '64px']
    }
  },
  {
    id: 'nova-workspace',
    title: 'Nova Workspace',
    subtitle: 'Spatial AI canvas & non-linear thought architecture for product teams',
    category: 'Productivity & Enterprise SaaS',
    year: '2024',
    duration: '7 Months',
    client: 'Nova Systems Inc.',
    role: 'Founding Product Designer & Design Architect',
    team: '5 Full-stack Engineers, 1 AI Researcher, 1 Founder',
    prototypeId: 'nova-workspace',
    tags: ['Spatial Canvas', 'Enterprise SaaS', 'Design System', 'AI Interaction'],
    impactMetrics: [
      { label: 'Weekly Active Time', value: '+142%', context: 'Engineers & designers spent 18+ hrs/week collaborating in-canvas' },
      { label: 'Context Switching Drop', value: '-64%', context: 'Reduced browser tabs and modal context jumping' },
      { label: 'Product Hunt Launch', value: '#1', context: 'Product of the Day with 2,400+ upvotes & 18k signups' },
      { label: 'Command Latency', value: '<50ms', context: 'Sub-frame response time on keyboard command execution' }
    ],
    heroSummary: 'Modern knowledge work is fractured across endless linear chat threads, isolated documents, and separate diagramming tools. Nova synthesizes documents, generative AI threads, and system architecture diagrams into a fluid infinite canvas with an ultra-responsive keyboard-first command system.',
    problem: {
      context: 'Product managers and engineers were constantly copying text between AI chat prompts, Jira tickets, and Figma canvases, losing context and spatial memory of their decision trees.',
      painPoints: [
        'Linear chat interfaces bury critical conclusions and architectural decisions under endless message scrolls.',
        'Canvas tools felt too heavy for quick notes, while markdown editors lacked spatial relationships.',
        'High interaction friction when connecting AI generation outputs to production wireframes.'
      ],
      userQuote: {
        text: 'I had 40 tabs open trying to synthesize our roadmap. I wanted a canvas that felt as fast as Sublime Text but as visual as a white wall with index cards.',
        author: 'Arjun Kapoor',
        role: 'VP of Product, ScaleUp Tech'
      }
    },
    research: {
      methodology: 'Conducted workflow audits with 32 engineering directors and product designers, measured keystroke-level models (KLM) for common document-linking workflows.',
      participants: '32 tech leads and creative directors across North America and Europe',
      findings: [
        {
          title: 'Spatial Clustering Outperforms Folder Hierarchies',
          description: 'Users located relevant research cards 4.5x faster when positioned spatially around a central wireframe rather than nested inside folder structures.'
        },
        {
          title: 'Command Palette is the Lifeline of Power Users',
          description: 'Keyboard navigation (`Cmd+K`) was adopted by 89% of power users within their first 3 days when accompanied by instant preview tooltips.'
        },
        {
          title: 'Magnetic Docking Minimizes Tidy Friction',
          description: 'Providing subtle magnetic snap-to-grid guidelines reduced visual chaos without requiring manual layout alignment commands.'
        }
      ]
    },
    solution: {
      summary: 'Created an infinite spatial canvas with magnetic card docking, a sub-50ms command engine, and an interactive token inspector for live UI prototypes.',
      corePillars: [
        {
          title: 'Infinite Node & Card Dock',
          description: 'Draggable thought cards with smart connection lines and markdown auto-formatting.'
        },
        {
          title: 'Universal Quick Command Palette',
          description: 'Sub-frame modal (`Cmd+K`) allowing instant search, AI node synthesis, and canvas navigation without mouse travel.'
        },
        {
          title: 'Live Component & Variant Inspector',
          description: 'Inspect live UI code tokens, layout frames, and responsive breakpoints directly within canvas nodes.'
        }
      ]
    },
    designSystem: {
      typography: [
        { name: 'Plus Jakarta Sans', role: 'Canvas UI & Node Titles', sample: 'Architecture Node #04' },
        { name: 'DM Sans', role: 'Card Markdown Content', sample: 'Synthesized user interview insights' },
        { name: 'JetBrains Mono', role: 'Command Palette Keys & Code Blocks', sample: '⌘ + K to trigger' }
      ],
      colors: [
        { name: 'Electric Violet', hex: '#7C3AED', role: 'AI Spatial Synthesis Accent' },
        { name: 'Slate Grid', hex: '#64748B', role: 'Subtle Canvas Dot Markers' },
        { name: 'Card Surface Light', hex: '#FFFFFF', role: 'Node Card Elevated Surface' },
        { name: 'Dark Studio', hex: '#090D16', role: 'Deep Dark Canvas Background' }
      ],
      spacingScale: ['4px', '8px', '16px', '24px', '32px', '48px', '96px']
    }
  }
];

export const USABILITY_CHALLENGES: UsabilityChallenge[] = [
  {
    id: 'challenge-aura',
    prototypeId: 'aura-pay',
    title: 'Mission: Split Dinner Bill with Maya',
    goal: 'Adjust the split slider to 50/50, lock the EUR currency rate, and authorize payment using Biometrics.',
    steps: [
      'Drag the bill split slider to allocate equal shares',
      'Select Aura Debit Black card in the wallet carousel',
      'Click "Authorize & Settle via Biometrics"',
      'Verify the instant settlement confirmation receipt'
    ],
    successCondition: 'Payment settled and receipt verified'
  },
  {
    id: 'challenge-pulse',
    prototypeId: 'pulse-health',
    title: 'Mission: Log Morning Glucose & Confirm Medication',
    goal: 'Scrub the circadian timeline to 08:30 AM, log morning fasting glucose, and mark Morning Statin as taken.',
    steps: [
      'Scrub the Circadian Wheel slider to the 08:30 AM mark',
      'Click the "+ Log Vitals" quick trigger',
      'Select Fasting Glucose (104 mg/dL)',
      'Press and hold the medication check affordance'
    ],
    successCondition: 'Morning medication verified on the circadian dial'
  },
  {
    id: 'challenge-nova',
    prototypeId: 'nova-workspace',
    title: 'Mission: Run Command Palette & Inspect Tokens',
    goal: 'Open the Nova Command Palette, filter for Design Tokens, and toggle the interactive redline inspector.',
    steps: [
      'Click the "Quick Command (⌘K)" bar or press the shortcut button',
      'Type or select "Inspect Design Tokens"',
      'Toggle between Default and Active button states',
      'Verify the WCAG AAA accessibility contrast pass rate'
    ],
    successCondition: 'Command executed and token inspector activated'
  }
];

export const DESIGN_TOKENS = [
  {
    category: 'Color System',
    description: 'Disciplined 60-30-10 palette with mathematical contrast ratios guaranteeing WCAG AA/AAA compliance across light & dark themes.',
    tokens: [
      { name: 'color.neutral.canvas', value: '#FAFAFA / #09090B', usage: '60% Base application background field' },
      { name: 'color.surface.elevated', value: '#FFFFFF / #18181B', usage: '30% Interactive cards and sheet surfaces' },
      { name: 'color.border.subtle', value: 'rgba(0,0,0,0.08) / rgba(255,255,255,0.1)', usage: 'Hairline 1px structural framing' },
      { name: 'color.accent.primary', value: '#2563EB / #3B82F6', usage: '10% High-intent focal CTA buttons & active states' },
      { name: 'color.feedback.success', value: '#059669 / #10B981', usage: 'Positive financial settlement & clinical stability' },
      { name: 'color.feedback.warning', value: '#D97706 / #F59E0B', usage: 'Attention required without causing panic' }
    ]
  },
  {
    category: 'Typography Scale',
    description: 'Calculated typographic scale pairing Plus Jakarta Sans display with DM Sans body and JetBrains Mono tabular figures.',
    tokens: [
      { name: 'type.display.hero', value: 'clamp(2.25rem, 4vw, 3.75rem) · Bold 700', usage: 'Hero headlines with text-wrap: balance' },
      { name: 'type.title.section', value: '1.75rem (28px) · SemiBold 600', usage: 'Primary section titles and card headings' },
      { name: 'type.body.regular', value: '0.9375rem (15px) · Regular 400 · 1.6 line-height', usage: 'Case study prose and narrative descriptions' },
      { name: 'type.meta.subtle', value: '0.8125rem (13px) · Medium 500', usage: 'Unboxed metadata separated by typographic dots' },
      { name: 'type.mono.tabular', value: '0.75rem (12px) · Medium 500 · tabular-nums', usage: 'Timestamps, currency exchange tickers, code specs' }
    ]
  },
  {
    category: 'Spatial & Elevation Math',
    description: 'Rigorous 8pt spatial grid with nested radius formulas: r_inner = r_outer - padding.',
    tokens: [
      { name: 'space.inset.sm', value: '8px (0.5rem)', usage: 'Compact chip padding and icon spacing' },
      { name: 'space.inset.md', value: '16px (1rem)', usage: 'Standard card interior content padding' },
      { name: 'space.inset.lg', value: '24px (1.5rem)', usage: 'Modal container and hero container margins' },
      { name: 'space.gutter.section', value: '48px–96px', usage: 'Breathing room between primary portfolio sections' },
      { name: 'radius.outer.card', value: '16px (rounded-2xl)', usage: 'Container outer bounding radius' },
      { name: 'radius.inner.element', value: '8px (rounded-lg)', usage: 'Interior child element radius (16px - 8px pad)' }
    ]
  }
];
