import React, { useEffect, useState } from "react";
import data from "./FormBuilder.json";
import { motion } from "framer-motion";
import {
	Box,
	Button,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Checkbox,
	FormGroup,
	FormControlLabel,
	FormHelperText,
} from "@mui/material";
import "./styles.css";

const Form = () => {
	const [formFields, setFormFields] = useState([]);
	const [formData, setFormData] = useState({});

	useEffect(() => {
		setFormFields(data.questions);
	}, []);

	const handleChange = (event) => {
		const { name, value, type } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]:
				type === "checkbox"
					? (prevData[name] || []).includes(value)
						? prevData[name].filter((v) => v !== value)
						: [...(prevData[name] || []), value]
					: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Form Data Submitted:", formData);
	};

	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-100">
			{/* Banner Section */}
			<Box
				component="img"
				src={`${process.env.PUBLIC_URL}/banner.jpg`}
				alt="Banner Image"
				sx={{
					width: "1350px",
					height: "450px",
					objectFit: "cover",
					objectPosition: "top",
					display: "block",
				}}
			/>

			{/* Form Section */}
			<Box
				component="form"
				onSubmit={handleSubmit}
				className="form-container"
				sx={{
					maxWidth: 800,
					margin: "20px auto",
					padding: 5,
					position: "relative",
				}}
			>
				<motion.h1
					className="text-6xl font-bold text-blue-600 mb-6 text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					style={{ fontSize: "60px" }}
				>
					{data.formName}
				</motion.h1>
				<motion.p
					className="text-2xl text-gray-700 mb-4 text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					style={{ fontSize: "15px" }}
				>
					{data.formDes}
				</motion.p>

				{formFields.map((field, index) => (
					<motion.div
						key={field.id}
						className="mb-4 p-10"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.3 * index }}
					>
						<InputLabel
							htmlFor={field.id}
							sx={{ marginBottom: "4px" }}
							className="text-gray-800 font-bold"
						>
							{field.questionName || (
								<span
									style={{
										fontWeight: "700",
										color: "black",
									}}
								>
									Question
								</span>
							)}
						</InputLabel>
						<FormControl fullWidth margin="none">
							{field.questionType === "single" && (
								<Select
									name={field.id}
									required={field.required}
									value={formData[field.id] || ""}
									onChange={handleChange}
									id={field.id}
									className="bg-white border-blue-300 text-gray-800"
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
							{field.questionType === "multiple" && (
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
							{["text", "email", "phoneNum"].includes(field.questionType) && (
								<TextField
									type={field.questionType}
									name={field.id}
									id={field.id}
									placeholder={`Enter your ${field.questionName.toLowerCase()}`}
									required={field.required}
									value={formData[field.id] || ""}
									onChange={handleChange}
									margin="none"
									className="p-3 border rounded-lg focus:outline-none focus:ring-2 bg-white border-blue-300"
								/>
							)}
							{field.questionType === "Document" && (
								<TextField
									type="file"
									name={field.id}
									onChange={handleChange}
									margin="none"
								/>
							)}
							{field.required && (
								<FormHelperText className="text-red-500">
									This field is required.
								</FormHelperText>
							)}
						</FormControl>
					</motion.div>
				))}
				<motion.button
					type="submit"
					className="block mx-auto mt-6 p-4 rounded-full bg-black-600 text-black font-semibold hover:bg-blue-700"
					style={{
						backgroundColor: "purple",
						width: "50%",
						textAlign: "middle",
						display: "block",
						padding: "1rem", // Added padding
						margin: "1rem auto", // Center the button horizontally
					}}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Submit
				</motion.button>
			</Box>
		</div>
	);
};

export default Form;
