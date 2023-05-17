import {FC} from "react";

import styles from './SubmitButton.module.scss';

interface ISubmitButtonProps {
  title: string
}

export const SubmitButton: FC<ISubmitButtonProps> = ({title}) => {
  return (
    <>
      <button type={'submit'}
              className={styles.btn}
      >
        {title}
      </button>
    </>
  );
};