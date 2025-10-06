import React, { useState, useEffect } from 'react';
import Box from '@/components/Themed/Box';
import Stack from '@/components/Themed/Stack';
import SafeAreaView from '@/components/Themed/SafeAreaView';
import RecordingHeader from './ui/RecordingHeader';
import RecordingMic from './ui/RecordingMic';
import RecordingActions from './ui/RecordingActions';
import useAudioRecording from '@/hooks/useAudioRecording';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

const AudioUploadScreen: React.FC = () => {
  const {
    isRecording,
    currentRecording,
    isUploading,
    startRecording,
    stopRecording,
    deleteRecording,
    uploadRecording,
    clearCurrentRecording,
  } = useAudioRecording();

  const [audioSource, setAudioSource] = useState<string | null>(null);
  const audioPlayer = useAudioPlayer(audioSource);
  const playerStatus = useAudioPlayerStatus(audioPlayer);

  const hasRecorded = !!currentRecording;

  // Update audio source when current recording changes
  useEffect(() => {
    if (currentRecording?.uri) {
      setAudioSource(currentRecording.uri);
    } else {
      setAudioSource(null);
    }
  }, [currentRecording]);

  const handleStartRecording = async () => {
    await startRecording();
  };

  const handleStopRecording = async () => {
    await stopRecording();
  };

  const handleDeleteRecording = () => {
    if (currentRecording) {
      deleteRecording(currentRecording.id);
      clearCurrentRecording();
    }
  };

  const handlePlayAudio = () => {
    if (audioPlayer && currentRecording) {
      try {
        if (playerStatus.playing) {
          audioPlayer.pause();
        } else {
          audioPlayer.play();
        }
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  const handleUploadAudio = async () => {
    if (currentRecording) {
      try {
        await uploadRecording(currentRecording);
        // Handle successful upload
        console.log('Audio uploaded successfully');
      } catch (error) {
        console.error('Upload failed:', error);
        // Handle upload error
      }
    }
  };

  return (
    <SafeAreaView>
      <Box flex={1} backgroundColor='background' padding='l'>
        <Stack spacing='xl' flex={1}>
          <RecordingHeader isRecording={isRecording} hasRecorded={hasRecorded} />

          <RecordingMic isRecording={isRecording} hasRecorded={hasRecorded} />

          <Stack flex={1} justifyContent='space-between'>
            <RecordingActions
              isRecording={isRecording}
              hasRecorded={hasRecorded}
              recordingName={currentRecording?.name || ''}
              isPlaying={playerStatus.playing}
              isUploading={isUploading}
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopRecording}
              onDeleteRecording={handleDeleteRecording}
              onPlayAudio={handlePlayAudio}
              onUploadAudio={handleUploadAudio}
            />
          </Stack>
        </Stack>
      </Box>
    </SafeAreaView>
  );
};

export default AudioUploadScreen;
