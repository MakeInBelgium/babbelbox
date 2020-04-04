FROM nginx:alpine

# See docker-run.sh for instructions on how to build.
ARG vcsref=0
ENV vcsref=$vcsref

ARG DOMAIN=www.praatbox.be
ENV DOMAIN=$DOMAIN

COPY ./_site /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

RUN sed -i "s|{VERSION}|$vcsref|g" *.html pages/*/*.html
RUN sed -i "s|www.praatbox.be|$DOMAIN|g" *.html pages/*/*.html
