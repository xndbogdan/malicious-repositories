import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import certik from 'assets/images/partners/certik.svg';
import binancechain from 'assets/images/partners/binancechain.svg';
import coinmarketcap from 'assets/images/partners/coinmarketcap.svg';
import fairyproof from 'assets/images/partners/fairyproof.png';

const partners = [
  { label: 'binancechain', src: binancechain },
  { label: 'coinmarketcap', src: coinmarketcap },
  { label: 'certik', src: certik },
  { label: 'fairyproof', src: fairyproof, width: 150 },
];

const PartnersSection = () => {
  return (
    <Container sx={{ pb: 5, mb: 5 }} className="fadeInUp">
      <Grid container rowSpacing={4} columnSpacing={2} alignItems="center" justifyContent="center">
        {partners.map((partner, i) => (
          <Grid item xs={6} sm={4} md={2} key={i} sx={{ textAlign: 'center' }}>
            <a
              href={partner.href}
              target="_blank"
              rel="noreferrer"
              style={{ filter: 'grayscale(100%)' }}
            >
              <img src={partner.src} alt={partner.label} width={partner.width || 160} />
            </a>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PartnersSection;
