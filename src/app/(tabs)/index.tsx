import { StyleSheet, Text, View } from 'react-native';
import Button from '@/components/Button';

export default function HomeScreen() {
  return (
    <View className='flex-1 p-4'>
      <Text className='text-3xl font-bold text-white p-2'>Hello world</Text>
      <Button />
    </View>
  );
}

