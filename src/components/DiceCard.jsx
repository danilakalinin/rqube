import styles from './DiceCard.module.css';

export default function DiceCard({ die, count, onChange }) {
  const isActive = count > 0;

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      style={isActive ? { '--die-color': die.color, '--die-glow': die.glow } : {}}
      onClick={() => onChange(1)}
    >
      <div className={styles.symbol} style={{ color: isActive ? die.color : undefined }}>
        {die.symbol}
      </div>
      <div className={styles.label}>{die.label}</div>
      <div className={styles.counter} onClick={e => e.stopPropagation()}>
        <button
          className={styles.counterBtn}
          onClick={() => onChange(-1)}
          disabled={count === 0}
        >
          −
        </button>
        <span className={styles.counterVal}>{count}</span>
        <button
          className={styles.counterBtn}
          onClick={() => onChange(1)}
        >
          +
        </button>
      </div>
      {isActive && (
        <div className={styles.activeDot} />
      )}
    </div>
  );
}
