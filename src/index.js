import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import Client from "aws-appsync";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { Rehydrated } from "aws-appsync-react";
import AppSync from "./AppSync";

const client = new Client({
	url: AppSync.graphqlEndpoint,
	region: AppSync.region,
	auth: {
		type: "API_KEY",
		apiKey: AppSync.apiKey,
	},
});

const WithProvider = () => (
	<ApolloProvider client={client}>
		<ApolloHooksProvider client={client}>
			<Rehydrated>
				<App />
			</Rehydrated>
		</ApolloHooksProvider>
	</ApolloProvider>
);
ReactDOM.render(<WithProvider />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
