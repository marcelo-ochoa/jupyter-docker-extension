#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
apt update && apt install -y ca-certificates-java openjdk-19-jdk
cd /tmp
wget https://github.com/SpencerPark/IJava/releases/download/v1.3.0/ijava-1.3.0.zip
mkdir ijava && cd ijava
unzip ../ijava-1.3.0.zip && rm -f ../ijava-1.3.0.zip
python3 install.py --sys-prefix
cd .. && rm -rf ijava
