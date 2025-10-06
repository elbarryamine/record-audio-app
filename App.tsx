import AudioUploadScreen from '@/screens/AudioUpload/Screen';
import RestyleProvider from '@/components/Providers/RestyleProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <RestyleProvider>
        <AudioUploadScreen />
      </RestyleProvider>
    </SafeAreaProvider>
  );
}
