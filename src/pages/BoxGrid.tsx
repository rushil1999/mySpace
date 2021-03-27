import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import BoxSkeleton from '../components/BoxSkeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

export default function BoxGrid() {
  const [spacing, setSpacing] = React.useState<GridSpacing>(4);
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={4}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {[0, 1, 2, 3, 4, 5].map((value) => (
            <Grid key={value} item>
              <BoxSkeleton />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
