import React from 'react';
import Box from '@/components/Themed/Box';
import Text from '@/components/Themed/Text';
import MicIcon from '@/components/Icons/MicIcon';

interface RecordingMicProps {
  isRecording: boolean;
  hasRecorded: boolean;
}

const RecordingMic: React.FC<RecordingMicProps> = ({ isRecording, hasRecorded }) => {
  const getMicText = () => {
    if (isRecording) return 'Recording...';
    if (hasRecorded) return 'Recording saved';
    return 'Ready to record';
  };

  const getInstructionText = () => {
    if (isRecording) return 'Tap stop or pause to control recording';
    if (hasRecorded) return 'You can upload or record again';
    return 'Tap start to begin recording';
  };

  return (
    <Box alignItems='center' justifyContent='center'>
      <Box
        backgroundColor={isRecording ? 'destructive' : 'primary'}
        width={100}
        height={100}
        borderRadius='l'
        alignItems='center'
        justifyContent='center'
        marginBottom='l'
      >
        <MicIcon width={40} height={40} />
      </Box>

      <Text variant='body' textAlign='center' marginBottom='s'>
        {getMicText()}
      </Text>
      <Text variant='muted' textAlign='center'>
        {getInstructionText()}
      </Text>
    </Box>
  );
};

export default RecordingMic;
