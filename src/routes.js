import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Listings from './pages/Listings';
import Detail from './pages/Detail';
import Settings from './pages/Settings';

export default () => {
	return (
		<Switch>
			<Route exact path='/' component={Listings} />
			<Route exact path='/settings' component={Settings} />
			<Route exact path='/:orderId' component={Detail} />
		</Switch>
	)
}