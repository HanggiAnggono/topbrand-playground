import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./styles.css";
import { Playground, store } from "graphql-playground-react";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { uncrunch } from 'graphql-crunch';



const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
        <Playground
          endpoint={"https://kjjpup3by7.execute-api.ap-southeast-1.amazonaws.com/staging/graphql-introspect?crunch=2"}
          createApolloLink={session => {
            const httpLink = createHttpLink({
              uri: session.endpoint,
              headers: {
                ...session.headers,
              },
              fetch
            });

            const uncrunchLink = new ApolloLink((operation, forward) => {
              return forward(operation).map(response => {
                response.data = uncrunch(response.data);
                return response;
              });
            });

            return {
              link: uncrunchLink.concat(httpLink)
            };
          }}
        />
      </Provider>
   </React.StrictMode>,
  rootElement,
)
