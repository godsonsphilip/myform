import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles.css'; // Import your styles here

import React, { useEffect, useState } from 'react';
import data from './FormBuilder.json'; // Adjust the path as necessary
import {
    Box,
    Button,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormGroup,
    FormControlLabel,
    FormHelperText,
} from '@mui/material';

const Form = () => {
    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState({}); // To store form data

    useEffect(() => {
        // Load form fields from JSON data
        setFormFields(data.questions); // Correctly reference data.questions
    }, []);

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' 
                ? (prevData[name] || []).includes(value) 
                    ? prevData[name].filter((v) => v !== value) 
                    : [...(prevData[name] || []), value] 
                : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Handle form submission (e.g., send data to backend)
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="form-container" // Use the CSS class for styling
            sx={{
                maxWidth: 600,
                maxHeight: 1200,
                margin: '20px auto',
                padding: 3,
            }}
        >
            <Typography variant="h4" align="center" color="primary" gutterBottom>
                <span style={{ fontWeight: '900' ,color : "purple" }}>{data.formName} </span>
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
                {data.formDes}
            </Typography>

            {formFields.map((field, index) => (
                <div key={field.id} style={{ marginBottom: '8px' }}>
                    <InputLabel htmlFor={field.id} sx={{ marginBottom: '2px' }}>
                        {field.questionName || <span style={{ fontWeight: "700", color: "black" }}>Question</span>}
                    </InputLabel>
                    <FormControl fullWidth margin="none">
                        {field.questionType === 'single' && (
                            <Select
                                name={field.id}
                                required={field.required}
                                value={formData[field.id] || ''}
                                onChange={handleChange}
                                id={field.id}
                            >
                                <MenuItem value="">
                                    <em>Select an option</em>
                                </MenuItem>
                                {field.options.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}

                        {field.questionType === 'multiple' && (
                            <FormGroup>
                                {field.options.map((option, index) => (
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox
                                                name={field.id}
                                                value={option}
                                                checked={(formData[field.id] || []).includes(option)}
                                                onChange={handleChange}
                                            />
                                        }
                                        label={option}
                                    />
                                ))}
                            </FormGroup>
                        )}

                        {['text', 'email', 'phoneNum'].includes(field.questionType) && (
                            <TextField
                                type={field.questionType}
                                name={field.id}
                                id={field.id}
                                placeholder={`Enter your ${field.questionName.toLowerCase()}`}
                                required={field.required}
                                value={formData[field.id] || ''}
                                onChange={handleChange}
                                margin="none"
                            />
                        )}

                        {field.questionType === 'Document' && (
                            <TextField
                                type="file"
                                name={field.id}
                                onChange={handleChange}
                                margin="none"
                            />
                        )}

                        {field.required && <FormHelperText>This field is required.</FormHelperText>}
                    </FormControl>
                </div>
            ))}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
            >
                Submit
            </Button>
        </Box>
    );
};

export default Form;
