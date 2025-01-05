import 'dotenv/config';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import morgan from 'morgan';

const app = express();
const PORT = 8080;

// Definir el esquema (typeDefs) y los resolvers
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

app.use(morgan('dev'));

const server = new ApolloServer({
    typeDefs,
    resolvers
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT || PORT }, () => {
    console.log(`🚀🚀 Server ready at http://localhost:${PORT}${server.graphqlPath} 🚀🚀`);
  });
}

startServer();

