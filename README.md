# UOG Specify web portal

This repo isn't meant to be published as we unignored `/specify_exports/` to ease tracking, updating, and to facilitate jenkins builds  

cloned from [https://github.com/specify/webportal-installer](https://github.com/specify/webportal-installer)  

# Updating Specify data

1. navigate to the [specify_exports](https://github.com/OIT-UOG/specify-webportal-installer/tree/master/specify_exports) folder
2. click upload files
3. add the corresponding files (`fishvouchers.zip`, `coralvouchers.zip`)
4. add a comment below describing your changes, and click `suggest changes`
5. finish pull request process
6. wait for one of the repo admins to merge your request

# Installing

The webportal has been set up as a Docker container for ease of deployment. That being said, you will need to install Docker and Docker Compose for deploy this way.  

* ensure [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) and [Docker Compose](https://github.com/docker/compose/releases) are installed

There are development and production compose files, their differences are small but are listed below.

## DEVELOPMENT

* served only over port 80 (no ssl)
* `SP_HOST` env var defaults to `localhost`
* to run, simple run `docker-compose up -d` from the repo directory

## PRODUCTION

* served only over port 443 (ssl certs required)
* `SP_HOST` env var defaults to `specifyportal.uog.edu`
* `SP_CERTS_PATH` env var is **required** and should point to the directory on the host machine that contains the ssl certs to use
* to run, run `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d` from the repo directory 

You can add your environment variables to the begginning of your docker-compose commands if you'd prefer like so:

`SP_HOST=<HOST> SP_CERTS_PATH=<PATH> docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

## Non-Docker install

see the [old README](oldREADME.md).

# Putting on the Jenkins build network

1. create a user and ssh credentials for Jenkins
1. duplicate the build job in jenkins, add/change credentials, paths, branches, etc.
1. place that user in the tomcat7 group
1. give that user and/or group rw permissions on the repo dir
1. give that group rw permissions for `/var/lib/specify-solr`
1. give that group rw permissions for `/etc/tomcat7/Catalina/localhost/specify-solr.xml`
1. give jenkins permission to restart tomcat `<JENKINS_USER> ALL=NOPASSWD: /usr/sbin/service tomcat7 restart`
