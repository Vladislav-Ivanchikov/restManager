import React from "react";
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullRest, Registration, AddRest, Login } from "./pages";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMe } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  // const { isAuth } = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants/:id" element={<FullRest />} />
          <Route path="/add-rest" element={<AddRest />} />
          <Route path="/restaurants/:id/edit" element={<AddRest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
