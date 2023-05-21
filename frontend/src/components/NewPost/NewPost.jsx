import React, { Fragment, useEffect, useState } from "react";
import "./newpost.css";
import { Button, Typography } from "@mui/material";
import { addPost } from "../../redux/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { loadUser } from "../../redux/actions/userAction";
// import Loader from "../Loader/Loader";

const NewPost = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();

  const [image, setImage] = useState();
  const [prevIMG, setPrevIMG] = useState();
  const [caption, setCaption] = useState("");

  const { error, message, loading } = useSelector((state) => state.like);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();

    Reader.onload = (e) => {
      if (Reader.readyState === 2) {
        setPrevIMG(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };
  const PostSubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addPost(image, caption));
    dispatch(loadUser());
    setImage(undefined);
    setPrevIMG(undefined);
    setCaption("");
  };
  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch({ type: "ClearErrorsLike" });
    }
    if (message) {
      Alert.success(message);
      dispatch({ type: "ClearMessageLike" });
    }
  }, [Alert, error, message, dispatch]);

  return (
    <Fragment>
      <div className="newPost">
        <form onSubmit={PostSubmitHandler} className="newPostForm">
          <Typography style={{fontSize:"2rem"}} variant="h3">Create Post</Typography>

          {prevIMG && <img src={prevIMG} alt="post" />}
          <input
            type="file"
            onChange={(e) => {
              handleImageChange(e);
              setImage(e.target.files[0]);
            }}
            accept="image/*"
            //   value={image}
            required
          />
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption..."
          />
          <Button type="submit" disabled={loading ? true : false}>
            {loading && loading ? "Uploading......" : "Post"}
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewPost;
