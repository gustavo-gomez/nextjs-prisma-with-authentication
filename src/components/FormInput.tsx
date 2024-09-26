import {Controller} from "react-hook-form";
import {Input, InputProps} from "@nextui-org/react";
import React from "react";

export type FormInputProps = Partial<InputProps> & {
  name: string;
  onChangeValue?: (value: string) => void;
};

const FormInput = ({name, label, placeholder, type}: FormInputProps) => {

  return (
    <Controller
      name={name}
      render={({
                 field: {value, ...fieldProps},
                 fieldState: {error, invalid},
               }) => (
        <Input
          {...fieldProps}
          value={value}
          label={label}
          placeholder={placeholder || ''}
          type={type || 'text'}
          isInvalid={invalid}
          errorMessage={error?.message}
        />
      )}
    />
  )
}

export default FormInput;