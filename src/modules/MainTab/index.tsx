/* eslint-disable react/no-unstable-nested-components */

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

const BottomTab = createBottomTabNavigator();

import Home from '../home/index';
import Shop from '../shop/index';
import Message from '../message/index';
import Mine from '../mine/index';

import icon_tab_publish from '../../assets/icon_tab_publish.png';

export default () => {
  const RedBookTabBar = ({state, descriptors, navigation}: any) => {
    const {routes, index} = state;
    const onPublishPress = () => {
      console.log('输出22222', 222);
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
          includeBase64: true,
        },
        (res: ImagePickerResponse) => {
          const {assets} = res;
          if (!assets?.length) {
            console.log('选择图片失败');
            return;
          }
          const {uri, width, height, fileName, fileSize, type} = assets[0];
          console.log(`uri=${uri}, width=${width}, height=${height}`);
          console.log(
            `fileName=${fileName}, fileSize=${fileSize}, type=${type}`,
          );
        },
      );
    };
    return (
      <View style={styles.tabBarContainer}>
        {routes.map((route: any, i: number) => {
          const {options} = descriptors[route.key];
          const label = options.title;
          const isFocused = index === i;
          if (i === 2) {
            return (
              <TouchableOpacity
                key={label}
                style={styles.tabItem}
                onPress={onPublishPress}>
                <Image
                  source={icon_tab_publish}
                  style={styles.icon_tab_publish}
                />
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                key={label}
                style={styles.tabItem}
                onPress={() => {
                  navigation.navigate(route.name);
                }}>
                <Text
                  style={{
                    fontSize: isFocused ? 18 : 16,
                    color: isFocused ? '#333' : '#999',
                    fontWeight: isFocused ? 'bold' : 'normal',
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <BottomTab.Navigator tabBar={props => <RedBookTabBar {...props} />}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            title: '首页',
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="Shop"
          component={Shop}
          options={{
            title: '购物',
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="Publish"
          component={Shop}
          options={{
            title: '发布',
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="Message"
          component={Message}
          options={{
            title: '消息',
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="Mine"
          component={Mine}
          options={{
            title: '我',
            headerShown: false,
          }}
        />
      </BottomTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  tabBarContainer: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabItem: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_tab_publish: {
    width: 58,
    height: 42,
    resizeMode: 'contain',
  },
});
