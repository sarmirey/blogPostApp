import { Typography, Box, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
const BlogCard = ({ id, title, author, content, dateCreated }) => {
  const navigate = useNavigate();
  const dateHandler = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  return (
    <>
      <Box
        key={id}
        sx={{
          "&:hover": {
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.30), 0 20px 40px rgba(0,0,0,0.28)",
            border: "0.09rem solid black",
            textDecorationStyle: "underline",
            transition: "opacity 500ms ease 0s",
            transitionProperty: "opacity",
            transitionDuration: "500ms",
            transitionTimingFunction: "ease",
            transitionDelay: "0s",
            opacity: 1,
          },
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            width: 900,
            height: 150,
          },
        }}
      >
        <Card
          onClick={() => navigate(`/blog/${id}`, { state: false })}
          sx={{ cursor: "pointer" }}
        >
          <CardContent>
            <Typography variant="h5">
              <b> {title} </b>
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {content.slice(0, 100)}
              {"\n.... "}
              <Link to={`/blog/${id}`}>read more</Link>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {author}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#00008B" }}>
              <b> {dateHandler(dateCreated)}</b>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default BlogCard;
