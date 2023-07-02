import { TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik } from 'formik';
function DateTimePickerFormik(props) {
    const { field, form, ...other } = props;
  
    // MUI DateTimePicker doesn't follow onChange(event, value) pattern.
    const onChange = (value) => {
      form.setFieldValue(field.name, value);
    };
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          renderInput={(props) => (
            <TextField {...props} error={Boolean(form.errors[field.name])} />
          )}
          error={Boolean(form.errors[field.name])}
          value={field.value}
          onChange={onChange}
          onBlur={() => form.setFieldTouched(field.name, true)}
          {...other}
        />
      </LocalizationProvider>
    );
  }

  export default DateTimePickerFormik;