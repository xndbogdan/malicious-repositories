import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import MediumIcon from '../../ui/icons/Medium';

const data = [
  { label: 'Swap rate', value: '1 ELO=TBD $' },
  { label: 'Cap', value: '5,000,000,000' },
  { label: 'Access', value: 'Private' },
];

const BSCPadSocialLinks = [
  {
    label: 'Website',
    icon: <LanguageIcon />,
    href: 'https://bscpad.com/',
  },
  {
    label: 'Twitter',
    icon: <TwitterIcon />,
    href: 'https://twitter.com/bscpad',
  },
  {
    label: 'Telegram',
    icon: <TelegramIcon />,
    href: 'https://t.me/bscpad',
  },
];

const ETHPadSocialLinks = [
  {
    label: 'Website',
    icon: <LanguageIcon />,
    href: 'https://ethpad.network/',
  },
  {
    label: 'Twitter',
    icon: <TwitterIcon />,
    href: 'https://twitter.com/ethpadofficial',
  },
  {
    label: 'Telegram',
    icon: <TelegramIcon />,
    href: 'https://t.me/ethpad',
  },
  {
    label: 'Medium',
    icon: <MediumIcon />,
    href: 'https://medium.com/@ethpad',
  },
];

const hostings = [
  {
    name: 'BSCPad',
    socialLinks: BSCPadSocialLinks,
  },
  {
    name: 'ETHPad',
    socialLinks: ETHPadSocialLinks,
  },
];

const CardLabel = ({ text }) => {
  return (
    <Typography color="text.secondary" sx={{ fontWeight: 500 }} variant="body1" display="block">
      {text}
    </Typography>
  );
};

const CardValue = ({ text }) => {
  return (
    <Typography color="text.primary" sx={{ fontWeight: 500, textAlign: 'right' }}>
      {text}
    </Typography>
  );
};

const PhaseII = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {hostings.map((h, i) => (
        <Grid item xs={12} md={6} key={i}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 10,
              p: 1,
              boxShadow: '0 2px 16px rgb(53 69 89 / 5%)',
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Buy at {h.name}
              </Typography>
              <Stack direction="row" spacing={2} my={1}>
                {h.socialLinks.map((link) => (
                  <IconButton
                    component="a"
                    href={link.href}
                    target="_blank"
                    aria-label={link.label}
                    key={link.label}
                  >
                    {link.icon}
                  </IconButton>
                ))}
              </Stack>
              <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                Opens in TBD
              </Typography>
              <Chip label="BUSD" sx={{ fontWeight: 500, px: 1, mb: 4 }} />
              {data.map((item, idx) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.5}
                  key={idx}
                >
                  <CardLabel text={item.label} />
                  <CardValue text={item.value} />
                </Stack>
              ))}
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PhaseII;
