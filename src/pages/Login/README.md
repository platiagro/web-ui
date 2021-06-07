# Login Page

PlatIAgro login is powered by [Dex OIDC](https://dexidp.io/) which is an OpenID Connect Identity (OIDC) with multiple authentication backends.

Dex has its own frontend, but supports using your own templates and passing arbitrary data to them to help customize your installation.

You can find PlatIAgro templates at repo [platiagro/manifests](https://github.com/platiagro/manifests/tree/v0.2.0-kubeflow-v1.3-branch/platiagro-auth/web), path: `platiagro-auth/web/`.

To test your templates, update the contents of volumeMount `/web-platiagro` in pod `kubectl -n auth get pod -l app=dex`, then recreate the pod.

