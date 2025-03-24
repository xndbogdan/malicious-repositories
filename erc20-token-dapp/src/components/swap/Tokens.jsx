import React, { Fragment, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const itemsPerPage = 10;

function Tokens({ open, handleClose, setToken, tokenList }) {
  const [page, setPage] = useState(0);
  const tokens = tokenList ? Object.keys(tokenList) : [];
  const [filteredTokens, setFilteredTokens] = useState(tokens);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleFilterToken = (str) => {
    setPage(0);
    const filtered = tokens.filter((t) => tokenList[t].name.toLowerCase().includes(str));
    setFilteredTokens(filtered);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      BackdropProps={{
        style: { backgroundColor: 'rgba(111, 126, 140, 0.2)', backdropFilter: 'blur(2px)' },
      }}
      PaperProps={{
        style: { borderRadius: 25, boxShadow: 'none' },
      }}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title" sx={{ p: 3 }}>
        <TextField
          fullWidth
          id="filter"
          label="Start typing to search tokens"
          variant="standard"
          onChange={(e) => handleFilterToken(e.target.value)}
          InputProps={{
            autoComplete: 'off',
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          autoFocus
        />
      </DialogTitle>
      {filteredTokens.length === 0 ? (
        <DialogContent>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
            No results. May be your search was too specific.
          </Typography>
        </DialogContent>
      ) : (
        <Fragment>
          <DialogContent>
            {filteredTokens
              .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
              .map((token, index) => (
                <List dense component="nav" aria-label="tokens" key={index}>
                  <ListItemButton
                    onClick={() => {
                      setToken(tokenList[token]);
                      handleClose();
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={tokenList[token].logoURI}
                        sx={{ width: 32, height: 32 }}
                        alt="Token Logo"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={tokenList[token].name}
                      secondary={tokenList[token].symbol}
                      primaryTypographyProps={{
                        fontSize: '1rem',
                        fontWeight: 500,
                      }}
                    />
                  </ListItemButton>
                  <Divider variant="inset" />
                </List>
              ))}
          </DialogContent>
          <DialogActions>
            <Pagination
              component="div"
              count={filteredTokens.length}
              rowsPerPage={itemsPerPage}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[]}
              sx={{ mb: 0 }}
            />
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  );
}

export default Tokens;
