import { useCallback, useState, useEffect } from 'react';
import { useAudioRecorder, useAudioRecorderState, AudioModule, RecordingPresets, setAudioModeAsync } from 'expo-audio';
import * as FileSystem from 'expo-file-system/legacy';
import { generateUniqueId } from '@/utils/generateUniqueId';

type AudioRecording = {
  id: string;
  uri: string;
  name: string;
  duration: number;
  loading: boolean;
  error: string | null;
};

const useAudioRecording = () => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const [currentRecording, setCurrentRecording] = useState<AudioRecording | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const generateRecordingName = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    return `Recording_${date}`;
  };

  // Initialize audio permissions and mode
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        const status = await AudioModule.requestRecordingPermissionsAsync();
        if (!status.granted) {
          console.error('Permission to access microphone was denied');
          return;
        }

        await setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: true,
        });
      } catch (error) {
        console.error('Failed to initialize audio:', error);
      }
    };

    initializeAudio();
  }, []);

  const startRecording = useCallback(async () => {
    try {
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  }, [audioRecorder]);

  const stopRecording = useCallback(async () => {
    try {
      await audioRecorder.stop();

      if (audioRecorder.uri) {
        const newRecording: AudioRecording = {
          id: generateUniqueId(),
          uri: audioRecorder.uri,
          name: generateRecordingName(),
          duration: 0, // You can get actual duration if needed
          loading: false,
          error: null,
        };

        setCurrentRecording(newRecording);
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  }, [audioRecorder]);

  const deleteRecording = useCallback(async () => {
    try {
      if (!currentRecording || !currentRecording.uri) return;

      // Delete the file from the file system
      await FileSystem.deleteAsync(currentRecording.uri, { idempotent: true });

      // Clear current recording
      setCurrentRecording(null);
    } catch (error) {
      console.error('Error deleting recording file:', error);
      // Still clear current recording even if file deletion fails
      setCurrentRecording(null);
    }
  }, [currentRecording]);

  const uploadRecording = useCallback(async (recording: AudioRecording) => {
    try {
      setIsUploading(true);
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Mock: Uploading recording', recording.id);
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return {
    // Recording state
    isRecording: recorderState.isRecording,
    currentRecording,
    isUploading,

    // Recording actions
    startRecording,
    stopRecording,
    deleteRecording,
    uploadRecording,
  };
};

export default useAudioRecording;
