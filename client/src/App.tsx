import { useState, useEffect } from 'react';
import { Box, LinearProgress, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import { createDockerDesktopClient } from '@docker/extension-api-client';

const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const ddClient = useDockerDesktopClient();
  const isDarkModeEnabled = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });

  useEffect(() => {
    let timer: number;
    let shCmd = '"sed -i s/'.concat((isDarkModeEnabled) ? 'Light' : 'Dark').concat('/').concat((isDarkModeEnabled) ? 'Dark' : 'Light').concat('/g /home/jovyan/.jupyter/lab/user-settings/@jupyterlab/apputils-extension/themes.jupyterlab-settings || (mkdir -p /home/jovyan/.jupyter/lab/user-settings/@jupyterlab/apputils-extension && echo \'{\\"theme\\": \\"JupyterLab Light\\"}\' > /home/jovyan/.jupyter/lab/user-settings/@jupyterlab/apputils-extension/themes.jupyterlab-settings)"')
    //console.log(shCmd);
    const start = async () => {
      setReady(() => false);

      await ddClient.docker.cli.exec("exec", [
        '-d',
        'jupyter_embedded_dd_vm',
        '/bin/sh',
        '-c',
        shCmd
      ]);
    };

    start().then(() => {
      let retries = 60;
      let timer = setInterval(async () => {

        if (retries == 0) {
          clearInterval(timer);
          setUnavailable(true);
        }

        try {
          const result = await ddClient.extension.vm?.service?.get('/ready');

          if (Boolean(result)) {
            setReady(() => true);
            clearInterval(timer);
          }
        } catch (error) {
          console.log('error when checking Jupyter Notebook status', error);
          retries--;
        }
      }, 1000);
    }).catch(error => {
      console.log('failed to start Jupyter Notebook', error);
      ddClient.desktopUI.toast.error(error);
      setUnavailable(true);
    })

    return () => {
      clearInterval(timer);
    };
  }, [isDarkModeEnabled]);

  return (
    <>
      {unavailable && (
        <Grid container flex={1} direction="column" padding="16px 32px" height="100%" justifyContent="center" alignItems="center">
          <Grid item>
          Jupyter Notebook failed to start, please close the extension and reopen/reinstall to try again.
          </Grid>
        </Grid>
      )}
      {!ready && (
        <Grid container flex={1} direction="column" padding="16px 32px" height="100%" justifyContent="center" alignItems="center">
          <Grid item>
            <LinearProgress/>
            <Typography mt={2}>
              Waiting for Jupyter Notebook to be ready. It may take some seconds if
              it's the first time.
            </Typography>
          </Grid>
        </Grid>
      )}
      {ready && (
        window.location.href = 'http://localhost:58888/lab'
      )}
    </>
  );
}
