#!/usr/bin/env bash

git pull
make clean && make && make install && sudo service tomcat7 restart
