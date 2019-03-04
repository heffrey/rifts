#!/bin/bash

cd /var/www/wh.itesi.de/rifts; npx http-server /var/www/wh.itesi.de/rifts -p 8080 -d false --cors 2>> /var/log/www/err >> /var/log/www/rifts;
exit 0;
