import {ChangeEvent, forwardRef, InputHTMLAttributes} from 'react';
import {FieldError} from "react-hook-form";

interface IInputProps {
  value?: string
  error?: FieldError | undefined | any
  styles?: { readonly [key: string]: string }
  onChangeSome?: (el: string) => void
  placeholder?: string
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & IInputProps>(
  (
    {error, styles,placeholder,onChangeSome,
    },ref
  ) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChangeSome) {
        onChangeSome(e.currentTarget.value)
      }
    }

    return (
      <div className={styles?.input}>
          <input type={'text'}
                 onChange={onChangeHandler}
                 placeholder={placeholder}
                 ref={ref}
          />
        {error && <div className={styles?.errorWrapper}>
          {error && error.type && <div className={styles?.error}>{error.message}</div>}
        </div>}


      </div>
    );
  })

Input.displayName = 'Input'