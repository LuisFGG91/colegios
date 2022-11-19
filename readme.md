virtualenv env --python=python3
source ./env/bin/activate
pip install nodeenv
nodeenv --python-virtualenv
nodeenv --version
npm install
npm install -g @ionic/cli
export NODE_OPTIONS=--openssl-legacy-provider
ionic serve -l
./env/bin/ionic serve -l

Cap
npm install cordova-plugin-geolocation 
npm install @awesome-cordova-plugins/geolocation 
ionic cap sync

./env/bin/pip install nodeenv



To configure proxy settings via an environment variable, use one of the following:

export HTTP_PROXY="http://127.0.0.1:8000" 
export HTTPS_PROXY="http://127.0.0.1:8000"
export IONIC_HTTP_PROXY="http://127.0.0.1:8000"


ionic config set -g proxy null
export HTTP_PROXY="null" 
export HTTPS_PROXY="null"
export IONIC_HTTP_PROXY="null"