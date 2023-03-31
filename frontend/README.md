# Restify Frontend

## Code Organization

-   `public`: folder containing static assets that will be included in the build

    -   `favicon.ico`: the website icon
    -   `index.html`: the main HTML file for the application
    -   `logo192.png`: image used for mobile devices
    -   `logo512.png`: image used for progressive web apps
    -   `manifest.json`: metadata for the web app manifest
    -   `robots.txt`: file for search engine crawlers

-   `src`: folder containing source code for the React application

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

> See also: [Create React App Tutorial](README_React.md)
