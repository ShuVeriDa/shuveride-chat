import {FC} from 'react';
import styles from './AvatarComponent.module.scss';
import {DefaultAvatarSVG} from "../../SvgComponents.tsx";

interface IAvatarComponentProps {
}

export const AvatarComponent: FC<IAvatarComponentProps> = () => {
  return (
    <div className={styles.avatar}>
      <DefaultAvatarSVG />
    </div>
  );
};