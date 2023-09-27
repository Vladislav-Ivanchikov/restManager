import React from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Restaurant } from "../components";
import { Index } from "../components";
import { CommentsBlock } from "../components";
import { Menu } from "../components/Menu";
import { RestSkeleton } from "../components/Restaurant/Skeleton";
import { PORT } from "../constant";

export const FullRest = () => {
  const [rest, setRest] = React.useState(null);
  const [restMenu, setRestMenu] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useLayoutEffect(() => {
    axios
      .get(`/restaurants/${id}`)
      .then((res) => {
        setRest(res.data);
        axios
          .get(`/menu/${id}`)
          .then((res) => {
            setRestMenu(res.data);
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (isLoading) {
    return <RestSkeleton />;
  }

  return (
    <>
      <Restaurant
        id={id}
        name={rest.name}
        imageUrl={!!rest.imageURL ? PORT + rest?.imageURL : ""}
        user={rest.user}
        createdAt={rest.createdAt}
        viewsCount={rest.viewsCount}
        type={rest.type}
        commentsCount={3}
        tags={rest.tags}
        isFullPost
      >
        <ReactMarkdown children={rest.description} />
      </Restaurant>
      <Menu menu={restMenu} />
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
