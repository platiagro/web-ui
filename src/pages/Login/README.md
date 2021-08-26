# Login Page

PlatIAgro login is powered by [Dex OIDC](https://dexidp.io/) which is an OpenID Connect Identity (OIDC) with multiple authentication backends.

Dex has its own frontend, but supports using your own templates and passing arbitrary data to them to help customize your installation.

You can find the login template files at [/templates](/templates) and the CSS styles at [/themes](/themes).

The file [configs/config.docker.yaml](configs/config.docker.yaml) is only used **ONLY IN DEVELOPMENT** to run dex locally.

To test the dex auth templates run the following commands in a terminal tab:

```shell
# Build the dex docker image
docker build src/pages/Login -t dex-auth-local

# Create the docker container
docker run -it -p 5556:5556 dex-auth-local:latest
```

OR

```shell
# Build the dex docker image
yarn dex:build

# Create the docker container
yarn dex:run
```

And then access [http://localhost:5556/dex/auth](http://localhost:5556/dex/auth) in your favorite browser.
