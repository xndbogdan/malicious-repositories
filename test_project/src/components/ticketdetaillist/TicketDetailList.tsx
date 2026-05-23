import { Box, Stack, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomTextField from "../text/TextField";

interface Props {
  item: any;
  creatorEmail: string;
}

const TicketDetailList = ({ item, creatorEmail }: Props) => {
  const theme = useTheme();
  return (
    <Box mt={2}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          border: `1px solid ${
            item.email === creatorEmail
              ? theme.palette.primary.main
              : theme.palette.secondary.main
          }`,
          borderRadius: "8px",
        }}
        p={3}
      >
        <Box
          sx={{
            borderRight: `1px solid ${
              item.email === creatorEmail
                ? theme.palette.primary.main
                : theme.palette.secondary.main
            }`,
            width: "100%",
          }}
          maxWidth={"230px"}
          pr={3}
        >
          <Typography
            component="h2"
            variant="h3"
            sx={{ mb: 2 }}
            color={
              item.email === creatorEmail
                ? theme.palette.primary.main
                : theme.palette.secondary.main
            }
          >
            {item.name}
          </Typography>
          <Typography
            component="h5"
            variant="h5"
            color={
              item.email === creatorEmail
                ? theme.palette.primary.main
                : theme.palette.secondary.main
            }
            sx={{
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.email}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <Typography component="h6" variant="body1">
              {item.message}
            </Typography>
          </Box>
          <Box>
            <Typography
              component="h5"
              variant="caption"
              align="right"
              color={
                item.email === creatorEmail
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main
              }
            >
              {item.creationTime}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default TicketDetailList;
