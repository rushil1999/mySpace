import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
      margin: theme.spacing(2),
    },
    media: {
      height: 190,
    },
  }),
);

interface MediaProps {
  loading?: boolean;
}

function BoxSkeleton(props: any) {
  const { loading = false } = props;
  const classes = useStyles();
  //TODO: Change button to link
  return (
		<Card className={classes.card}>
			<CardHeader
				avatar={
					loading ? (
						<Skeleton animation="wave" variant="circle" width={40} height={40} />
					) : (
						<Avatar
							alt="Box"
							src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
						/>
					)
				}
				action={
					loading ? null : (
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					)
				}
				title={
					loading ? <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} /> : 'Ted'
				}
				subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : '5 hours ago'}
			/>
			{loading ? (
				<Skeleton animation="wave" variant="rect" className={classes.media} />
			) : (
				<CardMedia
					className={classes.media}
					image="gs://myspace-ec3c9.appspot.com/64c35da8ce05400291f6eaf561d1acea.png"
					title="BOX"
				/>
			)}
			<CardContent>
				{loading ? (
					<React.Fragment>
						<Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
						<Skeleton animation="wave" height={10} width="80%" />
					</React.Fragment>
				) : (
					<Button>
						<Typography variant="body2" color="textSecondary" component="p">
							{
								"Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
							}
						</Typography>
					</Button>
				)}
			</CardContent>
		</Card>
  );
}

export default BoxSkeleton;

// export default function Facebook() {
//   return (
//     <div>
//       {/* <Box loading /> */}
//       <Box />
//     </div>
//   );
// }
