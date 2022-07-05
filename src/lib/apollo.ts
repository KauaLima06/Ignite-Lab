import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api-us-west-2.graphcms.com/v2/cl4x9x0c20an301ta7wcffqr1/master',
    cache: new InMemoryCache(),
});