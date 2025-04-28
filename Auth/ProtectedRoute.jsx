import React from 'react';
import { useAuth } from './AuthContext';
import { View, Text, ActivityIndicator, Button } from 'react-native';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>You need to login to access this page</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button title="Logout" onPress={logout} />
      </View>
      {children}
    </View>
  );
};

export default ProtectedRoute;