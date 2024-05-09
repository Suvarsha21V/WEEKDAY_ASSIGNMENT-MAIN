import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Loading component to show a loading spinner when the data is being fetched
const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
