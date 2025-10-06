# Record Audio App

A React Native audio recording app with upload simulation and file management.

## Quick Start

```bash
npm install
npm start
# Scan QR code with Expo Go app
```

## Key Logic Locations

- **Recording/Upload/Delete Logic**: `src/hooks/useAudioRecording.ts`
- **UI Components**: `src/screens/AudioUpload/ui/`
- **Theme System**: `src/utils/theme.ts`

## Trade-offs

- **expo-audio vs expo-av**: Using newer `expo-audio` for better performance, but less mature ecosystem
- **File Management**: Using `expo-file-system/legacy` for broader compatibility
- **Upload Simulation**: Mock implementation for demo purposes - replace with real API
- **Single Recording**: Only one recording at a time to keep UI simple

## Key Functions & Line Numbers

### Microphone Permission

**File**: `src/hooks/useAudioRecording.ts`  
**Lines**: 30-44  
**Function**: `useEffect` with `AudioModule.requestRecordingPermissionsAsync()`

```typescript
const status = await AudioModule.requestRecordingPermissionsAsync();
if (!status.granted) {
  console.error('Permission to access microphone was denied');
  return;
}
```

### Start/Stop Recording

**File**: `src/hooks/useAudioRecording.ts`  
**Lines**: 46-58 (start), 60-77 (stop)  
**Functions**: `startRecording()`, `stopRecording()`

```typescript
// Start recording
const startRecording = useCallback(async () => {
  await audioRecorder.prepareToRecordAsync();
  audioRecorder.record();
}, [audioRecorder]);

// Stop recording & set as current recording
const stopRecording = useCallback(async () => {
  await audioRecorder.stop();
  if (audioRecorder.uri) {
    const newRecording: AudioRecording = {
      id: generateUniqueId(),
      uri: audioRecorder.uri,
      name: generateRecordingName(),
      duration: 0,
      loading: false,
      error: null,
    };
    setCurrentRecording(newRecording);
  }
}, [audioRecorder]);
```

### Mock Upload & Success/Fail Handling

**File**: `src/hooks/useAudioRecording.ts`  
**Lines**: 98-122  
**Function**: `uploadRecording()`

```typescript
const uploadRecording = useCallback(async (recording: AudioRecording) => {
  try {
    setIsUploading(true);
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Delete recording after upload
    deleteRecording();
    // Show fake success alert
    alert(`Audio "${recording.name}" uploaded successfully! and recording deleted`);
    return 'fake-filename.mp3';
  } catch (error) {
    // Show fake error alert
    alert('Upload failed. Please try again.');
    throw error;
  } finally {
    setIsUploading(false);
  }
}, []);
```

### Delete Local File

**File**: `src/hooks/useAudioRecording.ts`  
**Lines**: 79-96  
**Function**: `deleteRecording()`

```typescript
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
```
