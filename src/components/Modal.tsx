import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Launches } from '../store/api/spacex/spacex-slice';
import { Box, Divider, Grid } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

type DialogProps = {
  data?: Launches;
  onClose: () => void;
};

export default function CustomizedDialogs(props: DialogProps) {
  const { data, onClose } = props;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (data?.mission_id) setOpen(true);
  }, [data, data?.mission_id]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
          <Box width={'150px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <img width={50} height={50} src={data?.links.mission_patch_small} alt={data?.links.wikipedia} />
            {data?.mission_name}
          </Box>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {data?.details}. &nbsp;
            <a target='_blank' href={data?.links.wikipedia} rel='noreferrer'>
              Wikipedia
            </a>
          </Typography>
          <Divider />
          <Grid container marginY={2}>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                Flight Number
              </Grid>
              <Grid item xs={6}>
                {data?.flight_number}
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid container marginY={2}>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                Mission Name
              </Grid>
              <Grid item xs={6}>
                {data?.mission_name}
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid container marginY={2}>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                Rocket Type
              </Grid>
              <Grid item xs={6}>
                {data?.rocket.rocket_type}
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid container marginY={2}>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                Rocket Name
              </Grid>
              <Grid item xs={6}>
                {data?.rocket.rocket_name}
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid container marginY={2}>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                Manufacturer
              </Grid>
              <Grid item xs={6}>
                {data?.rocket.second_stage.payloads[0].manufacturer}
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid container marginY={2}>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                Nationality
              </Grid>
              <Grid item xs={6}>
                {data?.rocket.second_stage.payloads[0].nationality}
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid container marginY={2}>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                Payload Type
              </Grid>
              <Grid item xs={6}>
                {data?.rocket.second_stage.payloads[0].payload_type}
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid container marginY={2}>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                Orbit
              </Grid>
              <Grid item xs={6}>
                {data?.rocket.second_stage.payloads[0].orbit}
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid container marginY={2}>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                Launch Site
              </Grid>
              <Grid item xs={6}>
                {data?.launch_site.site_name}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
