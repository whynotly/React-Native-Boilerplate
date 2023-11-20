import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '@/pages/main/Home';

const Stack = createNativeStackNavigator();

const Main = () => {
  const pages = [{ name: 'Home', component: Home }];

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome"
    >
      {pages.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default Main;
