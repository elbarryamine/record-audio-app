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
  const [recordings, setRecordings] = useState<AudioRecording[]>([]);
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

        setRecordings((prev) => [...prev, newRecording]);
        setCurrentRecording(newRecording);
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  }, [audioRecorder]);

  const deleteRecording = useCallback(
    async (id: string) => {
      try {
        // Find the recording to get its URI
        const recordingToDelete = recordings.find((rec) => rec.id === id);
        if (!recordingToDelete?.uri) return;

        // Delete the file from the file system using
        await FileSystem.deleteAsync(recordingToDelete.uri, { idempotent: true });

        // Remove from recordings list
        setRecordings((prev) => prev.filter((rec) => rec.id !== id));

        // Clear current recording if it's the one being deleted
        if (currentRecording?.id === id) {
          setCurrentRecording(null);
        }
      } catch (error) {
        console.error('Error deleting recording file:', error);
        // Still remove from state even if file deletion fails
        setRecordings((prev) => prev.filter((rec) => rec.id !== id));
        if (currentRecording?.id === id) {
          setCurrentRecording(null);
        }
      }
    },
    [currentRecording, recordings]
  );

  const uploadRecording = useCallback(
    async (recording: AudioRecording) => {
      try {
        setIsUploading(true);
        const index = recordings.findIndex((rec) => rec.id === recording.id);
        if (index === -1) return;

        // Update loading state
        setRecordings((prev) => {
          const updated = [...prev];
          updated[index] = { ...updated[index], loading: true, error: null };
          return updated;
        });

        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Update success state
        setRecordings((prev) => {
          const updated = [...prev];
          updated[index] = { ...updated[index], loading: false, error: null };
          return updated;
        });

        // Show fake success alert
        alert(`Audio "${recording.name}" uploaded successfully!`);

        return 'fake-filename.mp3';
      } catch (error) {
        console.error('Upload error:', error);

        // Update error state
        setRecordings((prev) => {
          const updated = [...prev];
          const index = updated.findIndex((rec) => rec.id === recording.id);
          if (index !== -1) {
            updated[index] = { ...updated[index], loading: false, error: 'Upload failed' };
          }
          return updated;
        });

        // Show fake error alert
        alert('Upload failed. Please try again.');

        throw error;
      } finally {
        setIsUploading(false);
      }
    },
    [recordings]
  );

  const clearCurrentRecording = useCallback(() => {
    setCurrentRecording(null);
  }, []);

  return {
    // Recording state
    isRecording: recorderState.isRecording,
    currentRecording,
    recordings,
    isUploading,

    // Recording actions
    startRecording,
    stopRecording,
    deleteRecording,
    uploadRecording,
    clearCurrentRecording,
  };
};

export default useAudioRecording;
