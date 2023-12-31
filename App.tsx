/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-11-06 22:23:26
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-11-19 19:40:53
 */
/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-10-08 21:28:36
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-11-19 19:36:55
 */
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from './src/router/index';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Router />
    </SafeAreaProvider>
    // <View>
    //   <Text>2</Text>
    // </View>
  );
}

export default App;
