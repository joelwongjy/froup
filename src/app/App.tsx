import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { useAppDispatch } from 'app/hooks';
import { store } from 'app/store';
import ModuleList from 'components/moduleList/ModuleList';
import { fetchAllModules } from 'reducers/modulesReducer';

function HomeScreen() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchModules = async () => {
      dispatch(fetchAllModules());
    };

    fetchModules().catch();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ModuleList itemList={modules} />
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
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen component={HomeScreen} name="Home" />
          <Tab.Screen component={DetailsScreen} name="Details" />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
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

export default App;
