import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
//import Badge from '@mui/material/Badge';
//import Stack from '@mui/material/Stack';

const drawerWidth = 220;

//const SideDrawer = ({mainLinks, bridgeLink, presaleLink, moreMenuLinks, comingSoonLink, onClose, open, window, handleClickContracts}) => {
const SideDrawer = ({
  mainLinks,
  presaleLink,
  moreMenuLinks,
  comingSoonLink,
  onClose,
  open,
  window,
  handleClickContracts,
}) => {
  const router = useLocation();
  const container = window !== undefined ? () => window().document.body : undefined;

  const handleClickContractsItem = () => {
    onClose();
    handleClickContracts();
  };

  return (
    <Drawer
      container={container}
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        zIndex: 10000,
        display: {
          xs: 'block',
          sm: 'none',
        },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          border: 0,
          boxShadow: 'none',
        },
      }}
      BackdropProps={{
        style: { backgroundColor: 'rgba(111, 126, 140, 0.2)', backdropFilter: 'blur(2px)' },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List
          sx={{ maxWidth: drawerWidth }}
          component="nav"
          className="sidebar"
          aria-labelledby="main-list"
          dense
        >
          {mainLinks.map((link) => (
            <ListItemButton
              component={Link}
              to={link.href}
              key={link.href}
              selected={router.pathname === link.href}
              onClick={onClose}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
          <ListItemButton
            onClick={onClose}
            component={Link}
            to={presaleLink.href}
            selected={router.pathname === presaleLink.href}
            sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
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
            <ListItemText primary={presaleLink.label} />
          </ListItemButton>

          {comingSoonLink.map((link) => (
            <ListItem key={link} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <ListItemText primary={link} sx={{ opacity: 0.3 }} />
            </ListItem>
          ))}
        </List>
        <Divider light />
        <List
          sx={{ maxWidth: drawerWidth }}
          component="nav"
          className="sidebar"
          aria-labelledby="main-list"
          dense
        >
          {moreMenuLinks.map((link) => (
            <ListItemButton
              component={Link}
              to={link.href}
              key={link.href}
              selected={router.pathname === link.href}
              onClick={onClose}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
          <ListItemButton
            onClick={onClose}
            component="a"
            href={process.env.REACT_APP_ELO_WHITEPAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemText primary="ELO whitepaper" />
          </ListItemButton>
          <ListItemButton onClick={handleClickContractsItem}>
            <ListItemText primary="Contracts" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
