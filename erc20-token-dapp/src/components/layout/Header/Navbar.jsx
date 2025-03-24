import { useState, Fragment } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';

//const Navbar = ({mainLinks, presaleLink, bridgeLink, moreMenuLinks, comingSoonLink, handleClickContracts}) => {
const Navbar = ({
  mainLinks,
  presaleLink,
  moreMenuLinks,
  comingSoonLink,
  handleClickContracts,
}) => {
  const { pathname } = useLocation();
  const [anchorMoreEl, setAnchorMoreEl] = useState(null);
  const openMoreMenu = Boolean(anchorMoreEl);

  const handleClickMoreMenu = (event) => {
    setAnchorMoreEl(event.currentTarget);
  };

  const handleCloseMoreMenu = () => {
    setAnchorMoreEl(null);
  };

  const handleClickContractsItem = () => {
    handleCloseMoreMenu();
    handleClickContracts();
  };

  return (
    <Fragment>
      <Stack direction="row" spacing={3} alignItems="center">
        {mainLinks.map((link) => (
          <Button
            key={link.href}
            component={NavLink}
            activeClassName="activeNavLink"
            to={link.href}
            exact
            color="inherit"
            size="large"
            sx={{ fontWeight: 500, borderRadius: 5 }}
          >
            {link.label}
          </Button>
        ))}
        <Button
          component={NavLink}
          activeClassName="activeNavLink"
          to={presaleLink.href}
          exact
          color="inherit"
          size="large"
          sx={{ fontWeight: 500, borderRadius: 5 }}
        >
          {/* <Badge
            badgeContent={
              <Stack direction="row" spacing={1} alignItems="center">
                <span className="pulse"></span>
                <span style={{color: 'rgba(255, 255, 255, .8)', fontWeight: 500, letterSpacing: 1}}>Live</span>
              </Stack>
            } 
            color="warning"
          >
          </Badge> */}
          {presaleLink.label}
        </Button>

        {comingSoonLink.map((link) => (
          <Button
            key={link}
            disabled
            color="inherit"
            size="large"
            sx={{ fontWeight: 500, borderRadius: 5 }}
          >
            <Badge
              key={link}
              badgeContent={
                <span
                  style={{
                    color: 'rgba(255, 255, 255, .8)',
                    fontWeight: 500,
                    letterSpacing: 1,
                  }}
                >
                  SOON
                </span>
              }
              color="primary"
            >
              {link}
            </Badge>
          </Button>
        ))}
        <Fragment>
          <Button
            color="inherit"
            size="large"
            onClick={handleClickMoreMenu}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{ fontWeight: 500, borderRadius: 5 }}
          >
            More
          </Button>
          <Menu
            id="more-menu"
            anchorEl={anchorMoreEl}
            open={openMoreMenu}
            onClose={handleCloseMoreMenu}
            MenuListProps={{
              'aria-labelledby': 'more-menu',
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                boxShadow: '0 4px 14px 0 rgb(0 0 0 / 10%)',
                borderRadius: '15px',
              },
            }}
          >
            {moreMenuLinks.map((link) => (
              <MenuItem
                key={link.href}
                onClick={handleCloseMoreMenu}
                component={Link}
                to={link.href}
                selected={pathname === link.href}
              >
                {link.label}
              </MenuItem>
            ))}

            <MenuItem
              onClick={handleCloseMoreMenu}
              component="a"
              href={''} // elo whitepaper url
              target="_blank"
              rel="noopener noreferrer"
            >
              ELO whitepaper
            </MenuItem>
            <MenuItem onClick={handleClickContractsItem}>Contracts</MenuItem>
          </Menu>
        </Fragment>
      </Stack>
    </Fragment>
  );
};

export default Navbar;
