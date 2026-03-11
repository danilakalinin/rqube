export const DICE_TYPES = [
  { sides: 4,   label: 'd4',   symbol: '▲',  color: '#818cf8', glow: 'rgba(129,140,248,0.4)' },
  { sides: 6,   label: 'd6',   symbol: '⬡',  color: '#38bdf8', glow: 'rgba(56,189,248,0.4)'  },
  { sides: 8,   label: 'd8',   symbol: '◆',  color: '#34d399', glow: 'rgba(52,211,153,0.4)'  },
  { sides: 10,  label: 'd10',  symbol: '◈',  color: '#f472b6', glow: 'rgba(244,114,182,0.4)' },
  { sides: 12,  label: 'd12',  symbol: '⬠',  color: '#fb923c', glow: 'rgba(251,146,60,0.4)'  },
  { sides: 20,  label: 'd20',  symbol: '✦',  color: '#fbbf24', glow: 'rgba(251,191,36,0.4)'  },
  { sides: 100, label: 'd100', symbol: '%',  color: '#e879f9', glow: 'rgba(232,121,249,0.4)' },
];

export const PRESETS = [
  { label: 'Атака',       emoji: '⚔️',  dice: [{ sides: 20, count: 1 }], mod: 5  },
  { label: 'Урон меч',   emoji: '🗡️',  dice: [{ sides: 8,  count: 1 }, { sides: 4, count: 1 }], mod: 3 },
  { label: 'Шар огня',   emoji: '🔥',  dice: [{ sides: 6,  count: 8 }], mod: 0  },
  { label: 'Инициатива', emoji: '⚡',  dice: [{ sides: 20, count: 1 }], mod: 2  },
  { label: 'Проверка',   emoji: '🎯',  dice: [{ sides: 20, count: 1 }], mod: 0  },
  { label: 'Хиты (Lv1)', emoji: '❤️',  dice: [{ sides: 8,  count: 1 }], mod: 2  },
];
