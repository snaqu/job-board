import { InputGroup, Select as ChakraSelect } from "@chakra-ui/react";
import FormField from "components/FormField/FormField";
import { FormikProps, getIn } from "formik";
import React from "react";

type SelectProps<F> = {
  formik: FormikProps<F>;
  name: string;
  options: string[];
  label: string;
  withAllOption?: boolean;
  withEmptyOption?: boolean;
};

const Select = <F,>({
  name,
  formik,
  options,
  withAllOption = true,
  withEmptyOption = false,
  label,
}: SelectProps<F>) => {
  const { handleChange, values, errors, touched, handleBlur } = formik;
  const error = getIn(errors, name) && getIn(touched, name);

  return (
    <FormField label={label} formik={formik} name={name} error={error}>
      <InputGroup
        size="md"
        display="flex"
        flexDirection="column"
        mt="3px !important"
      >
        <ChakraSelect
          id={name}
          name={name}
          isInvalid={!!error}
          value={getIn(values, name)}
          onChange={handleChange}
          onBlur={handleBlur}
          errorBorderColor="crimson"
        >
          {withEmptyOption && <option value="">Select..</option>}
          {withAllOption && <option value="all">All</option>}
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </ChakraSelect>
      </InputGroup>
    </FormField>
  );
};

export default Select;
