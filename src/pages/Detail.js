import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSingleOrder } from '../actions/search';
import { Grid, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Detail extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		const { orderId } = this.props.match.params;
		this.props.fetchSingleOrder(orderId);
	}

	render(){
		const { order } = this.props;
		return(
			<Grid>
				<Row>
					<Col md={6}>
						<p>{JSON.stringify(order,null,2)}</p>
					</Col>
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {
		order: state.order,
	};
}

Detail.propTypes = {
	order: PropTypes.object.isRequired,
	fetchSingleOrder: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, { fetchSingleOrder })(Detail));