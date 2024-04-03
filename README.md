# Dish It Up

Dish It Up is an app to easily import, organize and manage your recipes in one app. It's available for Android and iOS.

You can import recipes from pretty much any website. If the app won't import your recipe, don't hesitate to let me know by opening an issue.

## Features

1.  Import and manage recipes
2.  Create and manage your recipes
3.  Add recipes to your meal planner
4.  Create grocery lists from recipe or meal plan
5.  Log recipes, so you can keep track of when you made them and give a rating
6.  Follow along in a recipe with the cook mode

## Tech Stack

### TypeScript

Dish It Up used [TypeScript](https://www.typescriptlang.org/) for static checking and documentation.

### React Native and Expo

Dish It Up uses React Native to create apps for Android and iOS in one codebase.

### Supabase

For managing authentication and saving all the data like recipes, meal plans and grocery lists the app talks with [supabase](https://github.com/supabase/supabase).
This is an open-source variant of Firebase, built around Postgres.

### Expo Router

Dish It Up uses [Expo Router](https://docs.expo.dev/router/introduction/). This is a file-based routing approach. This allows the app to have native deep links without a lot of setup.

### NativeWind

For styling this app uses NativeWind. This is a React Native version of TailwindCSS. Check it out [here](https://www.nativewind.dev/)

## Running the project

If you want to run the project make sure you have all the necessary tools to run a React Native app. Checkout this page for more info: [React Native Setup](https://reactnative.dev/docs/environment-setup)

You also need a Supabase project, enable authentication on it and seed the database.
You can find the base schema for the database [here](supabase/schema.sql)

Next create a `.env` file in the root with the following:

```
EXPO_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
EXPO_PUBLIC_SUPABASE_KEY=YOUR_SUPABASE_PROJECT_KEY
```

Now you are ready to run the app, run the following commands:

1. `yarn` - install packages
2. `yarn generate` - generate types based on supabase tables
3. `yarn api:deploy` - deploy edge functions
4. `yarn ios` or `yarn android` - run app
