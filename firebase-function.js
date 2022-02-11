const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const {ApolloServer, gql} = require("apollo-server-express");

var serviceAccount = require("./serviceAccountkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "databaseURL"
});

const typeDefs = gql`
  type Meal {
    id: String
    categoryIds: [String]
    title: String
    affordability: String
    complexity: String
    imageUrl: String 
    duration: Float
    ingredients: [String]
    steps: [String]
    isGlutenFree: Boolean
    isVegan: Boolean
    isVegetarian: Boolean
    isLactoseFree: Boolean
  }
  type Query {
    meals: [Meal]
    meal(id: String): Meal
    favoriteMeals: [Meal]
  }
  type Mutation {
    toggleFavorite(id: String): Boolean
  }
`;

const resolvers = {
  Query: {
    meals: () => 
      admin
        .database()
        .ref("meals")
        .once("value")
        .then(snap => snap.val())
        .then(val => val),
    meal: (_, {id}) => 
      admin
        .database()
        .ref(`meals`)
        .once("value")
        .then(snap => snap.val())
        .then(val => val.find(meal => meal.id === id)),
    favoriteMeals: () => 
      admin
        .database()
        .ref("favoriteMeals")
        .once("value")
        .then(snap => snap.val())
        .then(val => val && Object.keys(val).map(key => val[key])),
  },
  Mutation: {
    toggleFavorite: async (_, {id}) => {
      const existingMeal = await admin
        .database()
        .ref("favoriteMeals")
        .once("value")
        .then(snap => snap.val())
        .then(val => {
          return val && Object.keys(val).map(key => {
            return {...val[key], key};
          })
        })
        .then(val => val && val.find(meal => meal.id === id));
        console.log(existingMeal);
      if (!!existingMeal) {
        return !!admin
          .database()
          .ref(`favoriteMeals/${existingMeal.key}`)
          .remove();
      } else {
        const mealToAdd = await admin
          .database()
          .ref("meals")
          .once("value")
          .then(snap => snap.val())
          .then(val => {
            return val.find(meal => meal.id === id);
          });
        return !!admin
          .database()
          .ref("favoriteMeals")
          .push(mealToAdd);
      }
    },
  }
}

const app = express();
const server = new ApolloServer({typeDefs, resolvers, introspection: true});
const startServer = async () => {
  await server.start();
  server.applyMiddleware({app, path: "/", cors: true});
}
startServer();
exports.graphql = functions.https.onRequest(app);
