import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import { supabase } from '@/lib/superbase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  const handleLogin = () => {
    if(!email || !password) {
        Alert.alert('Please enter an email and password');
        return;
    }

    try {
        signInWithEmail();
    } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Login error:', String(error));
    }
    setLoading(true);
    // Simulate async login
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <View className="flex-1 bg-black justify-center px-6">
      <Text className="text-white text-3xl font-bold mb-8 text-center">Welcome Back</Text>
      <TextInput
        className="bg-neutral-900 text-white px-4 py-3 rounded-lg mb-4"
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="bg-neutral-900 text-white px-4 py-3 rounded-lg mb-6"
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable
        className={`bg-white py-3 rounded-lg mb-4 ${loading ? 'opacity-60' : ''}`}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-black text-center font-semibold">Login</Text>
        )}
      </Pressable>
      <View className="flex-row justify-center mt-2">
        <Text className="text-neutral-400">Don't have an account? </Text>
        <Link href="/signup" className="text-white font-semibold">Sign up</Link>
      </View>
    </View>
  );
}