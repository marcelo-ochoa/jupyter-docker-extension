#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
apt update && apt install -y --no-install-recommends software-properties-common dirmngr gnupg
wget -qO- https://cloud.r-project.org/bin/linux/ubuntu/marutter_pubkey.asc | tee -a /etc/apt/trusted.gpg.d/cran_ubuntu_key.asc
add-apt-repository -y "deb https://cloud.r-project.org/bin/linux/ubuntu $(lsb_release -cs)-cran40/"
apt install -y r-base libxml2-dev libssl-dev libcurl4-openssl-dev libbz2-dev liblzma-dev libfontconfig1-dev libharfbuzz-dev libtiff-dev r-cran-tidyverse
R --no-save << EOF
install.packages("devtools")
devtools::install_github("IRkernel/IRkernel")
IRkernel::installspec()
EOF
