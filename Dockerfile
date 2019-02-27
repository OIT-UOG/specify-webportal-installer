FROM tomcat:7.0.68
LABEL maintainer="Chovin Carlson<chovin@guam.net>"

RUN apt-get update && apt-get install -y python
RUN apt-get install -y make

ENV install_dir /webportal-installer
RUN mkdir -p $install_dir
WORKDIR $install_dir
COPY get_latest_solr_vers.py .
ENV SOLR_VERSION 4.7.2
RUN wget http://archive.apache.org/dist/lucene/solr/${SOLR_VERSION}/solr-${SOLR_VERSION}.tgz

# I think this is just to install jar for make, so probably can just use some generic zipping utility instead
RUN apt-get install debian-keyring debian-archive-keyring
RUN echo "deb http://httpredir.debian.org/debian/ jessie-backports main" > /etc/apt/sources.list.d/debian-jessie-backports.list
RUN echo "Package: *" > /etc/apt/preferences.d/debian-jessie-backports
RUN echo "Pin: release o=Debian,a=jessie-backports" >> /etc/apt/preferences.d/debian-jessie-backports
RUN echo "Pin-Priority: -200" >> /etc/apt/preferences.d/debian-jessie-backports
RUN apt-get update && apt-get -t jessie-backports install -y openjdk-8-jdk-headless

RUN mkdir -p ${CATALINA_HOME}/conf/Catalina/localhost
COPY . . 

RUN make 
RUN make install

EXPOSE 8080/tcp
