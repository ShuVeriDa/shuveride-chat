import {ChangeEvent, forwardRef, InputHTMLAttributes} from 'react';
import {FieldError} from "react-hook-form";

interface IInputProps {
  onChangeSome?: (str: string) => void
  error?: FieldError | undefined | any
  styles?: { readonly [key: string]: string }
  placeholder?: string
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & IInputProps>(
  (
    {
      onChangeSome,
      error, styles, placeholder, ...rest
    }, ref
  ) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChangeSome) {
        onChangeSome(e.currentTarget.value)
      }
    }

    return (
      <div className={styles?.input}>
        <input type={'text'}
               {...rest}
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
