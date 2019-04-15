FROM tomcat:7.0.68
LABEL maintainer="Chovin Carlson<chovin@guam.net>"

RUN sed -i '/jessie-updates/d' /etc/apt/sources.list  # Now archived
RUN apt-get update && apt-get install -y python
RUN apt-get install -y make zip unzip

ENV install_dir /webportal-installer
RUN mkdir -p $install_dir
WORKDIR $install_dir

RUN mkdir -p ${CATALINA_HOME}/conf/Catalina/localhost

COPY get_latest_solr_vers.py .
ENV SOLR_VERSION 4.7.2
RUN wget http://archive.apache.org/dist/lucene/solr/${SOLR_VERSION}/solr-${SOLR_VERSION}.tgz

COPY . . 

RUN make 
RUN make docker-install

EXPOSE 8080/tcp
