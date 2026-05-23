import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import { FooterSectionTitle } from "../footer";

const courseMenu = [
  {
    label: "UI/UX Design",
    path: "#"
  },
  {
    label: "Mobile Development",
    path: "#"
  },
  {
    label: "Machine Learning",
    path: "#"
  },
  {
    label: "Web Development",
    path: "#"
  }
];

interface NavigationItemProps {
  label: string;
  path: string;
}

const NavigationItem: FC<NavigationItemProps> = ({ label, path }) => {
  return (
    <MuiLink
      href={path}
      underline="hover"
      sx={{
        display: "block",
        mb: 1,
        color: "primary.contrastText"
      }}
    >
      {label}
    </MuiLink>
  );
};

const FooterNavigation: FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {/* <FooterSectionTitle title="Course" /> */}
        {/* {courseMenu.map(({ label, path }, index) => (
          <NavigationItem
            key={index + path}
            label={label}
            path={"#"}
          />
        ))} */}
      </Grid>
      <Grid item xs={12} md={6}>
        <FooterSectionTitle title="Menu" />
      </Grid>
    </Grid>
  );
};

export default FooterNavigation;
