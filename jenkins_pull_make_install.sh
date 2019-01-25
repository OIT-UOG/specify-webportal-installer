#!/usr/bin/env bash

git pull
make clean && make && make install && service tomcat7 restart
