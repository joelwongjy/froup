import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getAllModulesSummary } from '@actions/modules.ts';
import ModuleList from '@components/moduleList/ModuleList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Module } from '@typings/modules';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';

function HomeScreen() {
  const [modules, setModules] = useState<Module[]>([]);
  useEffect(() => {
    getAllModulesSummary().then((modules) => {
      setModules(modules.slice(1100, 1150));
    }
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ModuleList modules={modules} />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen component={HomeScreen} name="Modules" />
        <Tab.Screen component={DetailsScreen} name="Details" />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default registerRootComponent(App);
