import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SelectFieldGroup = ({ name, label, options, onChange, selected, disabled }) => {

	const selectOptions = options.map((option, i) => 
    <option key={i} value={option.id} order={option.order}>{option.name}</option>
	);

	return(
		<FormGroup>
			{label && <ControlLabel>{ label }</ControlLabel>}
			<FormControl componentClass="select" name={name} onChange={onChange} value={selected || undefined} disabled={disabled}>
				{selectOptions}
			</FormControl>
		</FormGroup>
	);
}

SelectFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	selected: PropTypes.string,
	disabled: PropTypes.bool,
}

export default SelectFieldGroup;