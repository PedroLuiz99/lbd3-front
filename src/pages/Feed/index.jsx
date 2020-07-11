import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";

import { Container, UserArea, News, Logo, LogoArea } from "./styles";
import LogoInstitute from "../../assets/logo.png";

import Post from "../Post";
import MenuOffline from "../../components/MenuOffline";
import MenuOnline from "../../components/MenuOnline";
import NewPost from "../../components/NewPost";

const data = [
  {
    _id: 1,
    postUrl: "./1",
    author: "Clesley",
    avatar:
      "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/07/21/10/avatar-neytiri.jpg",
    title: `What is Lorem Ipsum?`,
    createdAt: "2019-10-05T17:09:50.411Z",
    subTitle:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  },
];

export default function Feed({ history }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const onPostCreated = (item) => {
    const newPosts = [...posts];

    newPosts.push(item);

    setPosts(newPosts);
  };

  const loadPosts = async () => {
    const payload = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 100);
    });

    setPosts(payload);
  };

  return (
    <Container>
      <UserArea>
        <LogoArea>
          <Logo>
            <img src={LogoInstitute} alt="Logotipo do Instituto " />
          </Logo>
        </LogoArea>
        {localStorage.getItem("logged") ? (
          <MenuOnline history={history} />
        ) : (
          <MenuOffline history={history}></MenuOffline>
        )}
      </UserArea>
      <News>
        {localStorage.getItem("logged") && (
          <NewPost onPostCreated={onPostCreated}></NewPost>
        )}
        {posts.length ? (
          <Alert>Últimos {posts.length} posts encontrados.</Alert>
        ) : null}
        {posts.map((element, index) => (
          <Post key={Date.now() + index} item={element}></Post>
        ))}
      </News>
    </Container>
  );
}
