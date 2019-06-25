ARG DOCKER_REGISTRY
FROM ${DOCKER_REGISTRY}nginx:stable

RUN apt-get update \
	&& apt-get install -y curl gnupg \
	&& curl -sL https://deb.nodesource.com/setup_6.x | bash - \
	&& apt-get update \
	&& apt-get install -y --no-install-recommends bzip2 git nodejs ruby-compass \
	&& apt-get clean && rm -rf /var/lib/apt/lists/* \
	&& npm install -g grunt grunt-cli karma bower

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install

COPY bower.json ./
COPY ultima ./ultima
RUN bower --allow-root install

COPY Gruntfile.js ./
COPY app ./app
RUN grunt build

COPY security-headers.conf /etc/nginx/conf.d/

RUN cp -a dist/. /usr/share/nginx/html && rm -rf /usr/src/app
