FROM nginx:alpine

# build with this cmd: 
# docker build -t babbelbox --build-arg vcsref=$(git rev-parse --short HEAD) .
ARG vcsref=0
ENV vcsref=$vcsref

COPY . /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

RUN sed -i "s|{VERSION}|$vcsref|g" index.html
