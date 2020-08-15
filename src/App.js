// @ts-nocheck
import React from "react";
import logo from "./logo.svg";
import "./App.css";

import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

const ListPeople = gql`
	query {
		listPeople {
			items {
				firstName
				country
				role
			}
		}
	}
`;

class App extends React.Component {
	render() {
		return (
			<div>
				<ul>
					{this.props.fmPple.map((item, i) => (
						<li>
							<h4 key={i}>{item.firstName}</h4>
							<p>{item.role}, {item.country}</p>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
export default compose(
	graphql(ListPeople, {
		options: {
			fetchPolicy: "cache-and-network",
		},
		props: (props) => ({
			abdulsData: props.data,
			fmPple: props.data.listPeople ? props.data.listPeople.items : [],
		}),
	})
)(App);
