import { useRef } from 'react';
import { DICE_TYPES, PRESETS } from './data/dice';
import { useDiceRoller } from './hooks/useDiceRoller';
import DiceCard from './components/DiceCard';
import ResultDisplay from './components/ResultDisplay';
import HistoryPanel from './components/HistoryPanel';
import AdvantageToggle from './components/AdvantageToggle';
import styles from './App.module.css';

export default function App() {
  const {
    counts, modifier, setModifier,
    advMode, setAdvMode,
    result, history,
    changeCount, clearSelection, roll, applyPreset,
    clearHistory,
  } = useDiceRoller();

  const rollBtnRef = useRef(null);

  const handleRoll = () => {
    const ok = roll();
    if (!ok && rollBtnRef.current) {
      rollBtnRef.current.classList.add(styles.shake);
      setTimeout(() => rollBtnRef.current?.classList.remove(styles.shake), 400);
    }
  };

  return (
    <div className={styles.app}>
      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.titleIcon}>⚔️</span>
          D&amp;D Dice Roller
        </h1>
        <p className={styles.subtitle}>Симулятор кубиков для Dungeons &amp; Dragons</p>
      </header>

      <main className={styles.main}>
        {/* Left column */}
        <div className={styles.leftCol}>

          {/* Dice grid */}
          <section className={styles.section}>
            <div className={styles.sectionLabel}>Выбери кубики</div>
            <div className={styles.diceGrid}>
              {DICE_TYPES.map(die => (
                <DiceCard
                  key={die.sides}
                  die={die}
                  count={counts[die.sides]}
                  onChange={delta => changeCount(die.sides, delta)}
                />
              ))}
            </div>
          </section>

          {/* Advantage toggle */}
          <section className={styles.section}>
            <div className={styles.sectionLabel}>Преимущество / Помеха (d20)</div>
            <AdvantageToggle value={advMode} onChange={setAdvMode} />
          </section>

          {/* Modifier + buttons */}
          <section className={styles.section}>
            <div className={styles.controls}>
              <div className={styles.modGroup}>
                <label className={styles.modLabel}>Модификатор</label>
                <div className={styles.modInput}>
                  <button className={styles.modBtn} onClick={() => setModifier(m => m - 1)}>−</button>
                  <input
                    type="number"
                    value={modifier}
                    min="-99" max="99"
                    onChange={e => setModifier(parseInt(e.target.value) || 0)}
                    className={styles.modNum}
                  />
                  <button className={styles.modBtn} onClick={() => setModifier(m => m + 1)}>+</button>
                </div>
              </div>
              <button ref={rollBtnRef} className={styles.rollBtn} onClick={handleRoll}>
                🎲 Бросить!
              </button>
              <button className={styles.clearBtn} onClick={clearSelection}>
                Сброс
              </button>
            </div>
          </section>

          {/* Quick presets */}
          <section className={styles.section}>
            <div className={styles.sectionLabel}>Быстрые броски</div>
            <div className={styles.presets}>
              {PRESETS.map(p => (
                <button
                  key={p.label}
                  className={styles.presetBtn}
                  onClick={() => { applyPreset(p); setTimeout(roll, 0); }}
                >
                  {p.emoji} {p.label}
                </button>
              ))}
            </div>
          </section>

        </div>

        {/* Right column */}
        <div className={styles.rightCol}>
          <ResultDisplay result={result} />
          <HistoryPanel history={history} onClear={clearHistory} />
        </div>
      </main>
    </div>
  );
}
