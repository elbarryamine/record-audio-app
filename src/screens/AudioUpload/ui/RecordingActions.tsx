import React from 'react';
import Button from '@/components/Themed/Button';
import Stack from '@/components/Themed/Stack';
import Box from '@/components/Themed/Box';
import Text from '@/components/Themed/Text';
import MicIcon from '@/components/Icons/MicIcon';
import PlayIcon from '@/components/Icons/PlayIcon';

interface RecordingActionsProps {
  isRecording: boolean;
  hasRecorded: boolean;
  recordingName: string;
  isPlaying?: boolean;
  isUploading?: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onDeleteRecording: () => void;
  onPlayAudio: () => void;
  onUploadAudio: () => void;
}

const RecordingActions: React.FC<RecordingActionsProps> = ({
  isRecording,
  hasRecorded,
  recordingName,
  isPlaying = false,
  isUploading = false,
  onStartRecording,
  onStopRecording,
  onDeleteRecording,
  onPlayAudio,
  onUploadAudio,
}) => {
  if (isRecording || hasRecorded) {
    return (
      <Stack spacing='m' flex={1}>
        <Stack horizontal alignItems='center' justifyContent='center'>
          <Box
            backgroundColor={isRecording ? 'destructive' : 'primary'}
            width={40}
            height={40}
            borderRadius='l'
            alignItems='center'
            justifyContent='center'
            marginRight='m'
          >
            <MicIcon width={20} height={20} />
          </Box>
          <Text variant='body'>{isRecording ? 'Recording...' : recordingName}</Text>
        </Stack>
        {isRecording ? (
          <Button
            label='Stop'
            onPress={onStopRecording}
            variant='destructive'
            paddingHorizontal='m'
            paddingVertical='s'
          />
        ) : (
          <Stack horizontal spacing='s'>
            <Button
              flex={1}
              label={isPlaying ? 'Pause' : 'Play'}
              onPress={onPlayAudio}
              paddingHorizontal='m'
              paddingVertical='s'
              icon={<PlayIcon width={20} height={20} />}
            />

            <Button
              flex={1}
              label='Delete'
              onPress={onDeleteRecording}
              variant='destructive'
              paddingHorizontal='m'
              paddingVertical='s'
            />
          </Stack>
        )}
        {hasRecorded && (
          <Button
            mt='auto'
            label={isUploading ? 'Uploading...' : 'Upload Audio'}
            onPress={onUploadAudio}
            variant='primary'
            width='100%'
            loading={isUploading}
            disabled={isUploading}
          />
        )}
      </Stack>
    );
  }

  return <Button label='Start Recording' onPress={onStartRecording} variant='primary' width='100%' />;
};

export default RecordingActions;
