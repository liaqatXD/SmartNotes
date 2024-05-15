import { Stack } from 'expo-router';

export default function NotebookLayout() {
  return (
    <Stack>
      <Stack.Screen name="[note]" options={{headerShown:false}} />
    </Stack>
  );
}
