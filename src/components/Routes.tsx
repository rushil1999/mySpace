import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Router } from '@reach/router';
import Page1 from "../pages/Page1";
import Layout from "./Layout";
import Page2 from "../pages/Page2";
import Page3 from "../pages/Page3";
import BoxGrid from "../pages/BoxGrid";
import DropZone from "./Upload";
import SignIn from './SignIn';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';

function Routes() {
  const user = 'haw';
  return (
		<BrowserRouter>
			<Route
				render={props => (
					<>
						{user && 
							<div>
								<Layout {...props} />
								<Switch>
									<Route path="/" exact component={Page1} />
									<Route path="/page2" exact component={Page2} />
									<Route path="/page3" exact component={Page3} />
									<Route path="/upload" exact component={DropZone} />
									<Route path="/box-grid" exact component={BoxGrid} />
								</Switch>
							</div>
						}
						{!user && 
							<div>
								<Layout {...props} />
								<Router>
									<SignUp path="signUp" />
									<SignIn path="/" />
									<PasswordReset path="passwordReset" />
								</Router>
							</div>
						}
						
					</>
				)}
			/>
		</BrowserRouter>
  );
}

export default Routes;
