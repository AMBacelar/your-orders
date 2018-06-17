import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import TextFieldGroup from '../components/common/TextFieldGroup';
import SelectFieldGroup from '../components/common/SelectFieldGroup';
import { fetchOrders, onChangeFilters } from '../actions/search';
import PropTypes from 'prop-types';
import { split } from 'lodash';

class Listings extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		}
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.getOrders = this.getOrders.bind(this);
	}

	componentDidMount() {
		this.getOrders();
	}

	getOrders(){
		const { settings, filters } = this.props;
		const { page, sortBy, order, textQuery } = filters;
		this.props.fetchOrders(page,sortBy, order, textQuery, settings);
	}

	parseSortBy(string){
		const parts = split(string, '_');
		return { sortBy: parts[0], order: parts[1] }
	}

	onBlur(e){
		this.props.onChangeFilters({textQuery: e.target.value})
		.then(()=> {
			this.getOrders();
		})
	}

	onChange(e){
		if (e.target.name === 'sort'){
			this.props.onChangeFilters(this.parseSortBy(e.target.value))
			.then(()=> {
				this.getOrders();
			})
		}		
	}

	render(){

		const { orders, filters } = this.props;

		const sortOptions = [
			{id:'date_desc', name: 'Newest to Oldest'},
			{id:'date_asc', name: 'Oldest to Newest'},
			{id:'totalPrice_desc', name: 'Most Expensive to Cheapest'},
			{id:'totalPrice_asc', name: 'Cheapest to Most Expensive'},
		]

		const OrderItem = ({ item }) => {
			return (
				<Link to={`/${item.productCode}`}>
					<Row>
						<Col md={8}>
							<p>{item.productName}</p>
						</Col>
						<Col md={2} mdOffset={2}>
							<p>£{item.totalPrice.toFixed(2)}</p>
						</Col>
					</Row>
				</Link>
			)
		}		
		const orderList = orders.results.map((order, i) => <OrderItem key={i} item={order} />)

		return(
			<Grid>
				<h1>Your Orders</h1>
				<Row>
					<Col md={8}>
						<TextFieldGroup
							label='Search By Name / Code / Delivery Address:'
							name='textSearch'
							onBlur={this.onBlur}
							defaultValue={filters.textQuery}
						/>
					</Col>
					<Col md={2} mdOffset={1}>
						<SelectFieldGroup
							label='sort by'
							name='sort'
							options={sortOptions}
							onChange={this.onChange}
						/>
					</Col>
					<Col md={1}>
						<Link to='/settings'>
							settings
						</Link>
					</Col>
				</Row>
				<Row>
					{orderList}
				</Row>
				<hr/>
				<Row>
					Pagination
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {
		orders: state.orders,
		filters: state.filters,
		settings: state.settings,
	};
}

Listings.propTypes = {
	fetchOrders: PropTypes.func.isRequired,
	onChangeFilters: PropTypes.func.isRequired,
	orders: PropTypes.object.isRequired,
	filters: PropTypes.object.isRequired,
	settings: PropTypes.object.isRequired,
}

export default withRouter(connect(mapStateToProps, { fetchOrders, onChangeFilters })(Listings));