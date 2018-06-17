import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { setSettings } from '../actions/settings';
import TextFieldGroup from '../components/common/TextFieldGroup';
import PropTypes from 'prop-types';

class Settings extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		}
		this.onClick = this.onClick.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onClick(e){
		this.props.setSettings({[e.target.name]:e.target.checked});
	}
	onBlur(e){
		this.props.setSettings({[e.target.name]:e.target.value});
	}

	render(){
		const { settings } = this.props;
		return(
			<Grid>
				<Row>
					<Col md={6}>
						<h1>Settings</h1>
						<div className='checkbox'>
							<label>
								<input checked={settings.showOlderThanMonth} onChange={this.onClick} name='showOlderThanMonth' type='checkbox'/> Show Older Than A Month?
							</label>
						</div>
						<TextFieldGroup
							label='Current Address'
							name='currentAddress'
							onBlur={this.onBlur}
							defaultValue={settings.currentAddress}
						/>
					</Col>
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {
		settings: state.settings,
	};
}

Settings.propTypes = {
	setSettings: PropTypes.func.isRequired,
	settings: PropTypes.object.isRequired,
}

export default withRouter(connect(mapStateToProps, { setSettings })(Settings));