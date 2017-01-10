desec-static
============

This repository contains the static files for the desec.io website.


Getting started
---------------

First, make sure to locate the ultima design template in the
`ultima/` directory.

To set up your dev environment, manually run the commands listed in 
`Dockerfile`. After that, you can use `grunt serve` to fire up a 
local web server serving the page.

If you don't want to install all the dependencies locally, you can 
instead build and run the Docker image à la:

    docker build -t static .
    docker run -it -p 8080:80 static


Contribute
----------

In order to contribute to this repository, extend code and tests 
as appropriate and use clean commits.

Always make sure all tests are succesful before commiting! To run the 
tests, use `grunt test`.
