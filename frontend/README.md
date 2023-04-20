# Restify Frontend

## Code Organization

-   `public/`: folder containing static assets that will be included in the build

    -   `index.html`: This is the main HTML file that gets served to the client, and serves as the entry point for the React application.
    -   `manifest.json`: This is a web application manifest file that provides metadata about the application (such as its name, icons, and theme color) to the browser.
    -   `robots.txt`: This is a file used to give instructions to web robots (such as search engine crawlers) about which pages or files to crawl or avoid.

-   `src/`: folder containing source code for the React application

    -   `assets/`: static assets like images and icons used in the React application; referenced as `/src/assets/...` inside the React codebase

        -   `icons/`: This folder contains SVG icons used throughout the web application.
        -   `images/`: This folder contains various images (in PNG, WEBP, or ICO formats) used throughout the web application.

    -   `components/`: folder containing reusable components

        -   Each component is contained within its own folder and includes an `index.jsx` file that defines the component's behavior and a `*.css` file that styles the component.
        -   Developers can add more components to this folder by creating a new folder for the component and including an `index.jsx` file and a corresponding `*.css` file. These components can then be imported and used in the pages of the application.

    -   `pages/`: folder containing the main pages of the application

        -   Each page is contained within its own folder and includes an `index.jsx` file that defines the page's behavior and a `*.css` file that styles the page.
        -   Developers can add more pages to this folder by creating a new folder for the page and including an `index.jsx` file and a corresponding `*.css` file.

    -   `styles/`: folder containing shared CSS styles

        -   Developers can add more shared styles to this folder by creating new `*.css` files.
        -   Remember to import these CSS files where you want to use them, at the highest scope that makes sense (this is already done for `common.css`)

    -   `App.jsx`: main component for the application, including the client-side page router, global layout, and 404 page
    -   `index.js`: renders the React application onto `public/index.html`

-   `package.json`: contains metadata about the project and lists its dependencies
-   `package-lock.json`: automatically generated file containing exact versions of installed packages; should be included in git
-   `startup.sh`: script to configure the environment for Linux (specifically Ubuntu), so that the frontend can be run
-   `run.sh`: script to run the frontend application

## Local Development

### Setup

> When running on Linux, the following steps can simply be replaced by [`./startup.sh`](startup.sh) in the project root.

Ensure that [Node.js](https://nodejs.org/en) version `19.8.1` is installed, and the [`npm` package manager](https://docs.npmjs.com/cli/v9/configuring-npm/install) is installed.

I recommend using [the `n` node version manager](https://github.com/tj/n#installation) to manage local Node.js installations, but feel free to choose alternative methods of installation.

After Node.js and `npm` are installed, change into the `frontend/` folder, and run:

```bash
npm install
```

This will install the requisite node packages necessary for local development.

### Running

> When running on Linux, the following steps can simply be replaced by [`./run.sh`](run.sh) in the project root.

Simply execute the following command:

```bash
npm start
```

This should start a local development server and present the frontend at http://localhost:3000

### Playground for Loose Components

In the process of developing components, it may be beneficial to see what they look like on a page, without modifying a real page in the application.

For this purpose, a `/playground` route and a corresponding `<Playground />` component is created. Insert any components you are developing into `frontend/src/pages/Playground/index.jsx`, and see it live at http://localhost:3000/playground

This page should only be accessible by URL, and not linked anywhere within the main application.

### See also

[Create React App Tutorial](README_React.md)
