// @ts-nocheck
import React from "react";
import logo from "./logo.svg";
import "./App.css";

import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import {graphqlMutation} from'aws-appsync-react';
import {buildSubscription} from 'aws-appsync';


const SubscribePeople = gql`
  subscription {
    onCreatePeople {
      firstName, country, role
    }
  }
`

const CreatePeople = gql`
  mutation($firstName: String!, $country: String!, $role: String!){
    createPeople(input: {
           firstName: $firstName,
           country: $country
           role: $role
        }){
          firstName 
          country
          role
        }
  }
`


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


  state = {people : ''};
  addPeople = () => {
    if(this.state.people === '') return
    const people = {
      firstName : this.state.people, country : "India", role: "Staff"
    }
    this.props.createPeople(people)
    // this.setState({people: ''})
  }


  componentDidMount () {
    this.props.subscribeToMore(
      buildSubscription(SubscribePeople, ListPeople)
    )
  }
	render() {
		return (
			<div>
        <input onChange={e => this.setState({people: e.target.value})}
        value={this.state.people} placeholder="add new member"/>
        <button onClick= {this.addPeople}>Add Member</button>
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

  graphqlMutation (CreatePeople, ListPeople, 'People'),
	graphql(ListPeople, {
		options: {
			fetchPolicy: "cache-and-network",
		},
		props: (props) => ({
      subscribeToMore : props.data.subscribeToMore,
			fmPple: props.data.listPeople ? props.data.listPeople.items : [],
		}),
	})
)(App);
