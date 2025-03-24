import { Fragment, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import items from './nft.json';
import Pagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import GalleryItemDetails from './GalleryItemDetails';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import useScroll from '../../hooks/useScroll';

const rowsPerPage = 54;

const GalleryItems = () => {
  const [executeScroll, scrollRef] = useScroll();
  const [page, setPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetailsDialogOpen, setItemDetailsDialogOpen] = useState(false);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
    executeScroll();
  };

  const handleItemDetailsDialogToggle = () => {
    setItemDetailsDialogOpen(!itemDetailsDialogOpen);
  };

  const handleClickItem = (item) => {
    setSelectedItem(item);
    handleItemDetailsDialogToggle();
  };

  return (
    <Fragment>
      <Pagination
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
        sx={{ mb: 4 }}
      />
      <Grid container spacing={4} mb={3} ref={scrollRef} className="fadeInUp">
        {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
          <Grid item xs={6} sm={4} md={2} key={item.name}>
            <Card elevation={0} sx={{ borderRadius: 5 }}>
              <CardActionArea onClick={() => handleClickItem(item)}>
                <Box
                  sx={{
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    bgcolor: 'grey.300',
                    minHeight: 165,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    margin: '0 auto',
                  }}
                ></Box>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 500, px: 2, pt: 0.5 }}
                >
                  {item.name}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
      />
      {itemDetailsDialogOpen && (
        <GalleryItemDetails
          item={selectedItem}
          open={itemDetailsDialogOpen}
          handleClose={handleItemDetailsDialogToggle}
        />
      )}
    </Fragment>
  );
};

export default GalleryItems;
