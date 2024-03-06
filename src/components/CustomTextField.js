import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ label, errors, register, field, defaultValue }) => {
    const nestedField = field.split('.'); // Split the field path by '.'

    const getError = () => {
        let error = errors;
        for (let nested of nestedField) {
            if (error[nested]) {
                error = error[nested];
            } else {
                return null;
            }
        }
        return error.message;
    };

    return (
        <TextField
            label={label}
            variant="filled"
            sx={{         
              
                width: "25vw",
                marginBottom: "15px",
                "& input": {
                    backgroundColor: "white",                  
                    border: "1px solid",
                    color: "black",
                    height: "1.8vh",
                    direction:"rtl"
                },
                "& p": { color: "red" }
            }}
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{ style: { color: "black" } }}
            helperText={getError()}
            defaultValue={defaultValue}
            {...register(field)}
         
        />
    );
};

export default CustomTextField;
