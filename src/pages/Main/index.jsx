import React, { useEffect } from "react";

export default function Main({ history }) {
  useEffect(() => {
    // const logged = localStorage.getItem("logged");

    history.push("/login");
  }, [history]);

  return <div />;
}
