# Vakitler
Vakitler is an open-source web application that provides users with Muslim prayer times. It is a helpful tool for Muslims who want to keep track of their prayer schedules and ensure they never miss a prayer.

## Features
Vakitler has the following features:

- Prayer times for various cities around the world
- Option to display prayer times in 12-hour or 24-hour format
- Mobile-responsive design for easy use on smartphones and tablets
- Simple and easy-to-use interface

## Installation
To install and run Vakitler on your local machine, follow these steps:

Clone the repository:
```bash
git clone https://github.com/yourusername/vakitler.git
```

Install dependencies:
```bash
cd vakitler
yarn
```

Start the server on localhost
```bash
yarn dev
```

## Self-hosting

Vakitler has no platform-specific dependencies and runs anywhere Node does.

### Docker

```bash
docker compose up --build
```

The app is then on http://localhost:3000.

### Manual

`next.config.js` sets `output: "standalone"`, so a build emits a self-contained
server under `.next/standalone` that needs no `node_modules` install:

```bash
pnpm build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
node .next/standalone/server.js
```

### Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `API_URL` | yes | Prayer times API base URL (defaults to the public one in `.env`) |
| `API_PASS` | no | Sent as `x-parola` if the upstream API requires it |
| `GITHUB_ACCESS_TOKENS` | no | Raises the rate limit on the releases endpoint |

## Contributing
We welcome contributions to Vakitler! To contribute, please fork the repository and submit a pull request.

## License
Vakitler is licensed under the Apache License. See the LICENSE file for more information.

