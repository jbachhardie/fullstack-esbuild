# fullstack-esbuild

Sample fullstack web application using Typescript + GraphQL

It consists of two parts:

1. A GraphQL backend with an entrypoint in `@backend/server`
2. A React frontend using `xstate` for state management, with an entrypoint in `@frontend/app`

It is designed to be deployed behind a load balancer that serves the static
files in `fronted/app/public` and also forwards requests to `/graphql` to the
backend server, which can be deployed using the included Docker image.

The main focus was architecting end-to-end type safety using GraphQL and code
generation, as well as ESBuild to make building much faster than it would be
with a classic Typescript + Babel setup.

## Developing

The application can be installed with `yarn install`, started with `yarn start`
and tested with `yarn test`.

The frontend is built for deployment with `yarn workspace @frontend/app build`

The backend is built for deployment using Docker with `docker build .`
