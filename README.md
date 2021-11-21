# Milkdown x Miro

Integration of Milkdown for Miro Card

## How to start:

> ## Note:
>
> We use [`mkcert`](https://github.com/FiloSottile/mkcert) to generate
> locally-trusted development certificates. This is required to run `localhost`
> over HTTPS. When you run `npm start` for the first time, you are prompted to
> enter your password so `mkcert` can generate the certificate for you. The
> generated certificate is available in the `~/.vite-plugin-mkcert` folder.

- Run `yarn` or `npm install` to install dependencies.
- Run `yarn start` or `npm start` to start developing. You should have a URL
  that looks like this:

```
https://localhost:3000
```

- Paste this URL in the `App URL` box in your Miro app settings.
- Open a board and click the three dots (...) or the chevron (>>) on the left
  toolbar. You should see the Miro starter app.

## How to build the app:

Run `yarn run build` or `npm run build`. This generates a static output inside
`dist/`, which you can host on a static hosting service.

## Folder structure

```
.
├── src
│  ├── assets
│  │  ├── icon.svg <-- The app icon.
│  │  └── style.css
│  ├── app.js <-- The code for the app lives here.
│  └── index.js <-- The code for the entry point lives here.
├── app.html <-- The app itself. This is loaded inside the appContainer on the board.
└── index.html <-- The app entry point. This is what you add to the App URL box in the Miro app settings.
```

### About the app

This app is using [vite](https://vitejs.dev/). If you want to modify the
`vite.config.js` configuration, read the vite documentation.
