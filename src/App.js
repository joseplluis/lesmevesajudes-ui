import React, { Component } from "react";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import IndexPage from "./indexPage/IndexPage";
import WizardPage from "./pages/Wizard";
import AdultsReducer from "./adults/AdultsReducer";
import ResultsReducer from "./results/ResultsReducer";
import RentReducer from "./rent/RentReducer";
import isDevelopment from "./shared/isDevelopment";
import "./styles/styles.css";
import "./select-css.css";
import CorporateHeader from "./components/Header/CorporateHeader";
import ReportBugPage from "./reportBug/ReportBugPage";
import InfoRAI from "./pages/InfoRAI";
import InfoRGC from "./pages/InfoRGC";
import InfoLloguer from "./pages/InfoLloguer";
import InfoMenjador from "./pages/InfoMenjador";
import InfoFonsInfancia from "./pages/InfoFonsInfancia";
import ScrollToTop from "./components/Common/ScrollToTop";
import { Reboot } from "material-ui";
import { reducer as reduxFormReducer } from "redux-form";
import HouseholdReducer from "./household/HouseholdReducer";

if (isDevelopment) {
	//module.hot.accept();
	console.log("Environment: " + process.env.NODE_ENV);
}

const reducersCombined = combineReducers({
	results: ResultsReducer,
	adults: AdultsReducer,
	household: HouseholdReducer,
	rent: RentReducer,
	form: reduxFormReducer // mounted under "form"
});

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const extensions =
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = isDevelopment
	? createStoreWithMiddleware(reducersCombined, extensions)
	: createStoreWithMiddleware(reducersCombined);

class App extends Component {
	render() {
		return (
			<div>
				<CorporateHeader />
				<p>Hola</p>
				<Reboot />
				<Provider store={store}>
					<BrowserRouter>
						<Switch>
							<ScrollToTop>
								<Route exact={true} path="/" component={IndexPage} />
								<Route path="/wizard" component={WizardPage} />
								<Route path="/reportBug" component={ReportBugPage} />
								<Route path="/ajuts/rai" component={InfoRAI} />
								<Route path="/ajuts/rgc" component={InfoRGC} />
								<Route path="/ajuts/lloguer" component={InfoLloguer} />
								<Route path="/ajuts/menjador" component={InfoMenjador} />
								<Route
									path="/ajuts/fons_infancia"
									component={InfoFonsInfancia}
								/>
							</ScrollToTop>
						</Switch>
					</BrowserRouter>
				</Provider>
			</div>
		);
	}
}

export default App;
