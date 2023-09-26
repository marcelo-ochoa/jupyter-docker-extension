# Jupyter Notebook Docker Extension

Jupyter Notebook Scientific Python Stack extension for Docker Desktop

## Installation from Marketplace

Since Docker Desktop [v4.11.0](https://docs.docker.com/desktop/release-notes/#docker-desktop-4110) Jupyter Notebook Extension is available in Marketplace page, just click on **+ Add Extensions**, find Jupyter Notebook Extension, click Install and that's all; Jupyter Notebook icon its shown at left side menu.

## Manual Installation

If you are using Docker Desktop [v4.10.1](https://docs.docker.com/desktop/release-notes/#docker-desktop-4101) or less  you can install just by executing:

```bash
$ docker extension install mochoa/jupyter-docker-extension:22.4.1
Extensions can install binaries, invoke commands and access files on your machine.
Are you sure you want to continue? [y/N] y
Image not available locally, pulling mochoa/jupyter-docker-extension:22.4.1...
Installing new extension "mochoa/jupyter-docker-extension:22.4.1"
Installing service in Desktop VM...
Setting additional compose attributes
VM service started
Installing Desktop extension UI for tab "Jupyter Notebook"...
Extension UI tab "Jupyter Notebook" added.
Extension "Jupyter Notebook" installed successfully
```

**Note**: Docker Extension CLI is required to execute above command, follow the instructions at [Extension SDK (Beta) -> Prerequisites](https://docs.docker.com/desktop/extensions-sdk/#prerequisites) page for instructions on how to add it.

## Using Jupyter Notebook Docker Extension

Once the extension is installed a new extension is listed at the pane Extension of Docker Desktop.

By clicking at Jupyter Notebook icon the extension main window will display the Jupyter Notebook site once it has loaded.

### Addind extra packages

If extra Python package, they can be installed by using pip install on your notebook.
But if you need some Ubuntu extra package which required root access you could install using:

```bash
docker exec -ti --user root jupyter_embedded_dd_vm /bin/sh -c "apt update && apt install tcpdump"
```

Note: that if you upgrade Jupyter Notebook Docker Desktop Extension above post installations steps must be re-done.

### Persistent storage

Any project that you checkout using git command into /home/jovyan/work directory will persistent against Docker Desktop restart also Jupyter Notebook extension upgraded.

### Add IJava Kernel support

The extension is using the official Jupyter Docker Image, an extra step is necessary if you want IJava support.
Adding this kernel is easy, just right after the extension is installed by excuting in a terminal:

```bash
docker exec -ti --user root jupyter_embedded_dd_vm /bin/sh -c "curl -s https://raw.githubusercontent.com/marcelo-ochoa/jupyter-docker-extension/main/addJava.sh | bash"
```

### Add R Kernel support

The extension is using the official Jupyter Docker Image, an extra step is necessary if you want IJava support.
Adding this kernel is easy, just right after the extension is installed by excuting in a terminal:

```bash
docker exec -ti --user root jupyter_embedded_dd_vm /bin/sh -c "curl -s https://raw.githubusercontent.com/marcelo-ochoa/jupyter-docker-extension/main/addR.sh | bash"
```

## Know kveats

If your Docker Desktop is running in Dark Mode, first execution of Jupyter Notebook will start in Light mode, switch to other pane and back again to the extension and it will run in Dark mode. For the next switchs changing Docker Deskop UI colors will change automatically the extension setting.

## Uninstall

To uninstall the extension just execute:

```bash
$ docker extension uninstall mochoa/jupyter-docker-extension:22.4.1
Extension "Jupyter Notebook" uninstalled successfully
```

## Sources

As usual the code of this extension is at [GitHub](https://github.com/marcelo-ochoa/jupyter-docker-extension), feel free to suggest changes and make contributions, note that I am a beginner developer of React and TypeScript so contributions to make this UI better are welcome.
