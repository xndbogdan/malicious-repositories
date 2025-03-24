import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CopyText = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleTooltipOpen = () => {
    setCopied(true);
  };

  const handleTooltipClose = () => {
    setCopied(false);
  };

  return (
    <CopyToClipboard text={text} onCopy={handleTooltipOpen}>
      <Tooltip title="Copied" open={copied} onClose={handleTooltipClose}>
        <IconButton>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  );
};

export default CopyText;
