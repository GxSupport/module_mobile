import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Login} from './pages/login/Login.tsx';
import {getStorage} from './helpers/Storage.ts';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import '../global.css';
import {Tabs} from './(Tabs)';
import {Text} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const resToken = await getStorage('access_token');
        if (resToken) {
          setToken(resToken);
        }
      } catch (err) {
        console.log('Token olishda muammo bor', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {token ? (
          <>
            <Stack.Screen name="Main" component={Tabs} />
          </>
        ) : null}
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// export const Layout = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarShowLabel: false,
//         headerStyle: styles.headerStyle,
//         tabBarStyle: styles.tabBarStyle,
//       }}>
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           headerTitle: 'Mening kurslarim',
//           headerTitleAlign: 'center',
//           tabBarIcon: ({focused}) => (
//             <Icon
//               name="home"
//               className={`${
//                 focused ? '!text-colorSpecial' : '!text-colorText'
//               }`}
//               size={27}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Courses"
//         component={CourseList}
//         options={{
//           title: 'Courses',
//           headerTitleAlign: 'center',
//           tabBarIcon: ({focused}) => (
//             <Icon
//               name="add-circle-outline"
//               className={`${
//                 focused ? '!text-colorSpecial' : '!text-colorText'
//               }`}
//               size={27}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="UserProfile"
//         component={UserProfile}
//         options={{
//           title: 'Profile',
//           headerTitleAlign: 'center',
//           tabBarIcon: ({focused}) => (
//             <Icon
//               name="person-circle-outline"
//               className={`${
//                 focused ? '!text-colorSpecial' : '!text-colorText'
//               }`}
//               size={27}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };
//
// const styles = StyleSheet.create({
//   headerStyle: {
//     backgroundColor: 'white',
//     shadowColor: 'transparent',
//   },
//   tabBarStyle: {
//     backgroundColor: 'rgb(173,216,230)',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     height: 60,
//     paddingTop: 10,
//   },
// });
