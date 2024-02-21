FROM node:20-alpine3.17 AS builder
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
COPY . .
RUN npm i -g pnpm
RUN pnpm install --frozen-lockfile \
 && pnpm rebuild esbuild \
 && pnpm run build \
 && rm -rf node_modules

FROM nginx:1.25.3-alpine AS final
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
