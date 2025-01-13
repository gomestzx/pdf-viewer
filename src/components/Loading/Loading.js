import styles from './styles.module.css'

const Loading = ({ label }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className={styles.loader}></div>
      {label && <span className="mt-8 text-white font-semibold  font-raleway text-lg">{label}</span>}
    </div>
  );
};

export default Loading;
