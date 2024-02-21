# Wordfinder App

This project was built over 3 years ago, as part of a front-end code challenge, but later on I decided
to expand it and rework the build system:

- [x] Refactor from `create-react-app` to [Vite](https://vitejs.dev/).
- [x] Setup tests with [Vitest](https://vitest.dev/).
- [x] Setup [nginx configuration](https://github.com/andrecastelo/wordfinder/blob/master/src/deploy/nginx/default.conf).
- [x] Setup [Dockerfile](https://github.com/andrecastelo/wordfinder/blob/master/Dockerfile).
- [ ] Migrate to Github pages.
- [ ] Add feature to be able to dynamically create new puzzles.

## Available Scripts

In the project directory, you can run:

### `pnpm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `pnpm run test`

Launches the test runner in the interactive watch mode.

### `pnpm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `pnpm run serve`

Serves the built app in the `build` folder.

## Deployment

The project is configured with a simple [Dockerfile](https://github.com/andrecastelo/wordfinder/blob/master/Dockerfile) and
[nginx configuration](https://github.com/andrecastelo/wordfinder/blob/master/src/deploy/nginx/default.conf). It
exposes port `8080`.

```
docker build . -t wordfinder
```

```
docker run -p 8080:8080 wordfinder
```

Should be able to access the production build at [http://localhost:8080](http://localhost:8080).
