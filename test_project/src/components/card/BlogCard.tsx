import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { padZero } from "../../utils/util";
import ConfirmModal from "../modal/ConfirmModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteBlog } from "../../store/blogs";
import { selectLoginUser } from "../../store/auth/selectors";

const BlogCard = ({ item }: any) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedin = useAppSelector(selectLoginUser);
  const handleClick = () => {
    navigate(`/blogs/${item.id}`);
  };
  const [openModal, setOpenModal] = useState(false);
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function startCountdown(distance: any) {
    const interval = setInterval(() => {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance <= 0) {
        clearInterval(interval);
      }

      setTimer({ days, hours, minutes, seconds });

      distance -= 1000;
    }, 1000);
  }

  const handleDeleteBlog = (status: boolean) => {
    if (status) {
      dispatch(deleteBlog({ id: item.id }));
    }
    setOpenModal(false);
  };

  const editBlog = () => {
    navigate(`/edit-post/${item.id}`);
  }

  useEffect(() => {
    startCountdown(item.distance);
  }, []);

  return (
    <Card
      sx={{
        cursor: "pointer",
        border: "1px solid rgb(229, 234, 242)",
        borderRadius: "10px",
        // background: `linear-gradient(to bottom, ${theme.palette.primary.main}, #FFFFFF)`,
      }}
    >
      <CardActionArea onClick={() => handleClick()}>
        <Box
          sx={{
            background: item?.is_published ? "#9ff1d266" : "#fde6a859",
          }}
        >
          <CardHeader
            title={item.company_name}
            subheader={item.uploaded_date}
            sx={{
              borderTop: `3px solid ${
                item?.is_published
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main
              }`,
              "& .MuiCardHeader-content": {
                width: "100%",
              },
              "& .MuiCardHeader-title": {
                fontSize: "20px",
                lineHeight: 2,
                textOverflow: "ellipsis",
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
              },
              "& .MuiCardHeader-subheader": {
                fontSize: "12px",
              },
            }}
          ></CardHeader>
          <Box p={2}>
            {item?.is_published ? (
              <Typography
                variant="h5"
                color="primary.main"
                sx={{
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: "8px",
                  background: "white",
                }}
              >
                Published
              </Typography>
            ) : (
              <Typography
                variant="h5"
                color="error"
                sx={{
                  border: `2px solid ${theme.palette.secondary.main}`,
                  borderRadius: "8px",
                  background: "white",
                }}
              >
                {padZero(timer.days)}d {padZero(timer.hours)}h{" "}
                {padZero(timer.minutes)}m {padZero(timer.seconds)}s
              </Typography>
            )}
          </Box>
        </Box>
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            height={"150px"}
            sx={{ overflowWrap: "break-word" }}
          >
            {item.brief_description}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            borderTop: "1px solid rgb(229, 234, 242)",
            position: "relative",
            background: "white",
            padding: "0px 8px",
          }}
        >
          <Box sx={{ display: "flex", margin: "5px auto 5px 0px" }}>
            <RemoveRedEyeIcon color="disabled" />
            <Typography variant="body2" color="text.secondary">
              &nbsp;{item.views_count}
            </Typography>
          </Box>
          {loggedin && (
            <>
              <IconButton aria-label="add to favorites" onClick={(event: any) => {
                  event.stopPropagation();
                  editBlog();
                }}>
                <EditNoteIcon color="primary" />
              </IconButton>
              <IconButton
                aria-label="share"
                onClick={(event: any) => {
                  event.stopPropagation();
                  setOpenModal(true);
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </>
          )}
        </CardActions>
      </CardActionArea>
      <ConfirmModal
        text="Are you sure you want to delete post?"
        openModal={openModal}
        handleAction={handleDeleteBlog}
      />
    </Card>
  );
};

export default BlogCard;
