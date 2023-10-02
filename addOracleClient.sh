#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
apt update && apt install -y libaio1
cd /tmp
if [ "$(arch)" == "aarch64" ] || [ "$(arch)" == "arm64" ]; then
  wget https://download.oracle.com/otn_software/linux/instantclient/instantclient-basic-linux-arm64.zip -O /tmp/instantclient-basic.zip
  unzip /tmp/instantclient-basic.zip -d /usr/lib/ && rm -f /tmp/instantclient-basic.zip
  echo "/usr/lib/instantclient_19_19" > /etc/ld.so.conf.d/oracle.conf
else
  wget https://download.oracle.com/otn_software/linux/instantclient/2111000/instantclient-basic-linux.x64-21.11.0.0.0dbru.zip -O /tmp/instantclient-basic.zip
  unzip /tmp/instantclient-basic.zip -d /usr/lib/ && rm -f /tmp/instantclient-basic.zip
  echo "/usr/lib/instantclient_21_11" > /etc/ld.so.conf.d/oracle.conf
fi;
ldconfig
echo "Install Client Basic added, please run pip install cx_Oracle on your JupyterLab notebook"
