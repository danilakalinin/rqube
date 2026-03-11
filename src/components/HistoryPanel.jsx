import styles from './HistoryPanel.module.css';

export default function HistoryPanel({ history, onClear }) {
  if (history.length === 0) {
    return (
      <div className={styles.wrap}>
        <div className={styles.header}>
          <span className={styles.title}>История</span>
        </div>
        <div className={styles.empty}>Бросков пока нет</div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.title}>История</span>
        <button className={styles.clearBtn} onClick={onClear}>Очистить</button>
      </div>
      <div className={styles.list}>
        {history.map((h, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.time}>{h.time}</span>
            <span className={styles.formula}>{h.formula}</span>
            <span className={styles.total}>{h.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
