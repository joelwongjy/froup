import { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { getAllModulesSummary } from '@actions/modules.ts';
import ModuleList from '@components/moduleList/ModuleList';
import Timetable from '@components/timetable/Timetable';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Module } from '@typings/modules';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(252, 56, 44)',
    background: 'rgb(255, 255, 255)',
  },
};

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [modules, setModules] = useState<Module[]>([]);
  useEffect(() => {
    getAllModulesSummary().then((modules) => {
      setModules(modules.slice(1100, 1150));
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <StatusBar style="auto" />
      <ModuleList modules={modules} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              let iconName;
              if (route.name === 'Modules') {
                iconName = focused ? 'ios-book' : 'ios-book-outline';
              } else if (route.name === 'Timetable') {
                iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
              } else if (route.name === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-home-outline';
              } else if (route.name === 'Friends') {
                iconName = focused ? 'ios-people' : 'ios-people-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
              }
              return <Ionicons color={color} name={iconName} size={32} />;
            },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              borderTopWidth: 0,
            },
          })}
        >
          <Tab.Screen component={Timetable} name="Home" />
          <Tab.Screen component={HomeScreen} name="Modules" />
          <Tab.Screen component={Timetable} name="Timetable" />
          <Tab.Screen component={Timetable} name="Friends" />
          <Tab.Screen component={Timetable} name="Profile" />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);
