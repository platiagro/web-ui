FROM ghcr.io/dexidp/dex:latest

ENV DEX_FRONTEND_DIR=/srv/dex/web

COPY --chown=root:root configs/config.docker.yaml /etc/dex/config.docker.yaml

COPY --chown=root:root templates /srv/dex/web/templates

COPY --chown=root:root themes /srv/dex/web/themes

