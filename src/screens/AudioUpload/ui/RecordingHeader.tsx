import React from 'react';
import Box from '@/components/Themed/Box';
import Text from '@/components/Themed/Text';

interface RecordingHeaderProps {
  isRecording: boolean;
  hasRecorded: boolean;
}

const RecordingHeader: React.FC<RecordingHeaderProps> = ({ isRecording, hasRecorded }) => {
  const getStatusText = () => {
    if (isRecording) return 'Recording in progress...';
    if (hasRecorded) return 'Recording completed';
    return 'Ready to record';
  };

  return (
    <Box alignItems='center'>
      <Text variant='header' textAlign='center' marginBottom='s'>
        Voice Recording
      </Text>
      <Text variant='muted' textAlign='center'>
        {getStatusText()}
      </Text>
    </Box>
  );
};

export default RecordingHeader;
