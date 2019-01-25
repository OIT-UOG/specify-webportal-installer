#!/usr/bin/env bash

git pull
make clean && make && make install && invoke-rc.d tomcat7 restart
