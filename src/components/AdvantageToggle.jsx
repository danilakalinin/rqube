import styles from './AdvantageToggle.module.css';

const OPTIONS = [
  { value: 'advantage',    label: '✨ Преимущество' },
  { value: 'normal',       label: '— Обычный'       },
  { value: 'disadvantage', label: '💀 Помеха'        },
];

export default function AdvantageToggle({ value, onChange }) {
  return (
    <div className={styles.group}>
      {OPTIONS.map(opt => (
        <button
          key={opt.value}
          className={`${styles.btn} ${value === opt.value ? styles[opt.value] : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
