import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../redux/slices/auth";
import { Restaurant } from "../components";
import { TagsBlock } from "../components";
import { fetchRest, fetchTags } from "../redux/slices/restaurants";
import { PORT } from "../constant";

export const Home = () => {
  const dispatch = useDispatch();
  const { rest, tags } = useSelector((state) => state.rest);
  const { data } = useSelector((state) => state.auth);
  const isAuth = useSelector(selectIsAuth);

  const isRestLoading = rest.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchRest());
    dispatch(fetchTags());
  }, [dispatch]);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isRestLoading ? [...Array(5)] : rest.items).map((item, index) =>
            isRestLoading ? (
              <Restaurant isLoading={true} key={index} />
            ) : (
              <Restaurant
                id={item._id}
                key={item._id}
                name={item.name}
                type={item.type}
                imageUrl={!!item.imageURL ? PORT + item?.imageURL : ""}
                user={item.user}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={3}
                tags={item.tags}
                isEditable={data?._id === item.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
