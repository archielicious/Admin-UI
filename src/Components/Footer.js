import * as React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
export default function Footer() {
  return (
    <Box
      sx={{
        marginTop: 4,
      }}
    >
      <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
        Developed with{" "}
        <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
          <FavoriteIcon style={{ color: "e30b5c" }} />
        </span>{" "}
        By{" "}
        <Tooltip title="github.com/archielicious">
          <Link
            href="https://github.com/archielicious"
            underline="none"
            color="royalblue"
            sx={{
              "&:hover": {
                color: "#e30b5c",
              },
            }}
          >
            Archishman Dash
          </Link>
        </Tooltip>
      </Typography>
    </Box>
  );
}
