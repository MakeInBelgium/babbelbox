FROM nginx:alpine

# build with this cmd: 
# docker build -t babbelbox --build-arg vcsref=$(git rev-parse --short HEAD) .
ARG vcsref=0
ENV vcsref=$vcsref

ARG DOMAIN=www.praatbox.be
ENV DOMAIN=$DOMAIN

COPY ./_site /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

RUN sed -i "s|{VERSION}|$vcsref|g" index.html
RUN sed -i "s|www.praatbox.be|$DOMAIN|g" index.html
RUN sed -i "s|{VERSION}|$vcsref|g" vragen.html
RUN sed -i "s|www.praatbox.be|$DOMAIN|g" vragen.html
