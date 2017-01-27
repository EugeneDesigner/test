import React from 'react';
import ReactDOM from 'react-dom';

import AppView from './AppView.jsx';
import ScheduleView from './components/ScheduleView';
import StudentView from './components/StudentView';

const contentRegionId = 'appContainer';
const contentContainer = document.getElementById(contentRegionId);

export default {
	scheduleRoute(name) {
		_renderPage(ScheduleView, {name});
	},

	studentRoute() {
		_renderPage(StudentView);
	},

};

function _renderPage(contentView, options = {}) {
	const content = React.createElement(contentView, options);
	const app = React.createElement(AppView, {content});
	ReactDOM.render(app, contentContainer);
}
