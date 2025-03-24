import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

const stage1 = [
  { text: '1K Holders', done: false },
  { text: 'Presale launch', done: false },
  { text: 'Stage1 Marketing', done: false },
  { text: '1% Airdrop', done: false },
];

const stage2 = [
  { text: '3K Holders', done: false },
  { text: 'Add to DEX', done: false },
  { text: 'Stage2 Marketing', done: false },
];

const stage3 = [
  { text: 'Stage3 Marketing', done: false },
  { text: 'Add to CEX', done: false },
  { text: '1% Airdrop', done: false },
];

const stage4 = [
  { text: '5K Holders', done: false },
  { text: 'Staking pool launch', done: false },
  { text: 'Community Growth', done: false },
];

const stage5 = [
  { text: '10K Holders', done: false },
  { text: 'Ordering Reward Launch', done: false },
  { text: '1% Airdrop', done: false },
  { text: 'Go to the moon', done: false },
];

const stages = [
  { name: 'Phase I', phase: stage1, done: false },
  { name: 'Phase II', phase: stage2, done: false },
  { name: 'Phase III', phase: stage3, done: false },
  { name: 'Phase IV', phase: stage4, done: false },
  { name: 'Phase V', phase: stage5, done: false },
];

const RoadmapItemsRight = ({ items }) => {
  return (
    <Timeline>
      {items.map((item, i) => (
        <TimelineItem key={i}>
          <TimelineOppositeContent sx={{ display: 'none' }} />
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: 'grey.100' }} />
            <TimelineDot
              variant={item.done ? 'filled' : 'outlined'}
              sx={{ boxShadow: 'none' }}
            ></TimelineDot>
            <TimelineConnector sx={{ bgcolor: 'grey.100' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ m: 'auto 0' }}>
            <Typography variant="h6" component="span" sx={{ mb: 0 }}>
              {item.text}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

const RoadmapItemsLeft = ({ items }) => {
  return (
    <Timeline>
      {items.map((item, i) => (
        <TimelineItem key={i}>
          <TimelineOppositeContent sx={{ display: 'none' }} />
          <TimelineContent sx={{ m: 'auto 0' }}>
            <Typography variant="h6" component="span" sx={{ mb: 0 }}>
              {item.text}
            </Typography>
          </TimelineContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: 'grey.100' }} />
            <TimelineDot
              variant={item.done ? 'filled' : 'outlined'}
              sx={{ boxShadow: 'none' }}
            ></TimelineDot>
            <TimelineConnector sx={{ bgcolor: 'grey.100' }} />
          </TimelineSeparator>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

const Roadmap = () => {
  return (
    <Timeline position="alternate">
      {stages.map((phase, i) => (
        <TimelineItem key={i}>
          <TimelineOppositeContent sx={{ m: 'auto 0' }}>
            <Typography variant="h6" component="span" sx={{ mb: 0 }}>
              {phase.name}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: 'grey.100' }} />
            <TimelineDot
              sx={{ boxShadow: 'none' }}
              variant={phase.done ? 'filled' : 'outlined'}
            ></TimelineDot>
            <TimelineConnector sx={{ bgcolor: 'grey.100' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '15px' }}>
            {i % 2 === 0 ? (
              <RoadmapItemsRight items={phase.phase} />
            ) : (
              <RoadmapItemsLeft items={phase.phase} />
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

const RoadmapMobile = () => {
  return stages.map((phase, i) => (
    <Box key={i}>
      <Typography variant="h6" component="span">
        {phase.name}
      </Typography>
      <RoadmapItemsRight items={phase.phase} />
    </Box>
  ));
};

const RoadmapSection = () => {
  return (
    <Box sx={{ py: 7 }}>
      <Container>
        <Typography
          variant="h4"
          component="div"
          color="text.primary"
          sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
        >
          Roadmap
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, textAlign: 'center' }}>
          This Roadmap outlines our future plans
        </Typography>
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Roadmap />
        </Box>
        <Box
          sx={{
            display: { xs: 'block', sm: 'none' },
          }}
        >
          <RoadmapMobile />
        </Box>
      </Container>
    </Box>
  );
};

export default RoadmapSection;
