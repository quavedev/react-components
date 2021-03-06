import React, { useEffect, useMemo, useState } from 'react';
import { Field, useFormikContext } from 'formik';
import { Chip, CircularProgress, TextField } from '@material-ui/core';
import { Autocomplete } from 'formik-material-ui-lab';

export const QAutoComplete = ({
  options = [],
  getOptionValue,
  name,
  label,
  ...rest
}) => {
  const [dataOptions, setDataOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState();
  const { touched, errors, values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (typeof options !== 'function') {
      setDataOptions(options);
    }
  }, []);

  useEffect(() => {
    if (typeof options === 'function') {
      setLoading(true);
      if (inputValue) {
        options(inputValue)
          .then(data => setDataOptions(data))
          .finally(() => setLoading(false));
      } else {
        setDataOptions([]);
        setLoading(true);
      }
    }
  }, [inputValue]);

  const optionsByFieldName = useMemo(
    () =>
      (dataOptions || []).reduce(
        (acc, currentValue) => ({
          ...acc,
          [getOptionValue(currentValue).toString()]: currentValue,
        }),
        {}
      ),
    [dataOptions]
  );

  const value = values[name];
  let selectedValues = null;
  if (value) {
    const arrayValues = Array.isArray(value) ? value : [value];
    selectedValues = arrayValues.map(v => {
      let labelValue;
      if (typeof v === 'object') {
        labelValue = rest.getOptionLabel(v);
      } else {
        labelValue = rest.getOptionLabel(optionsByFieldName[v] || {});
      }
      return <Chip key={labelValue} label={labelValue} />;
    });
  }

  return (
    <Field
      name={name}
      {...rest}
      disableClearable
      options={dataOptions}
      variant="outlined"
      component={Autocomplete}
      value={value}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(e, v) => {
        let changeValue = v;
        if (getOptionValue && v) {
          changeValue = getOptionValue(v);
        }
        setFieldValue(name, changeValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          error={touched[name] && !!errors[name]}
          helperText={touched[name] && errors[name]}
          InputProps={{
            ...params.InputProps,
            startAdornment: selectedValues && <>{selectedValues}</>,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
