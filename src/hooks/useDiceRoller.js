import { useState, useCallback, useEffect } from 'react';
import { DICE_TYPES } from '../data/dice';

const initialCounts = () => Object.fromEntries(DICE_TYPES.map(d => [d.sides, 0]));

function rollOne(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

export function useDiceRoller() {
  const [counts, setCounts] = useState(initialCounts);
  const [modifier, setModifier] = useState(0);
  const [advMode, setAdvMode] = useState('normal');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const changeCount = useCallback((sides, delta) => {
    setCounts(prev => ({
      ...prev,
      [sides]: Math.max(0, Math.min(20, (prev[sides] ?? 0) + delta)),
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setCounts(initialCounts());
    setModifier(0);
    setAdvMode('normal');
  }, []);

  const roll = useCallback(() => {
    const totalDice = Object.values(counts).reduce((s, n) => s + n, 0);
    if (totalDice === 0) return false;

    const rolls = [];
    const formulaParts = [];

    DICE_TYPES.forEach(die => {
      const n = counts[die.sides];
      if (!n) return;

      if (die.sides === 20 && n === 1 && advMode !== 'normal') {
        const r1 = rollOne(20);
        const r2 = rollOne(20);
        const chosen = advMode === 'advantage' ? Math.max(r1, r2) : Math.min(r1, r2);
        const emoji = advMode === 'advantage' ? '✨' : '💀';
        rolls.push({ sides: 20, value: chosen, label: `${emoji}(${r1},${r2})→${chosen}` });
        formulaParts.push(`d20${emoji}`);
      } else {
        for (let i = 0; i < n; i++) {
          const v = rollOne(die.sides);
          rolls.push({ sides: die.sides, value: v });
        }
        formulaParts.push(`${n}d${die.sides}`);
      }
    });

    const diceSum = rolls.reduce((s, r) => s + r.value, 0);
    const total   = diceSum + modifier;
    const formula = formulaParts.join(' + ') + (modifier !== 0 ? ` ${modifier >= 0 ? '+' : ''}${modifier}` : '');

    const d20Rolls = rolls.filter(r => r.sides === 20);
    const nat20 = d20Rolls.length === 1 && d20Rolls[0].value === 20;
    const nat1  = d20Rolls.length === 1 && d20Rolls[0].value === 1;

    const newResult = { rolls, total, diceSum, formula, mod: modifier, nat20, nat1 };
    setResult(newResult);

    const now = new Date();
    const time = now.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setHistory(prev => [{ ...newResult, time }, ...prev].slice(0, 50));

    return true;
  }, [counts, modifier, advMode]);

  const applyPreset = useCallback((preset) => {
    const next = initialCounts();
    preset.dice.forEach(d => { next[d.sides] = d.count; });
    setCounts(next);
    setModifier(preset.mod);
    setAdvMode('normal');
  }, []);

  // Space bar shortcut
  useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        roll();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [roll]);

  return {
    counts, modifier, setModifier,
    advMode, setAdvMode,
    result, history,
    changeCount, clearSelection, roll, applyPreset,
    clearHistory: () => setHistory([]),
  };
}
