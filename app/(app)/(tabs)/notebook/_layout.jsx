import { Stack } from 'expo-router';
// import { useColorScheme } from "nativewind";

export default function NotebookLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}} />
      <Stack.Screen name="[notebook]" options={{headerShown:false}} />
    </Stack>
  );
}
