import {FC, useEffect, useRef, useState} from 'react';
import styles from './ChatHeader.module.scss';
import {AvatarComponent} from "../AvatarComponent/AvatarComponent.tsx";
import {NewMessageSVG} from "../../SvgComponents.tsx";
import {useNavigate} from "react-router-dom";
import {Input} from "../../Input/Input.tsx";
import cn from 'clsx'

interface IChatRoomHeaderProps {
}

export const ChatHeader: FC<IChatRoomHeaderProps> = () => {
  const refOut = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()
  const [isVisible, setVisible] = useState(false)
  const [number, setNumber] = useState('')
  const onClickHandler = () => {
    const room = number + '@c.us'

    if (isVisible && room.length === 16) {
      navigate(`/room/${room}`)
      setNumber('')
      setVisible(false)
    } else {
      setVisible(true)
    }
  }


  console.log(isVisible)

  const onClickOutsideHandler = (event: MouseEvent) => {
    if (
      refInput.current &&
      refOut.current &&
      !refInput.current.contains(event.target as Node) &&
      !refOut.current.contains(event.target as Node)
    ) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', onClickOutsideHandler);

    return () => {
      document.removeEventListener('click', onClickOutsideHandler);
    };
  }, []);


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <AvatarComponent/>
        <div className={styles.inputWrapper} >
          {isVisible && <Input onChangeSome={setNumber}
                               styles={styles}
                               ref={refInput}
          />
          }
        </div>

        <div className={styles.svg} onClick={onClickHandler} ref={refOut}>
          <NewMessageSVG styles={cn(
            isVisible ? number.length === 11
                ? styles.btnSuccess
                : styles.btnDisabled
              : styles.btnDefault)}/>
        </div>
      </div>
    </div>
  );
};