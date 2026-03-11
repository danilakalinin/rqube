import { useEffect, useState } from 'react';
import styles from './ResultDisplay.module.css';

export default function ResultDisplay({ result }) {
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (result) setAnimKey(k => k + 1);
  }, [result]);

  if (!result) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🎲</span>
          <p>Выбери кубики и брось!</p>
          <p className={styles.hint}>Пробел — быстрый бросок</p>
        </div>
      </div>
    );
  }

  const isNat20 = result.nat20;
  const isNat1  = result.nat1;

  return (
    <div
      className={`${styles.container} ${isNat20 ? styles.nat20 : ''} ${isNat1 ? styles.nat1 : ''}`}
    >
      {isNat20 && <div className={styles.particles}>{[...Array(12)].map((_, i) => <span key={i} className={styles.particle} />)}</div>}

      <div className={styles.formula}>{result.formula}</div>

      <div className={styles.chips}>
        {result.rolls.map((r, i) => (
          <span
            key={i}
            className={`${styles.chip} ${r.value === r.sides ? styles.chipMax : ''} ${r.value === 1 ? styles.chipMin : ''}`}
          >
            {r.label ?? `d${r.sides}: ${r.value}`}
          </span>
        ))}
      </div>

      <div key={animKey} className={styles.total}>
        {result.total}
      </div>

      {result.mod !== 0 && (
        <div className={styles.modLine}>
          сумма: {result.diceSum} {result.mod > 0 ? '+' : ''}{result.mod} мод.
        </div>
      )}

      {isNat20 && (
        <div className={styles.nat20msg}>✨ НАТУРАЛЬНАЯ 20! КРИТИЧЕСКИЙ УСПЕХ!</div>
      )}
      {isNat1 && (
        <div className={styles.nat1msg}>💀 НАТУРАЛЬНАЯ 1! КРИТИЧЕСКИЙ ПРОВАЛ!</div>
      )}
    </div>
  );
}
