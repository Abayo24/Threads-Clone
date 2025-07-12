import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import { supabase } from '@/lib/superbase';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({email: email,password: password});

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
  }

  const handleSignup = () => {
    if(!email || !password) {
        Alert.alert('Please enter an email and password');
        return;
    }
    try{
        signUpWithEmail();
    } catch (error) {
        console.error('Login error:', error);
    }
    finally{
        setLoading(false);
    }
    
  };

  return (
    <View className="flex-1 bg-black justify-center px-6">
      <Text className="text-white text-3xl font-bold mb-8 text-center">Create an Account</Text>
      
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
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-black text-center font-semibold">Sign Up</Text>
        )}
      </Pressable>
      <View className="flex-row justify-center mt-2">
        <Text className="text-neutral-400">Already have an account? </Text>
        <Link href="/login" className="text-white font-semibold">Login</Link>
      </View>
    </View>
  );
}