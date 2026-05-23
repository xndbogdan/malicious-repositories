import React, { useEffect } from "react";
import check from "../../assets/svg/notification_check.svg";
import error from "../../assets/svg/notification_error.svg";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { alertMessage, alertSeverity } from "../../store/alert/selectors";
import { showAlert } from "../../store/alert";
import { Box } from "@mui/material";

export default function Notifications() {
  const dispatch = useAppDispatch();
  const msg = useAppSelector(alertMessage);
  const severity = useAppSelector(alertSeverity);

  const [openAlert, setOpenAlert] = React.useState(false);

  React.useEffect(() => {
    if (msg.length !== 0) {
      setOpenAlert(true);
    }
  }, [msg, severity]);

  const handleCloseClick = () => {
    dispatch(showAlert({ message: "", severity: "" }));
    setOpenAlert(false);
  };

  useEffect(() => {
    let timeId = setTimeout(() => {
      dispatch(showAlert({ message: "", severity: "" }));
      setOpenAlert(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, [msg]);

  return (
    <>
      {openAlert && (
        <Box
          sx={{
            zIndex: 99998,
            position: "fixed",
            top: "30px",
            right: "50px",
            flexDirection: "column",
          }}
        >
          {severity === "success" ? (
            <Box
              sx={{
                marginTop: "10px",
                background: "#ddf4de",
                boxShadow: "0px 0px 30px rgba(55, 55, 79, 0.05)",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "8px 20px 8px 20px",
                zIndex: 99999,
              }}
            >
              <Box
                sx={{
                  width: "44px",
                  height: "44px",
                  left: "1206px",
                  top: "175px",
                  background:
                    "linear-gradient(57.2deg, #29C98F 20.25%, #66D8AF 82.22%)",
                  transform: "rotate(-180deg)",
                  borderRadius: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={check}
                  style={{ color: "#fff", transform: "rotate(-180deg)" }}
                />
              </Box>
              <Box sx={{ margin: "10px 12px", textAlign: "left" }}>
                <Box
                  sx={{
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "16px",
                    lineHeight: "22px",
                    color: "#29C98F",
                  }}
                >
                  Success
                </Box>
                <Box
                  sx={{
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "14px",
                    lineHeight: "17px",
                    opacity: 0.5,
                    color: "#444444",
                  }}
                >
                  {msg}
                </Box>
              </Box>
              <IconButton onClick={handleCloseClick} size="small">
                <CloseIcon
                  sx={{
                    color: "#444444",
                    width: "18px",
                    height: "18px",
                    cursor: "pointer",
                    "& .MuiIconButton-root:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                />
              </IconButton>
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: "10px",
                background: "#fff2d0",
                boxShadow: "0px 0px 30px rgba(55, 55, 79, 0.05)",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "8px 20px 8px 20px",
                zIndex: 99999,
              }}
            >
              <Box
                sx={{
                  minWidth: "44px",
                  minHeight: "44px",
                  left: "1206px",
                  top: "175px",
                  background:
                    "linear-gradient(90deg, #FF7C4C 20%, #FFB03A 101.82%)",
                  transform: "rotate(-180deg)",
                  borderRadius: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={error}
                  style={{ color: "#fff", transform: "rotate(-180deg)" }}
                />
              </Box>

              <Box sx={{ margin: "10px 12px", textAlign: "left" }}>
                <Box
                  sx={{
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "16px",
                    lineHeight: "22px",
                    color: "#FF7C4C",
                  }}
                >
                  Error
                </Box>
                <Box
                  sx={{
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "14px",
                    lineHeight: "17px",
                    opacity: 0.5,
                    color: "#444444",
                  }}
                >
                  {msg}
                </Box>
              </Box>
              <IconButton onClick={handleCloseClick} size="small">
                <CloseIcon
                  sx={{
                    color: "#444444",
                    width: "18px",
                    height: "18px",
                    cursor: "pointer",
                    "& .MuiIconButton-root:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                />
              </IconButton>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

<Box sx={{}}></Box>;
