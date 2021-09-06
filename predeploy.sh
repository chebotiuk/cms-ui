#!/bin/bash

shopt -s extglob
cd $1/www
rm -rfv !(.htaccess|public)
