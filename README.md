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

see the [old README](oldREADME.md).

# Putting on the Jenkins build network

1. create a user and ssh credentials for Jenkins
1. duplicate the build job in jenkins, add/change credentials, paths, branches, etc.
1. place that user in the tomcat7 group
1. give that user and/or group rw permissions on the repo dir
1. give that group rw permissions for `/var/lib/specify-solr`
1. give that group rw permissions for `/etc/tomcat7/Catalina/localhost/specify-solr.xml`
1. give jenkins permission to restart tomcat `<JENKINS_USER> ALL=NOPASSWD: /usr/sbin/service tomcat7 restart`
