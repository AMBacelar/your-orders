import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

const TextFieldGroup = ({ label, name, placeholder, value, onChange, onBlur, disabled, defaultValue }) => {
	return(
		<FormGroup>
			{label && <label>{ label }</label>}
			<FormControl 
				type="text"
				name={ name }
				value={ value }
				placeholder={ placeholder }
				onChange={ onChange }
				onBlur={ onBlur }
				disabled={disabled}
				defaultValue={defaultValue}
			/>
		</FormGroup>
	);
}

TextFieldGroup.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	defaultValue: PropTypes.string,
}

export default TextFieldGroup;