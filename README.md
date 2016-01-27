desec-static
=============

This repository contains the static files for the desec website.

Contribute
-----------

In order to contribute to this repository, extend code and tests 
as appropriate and use clean commits.

To setup your dev environment,

- install nodejs and node package manager, `sudo apt-get install git npm nodejs nodejs-legacy` 
- install ruby compass CSS framework, `sudo apt-get install ruby-compass` 
- install grunt, karma, bower globally, `sudo npm install -g grunt grunt-cli karma bower` 
- clone and cd to git repository
- `npm install`
- `bower install`

To locally serve the files, run `grunt serve`. To build the project
for staging and production, run `grunt build`.

Always make sure all tests are succesful before commiting! To run the 
tests, use `grunt test`

Build Docker Image
-------------------

Before building the docker image, make sure your build is clean by
deleting all temp data and building a new release:

    rm -r .tmp dist
    grunt build

To build the docker image serving the static files using nginx, use 
`docker build -t static .` (notice the trailing .).

To run the image on port 8080 of your local host, run 
`docker run -it -p 8080:80 static`. Change parameters as needed.
