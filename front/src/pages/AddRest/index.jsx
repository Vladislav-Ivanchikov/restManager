import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddRest.module.scss";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";

export const AddRest = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [type, setType] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imageURL, setImageURL] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const isEditing = Boolean(id);

  const inputFileRef = useRef();
  const handleChangeFile = async (e) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageURL(data.url);
      setIsLoading(false);
    } catch (e) {
      console.warn(e.message);
      alert("Ошибка загрузки картинки");
      setIsLoading(false);
    }
  };

  const onClickRemoveImage = () => {
    setImageURL("");
  };

  const onChange = React.useCallback((description) => {
    setDescription(description);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const fields = {
        name,
        type,
        tags: isEditing ? tags.toString() : tags,
        imageURL,
        description,
      };

      console.log(fields);

      const { data } = isEditing
        ? await axios.patch(`/restaurants/${id}`, fields)
        : await axios.post("/restaurants", fields);

      const _id = isEditing ? id : data._id;
      navigate(`/restaurants/${_id}`);
      setIsLoading(false);
    } catch (e) {
      console.warn(e.message);
      isEditing
        ? alert("Не удалось отредактировать")
        : alert("Не удалось создать заведение");
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "320px",
      autofocus: true,
      placeholder: "Введите описание...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  React.useEffect(() => {
    if (id) {
      axios.get(`/restaurants/${id}`).then(({ data }) => {
        setName(data.name);
        setType(data.type);
        setTags(data.tags);
        setDescription(data.description);
        setImageURL(data.imageURL);
      });
    }
  }, [id]);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }} isLoading={isLoading}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить картинку
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageURL && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4200${imageURL}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Название заведения..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тип заведения"
        value={type}
        onChange={(e) => setType(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={description}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Сохранить" : "Опубликовать"}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
