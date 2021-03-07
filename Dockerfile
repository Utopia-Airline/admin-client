# usage  docker run --rm -it -p 80:80 --env API_HOST=utopiaalb-1438711635.us-east-1.elb.amazonaws.com adminportal
FROM node:14.15.2-alpine3.12 AS angular_builder
# change destination working directory to /user/src/app
WORKDIR /user/src/app
ADD package.json ./
RUN npm install
RUN npm install -g @angular/cli@10.2.1
COPY . .
RUN npm run build

FROM nginx:1.18.0-alpine-perl
RUN apk add --no-cache nginx-mod-http-perl
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=angular_builder /user/src/app/dist/admin-client /usr/share/nginx/html
# CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]
EXPOSE 80