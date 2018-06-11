import React from 'react';
import NumberFormat from 'react-number-format';

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      decimalScale={2}
      thousandSeparator
    />
  );
};

export default NumberFormatCustom;
