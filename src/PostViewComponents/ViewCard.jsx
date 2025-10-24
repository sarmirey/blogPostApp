import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  Grid,
} from "@mui/material";

const ViewCard = (props) => {
  const post = props.post;
  const dateHandler = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  return (
    <>
      <Card
        sx={{
          width: 1200,
          height: 600,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h1">{post.title}</Typography>
            <Typography variant="h3">{post.subtitle}</Typography>
            <Typography variant="h5" component="div">
              {post.content}
            </Typography>
            <Grid container spacing={1} justifyContent="center">
              {post.tags &&
                post.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    variant="outlined"
                    sx={{ width: "10rem", height: "2rem" }}
                  />
                ))}
            </Grid>
            <Typography variant="subtitle-1"> Author: {post.author}</Typography>
            <Typography variant="subtitle-2" sx={{ color: "#00008B" }}>
              <b>{dateHandler(post.dateCreated)}</b>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default ViewCard;
