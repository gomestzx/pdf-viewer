import styles from "./styles.module.css";

const Loading = ({ label }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div className={styles.loader}></div>
      {label && (
        <span className="mt-6 text-black font-semibold  font-raleway text-lg w-[200px] text-center">
          {label}
        </span>
      )}
    </div>
  );
};

export default Loading;
