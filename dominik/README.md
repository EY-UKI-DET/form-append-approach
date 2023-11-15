# Welcome

## Global dependencies

This project uses [pnpm](https://pnpm.io/installation).

Feel free to use an alternative like `npm` or `yarn`.

## Running

Open `public/index.html` in a browser, the JS bundle is provided as part of the solution.

However, you can also build it from source

```bash
# Install dependencies, using pnpm here
pnpm i

# build and serve it
pnpm start
# or, in dev mode
pnpm dev
```

## Test

```bash
# unit tests
pnpm test:unit

# You can watch for changes like so
pnpm test:unit -- --watch

# e2e tests, including accessibility
pnpm test:e2e
```