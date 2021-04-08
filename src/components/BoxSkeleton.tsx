import React, { useState, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Skeleton from "@material-ui/lab/Skeleton";
import Button from "@material-ui/core/Button";
import { ThemeContext } from "../App";

function BoxSkeleton(props: any) {
  const [box, setBox] = useState({});
  const [actionListState, setActionListState] = useState<Boolean>(false);
  const { boxData, onClickChildBox, loading = false } = props;
  // console.log("SKELETON", boxData);
  const themeFunction = useContext(ThemeContext);
  const styles = themeFunction();

  function onButtonClick() {
    onClickChildBox(boxData.id);
  }

  return (
    <div>
      <Card className={styles.card}>
        <CardHeader
          avatar={
            loading ? (
              <Skeleton
                animation="wave"
                variant="circle"
                width={40}
                height={40}
              />
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
            loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              boxData.name
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              "created 7 hours ago"
            )
          }
        />
        {loading ? (
          <Skeleton animation="wave" variant="rect" className={styles.media} />
        ) : (
          <CardMedia
            className={styles.media}
            image={
              boxData.imgUrl
                ? boxData.imgUrl
                : "https://firebasestorage.googleapis.com/v0/b/myspace-ec3c9.appspot.com/o/64c35da8ce05400291f6eaf561d1acea.png?alt=media&token=b517a4e5-06e2-49f7-a224-801cfac3c6a7"
            }
            title="BOX"
          />
        )}
        <CardContent>
          {loading ? (
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </React.Fragment>
          ) : (
            <Button onClick={onButtonClick}>
              <Typography variant="body2" color="textSecondary" component="p">
                {boxData.description}
              </Typography>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default BoxSkeleton;
