import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  useTheme,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

const PostDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const theme = useTheme();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/getmyposts?page=${page}` ,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use appropriate token handling
          },
        }
      );
  
      const { posts: fetchedPosts, totalPages, currentPage } = response.data;
  
      if (currentPage >= totalPages) {
        setHasMore(false); // No more pages to load
      }
  
      setPosts((prevPosts) => {
        const newPosts = fetchedPosts.filter(
          (newPost) => !prevPosts.some((post) => post._id === newPost._id)
        );
        return [...prevPosts, ...newPosts];
      });
  
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  
  
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
        }}
      >
        Posts Dashboard
      </Typography>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <CircularProgress />
          </Box>
        }
        endMessage={
          <Typography align="center" sx={{ marginTop: 2 }}>
            No more posts to show.
          </Typography>
        }
      >
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post._id}>
              <Card
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                  color: theme.palette.mode === "dark" ? "#fff" : "#000",
                }}
              >
                <CardContent>
                  <Typography variant="h6">{post.shopName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Deadline: {new Date(post.deadline).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle1">Items:</Typography>
                  <ul>
                    {post.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.quantity}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};

export default PostDashboard;
