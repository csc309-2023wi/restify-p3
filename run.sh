#!/bin/bash

MPROCS_VERSION="0.6.4"
MPROCS_TARBALL="mprocs-$MPROCS_VERSION-linux64.tar.gz"

# download mprocs for linux64
wget -c "https://github.com/pvolok/mprocs/releases/download/v$MPROCS_VERSION/$MPROCS_TARBALL"
tar -xzvf "./$MPROCS_TARBALL"
rm -f "./$MPROCS_TARBALL"

# create mprocs configuration
cat << EOF > mprocs.yaml
procs:
  backend:
    shell: "cd backend/ && bash ./run.sh"
  frontend:
    shell: "cd frontend/ && bash ./run.sh"
EOF

./mprocs
