FROM node:20-slim

RUN apt-get update && apt-get install -y ffmpeg imagemagick ghostscript && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ../../package.json ../../pnpm-lock.yaml ./
COPY ../../pnpm-workspace.yaml ./
COPY ../../apps ./apps

RUN corepack enable && pnpm install --filter worker --prod

CMD ["pnpm","--filter","worker","start"]
