#!/bin/sh

# Inject env into config.js
cat <<EOF > /usr/share/nginx/html/config.js
window._env_ = {
  VITE_BASE_URL: "${VITE_BASE_URL}"
};
EOF

exec "$@"
