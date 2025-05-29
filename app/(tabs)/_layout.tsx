import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/ui/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
// НИЧЕГО НЕ ТРОГАТЬ!!!!!!!!!!!!!!!!!!!!!!!! И ТАК НАХУЙ ЕЛЕ ЖИВЕТ

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4C82FF',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default:{
            height: 70,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={
          {
          title: 'Главная',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color}
          />,
        }}
      />
      <Tabs.Screen
        name="scen"
        options={{
          title: 'Сценарии',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
