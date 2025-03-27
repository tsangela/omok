import styles from './Spinner.module.scss';

export enum SpinnerSize {
  Small = 32,
  Medium = 64,
  Large = 128,
};

export function Spinner() {
  return <div className={styles.spinner} />;
}

