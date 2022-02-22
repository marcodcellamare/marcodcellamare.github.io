import React from 'react';
import firebase from 'firebase/app';
import 'firebase/analytics';
import Config from '../assets/config.json';

class Firebase extends React.Component {
	constructor(props) {
		super(props);
		this.app = false;
		this.analytics = false;
		return this.Init();
	}
	Init() {
		this.app = firebase.initializeApp(Config.FIREBASE);
		this.analytics = firebase.analytics();
		return this;
	}
	LogEvent(event) {
		if (this.analytics)
			this.analytics.logEvent(event);
	}
}

export default Firebase;