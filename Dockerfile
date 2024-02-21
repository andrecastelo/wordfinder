FROM node:20-alpine3.17 AS builder
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY . .

RUN npm i -g pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# RUN npm rebuild esbuild
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm rebuild esbuild
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run build

FROM nginx:1.25.3-alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY deploy/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
