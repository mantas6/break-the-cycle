# break-the-cycle

TODO

## Project Setup

```sh
docker run -it --rm -v .:/var/www -w /var/www -p 5173:5173 node:20 npm install
```

### Compile and Hot-Reload for Development

```sh
docker run -it --rm -v .:/var/www -w /var/www -p 5173:5173 node:20 npm run dev
```

### Compile and Minify for Production

```sh
docker run -it --rm -v .:/var/www -w /var/www -p 5173:5173 node:20 npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
docker run -it --rm -v .:/var/www -w /var/www node:20 npm run lint
```
