import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";

import { Container, UserArea, News, Logo, LogoArea } from "./styles";
import LogoInstitute from "../../assets/logo.png";

import Post from "../Post";
import MenuOffline from "../../components/MenuOffline";
import MenuOnline from "../../components/MenuOnline";
import NewPost from "../../components/NewPost";
import api from "../../services/api";

const data = [
  {
    event_id: 1,
    user_id: "Clesley",
    event_name: `What is Lorem Ipsum?`,
    event_description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    date_start: "2019-10-05T17:09:50.411Z",
    date_end: "2019-10-05T17:09:50.411Z",
  },
];

export default function Feed({ history }) {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      history.push("/");
    } else {
      setToken(sessionStorage.getItem("token"));
    }
  }, [history]);

  useEffect(() => {
    if (token) {
      loadCalendar();
    }
  }, [token]);

  const onPostCreated = (item) => {
    const newPosts = [...posts];

    newPosts.push(item);

    setPosts(newPosts);
  };

  const loadCalendar = async () => {
    console.log({ token });
    const response = await api.get("/event", {
      headers: {
        Authorization: token,
      },
    });

    console.log(response.data);

    setPosts(data);
  };

  return (
    <Container>
      <UserArea>
        <LogoArea>
          <Logo>
            <img width="200" src={LogoInstitute} alt="Logotipo do Instituto " />
          </Logo>
        </LogoArea>
        <MenuOnline history={history} />
      </UserArea>
      <News>
        <NewPost onPostCreated={onPostCreated}></NewPost>
        <Schedule>
          <Day>
            <Event></Event>
            <Event></Event>
            <Event></Event>
            <Event></Event>
            <Event></Event>
            <Event></Event>
          </Day>
        </Schedule>
      </News>
    </Container>
  );
}
