[![Deploy to Heroku](https://github.com/webceyhan/vite-chat-app/actions/workflows/heroku.yml/badge.svg)](https://github.com/webceyhan/vite-chat-app/actions/workflows/heroku.yml)

<!-- Logo -->

<img src="./src/assets/logo.png" width="100px">
<!-- ![Logo](./src/assets/logo.png) -->

 <!-- Title -->

# Vite Chat Application using Vue + Websockets

<!-- Description -->

This is a simple chat application to demonstrate how to utilize websockets for full duplex communication.

It consists of a backend server and a frontend application.

Backend server was implemented using ExpressJs to serve the compiled frontend app as static content. And the WebSocket Server starts listening to the same port to respond socket messages.

Frontend application is built with Vite + Vue 3 + Bootstrap. Client is automatically connected to the server using standart WebSocket API the on initial request, then awaiting user to enter his name and joing the channel.

[View Demo](https://webceyhan-chat-app.herokuapp.com/) |
[Report Issue](https://github.com/webceyhan/vite-chat-app/issues) |
[Request Feature](https://github.com/webceyhan/vite-chat-app/pulls) |
[@webceyhan](https://twitter.com/webceyhan)

<br>
<!-- Built With -->

## Built With

-   [Node.js](https://nodejs.dev/)
-   [Vite](https://vitejs.dev/)
-   [Vue.js](https://vuejs.org/)
-   [Bootstrap](https://getbootstrap.com)
-   [Express](https://expressjs.com/)
-   [WebSocket (WS)](https://github.com/websockets/ws)

<br>
<!-- Prerequisites -->

## Prerequisites

You need to install the [Node.js](https://nodejs.dev/) and npm package manager first.

```sh
npm install npm@latest -g
```

> Recommended IDE settings:
> [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

<br>
<!-- Installation -->

## Installation

1. Clone the repository.
    ```sh
    git clone https://github.com/webceyhan/vite-chat-app.git
    ```
2. Get inside the cloned project folder.
    ```sh
    cd <project folder>
    ```
3. Install NPM packages.
    ```sh
    npm install
    ```

<br>
<!-- Usage Examples -->

## Usage

You can use following commands to do various task with the project.

```sh
npm start               # start backend server
npm run dev             # start watching backend & frontend concurrently
npm run dev:backend     # run nodemon to watch backend app
npm run dev:frontend    # run vite to watch frontend app
npm run build           # build for production
npm run preview         # preview built app
```

<br>
<!-- Develop -->

## Develop
You have to run both backend server and frontend development server concurrently to be able to develop application properly.
```sh
npm run dev
```

<br>
<!-- Build -->

## Build

You only need to build the frontend application.

```sh
npm run build
```

To preview, you have to run the backend server which will serve the app and provide socket connectivity in order to make it work properly.

```sh
npm preview
```

<br>
<!-- Deploy -->

## Deploy (Heroku)

There is a built-in Github Action which automatically deploys the project to Heroku on every push.
Follow the steps below and it will be deployed automatically on every push.

1. Create an [Heroku](https://www.heroku.com/home) account.

2. Install the heroku-cli as shown in the [guide](https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli).

3. Create a new Heroku app inside the project folder to bind it.
    ```sh
    heroku create
    ```

    > This will create a new application on Heroku server and bind it to your project by adding a remote `heroku` upstream to your git repository.

4. Setup the repository secrets on your github as shown below:
    ```yaml
    name: Deploy to Heroku
    on:
        push:
            branches:
                - master
    jobs:
        build:
            runs-on: ubuntu-latest
            steps:
                - uses: actions/checkout@v2
                - uses: akhileshns/heroku-deploy@v3.12.12
                with:
                    heroku_api_key: ${{secrets.HEROKU_API_KEY}}
                    heroku_app_name: ${{secrets.HEROKU_APP_NAME}}
                    heroku_email: ${{secrets.HEROKU_EMAIL}}
    ```

<br>
<!-- Roadmap -->

## Roadmap

-   [ ] Improve code organization
-   [ ] Improve state management
-   [ ] Support for environment vars

> See the [open issues](https://github.com/webceyhan/vite-chat-app/issues) for a full list of proposed features (and known issues).

<br>
<!-- Acknowledgments -->

## Acknowledgments

-   Project hosted on [Heroku](https://www.heroku.com/home)
-   Project deployed with [GitHub Actions](https://docs.github.com/en/actions)
    -   using [heroku-deploy](https://github.com/akhileshns/heroku-deploy@)
