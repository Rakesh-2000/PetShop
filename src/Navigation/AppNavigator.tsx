import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import AddPetScreen from '../Screens/AddPetScreen';
import CartScreen from '../Screens/CartScreen';
import { usePetStore } from '../Store/usePetStore';
import { Colors, FontSize } from '../Utils/theme';
import { TabParamList } from '../Types';
import Entypo from "react-native-vector-icons/Entypo"

const Tab = createBottomTabNavigator<TabParamList>();

const TabIcon = ({
  emoji,
  label,
  focused,
  badge,
}: {
  emoji: any;
  label: string;
  focused: boolean;
  badge?: number;
}) => (
  <View style={iconStyles.wrapper}>
    <View>
      <Text style={[iconStyles.emoji, focused && iconStyles.focused]}>
        {emoji}
      </Text>
      {badge != null && badge > 0 && (
        <View style={iconStyles.badge}>
          <Text style={iconStyles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
        </View>
      )}
    </View>
    <Text style={[iconStyles.label, focused && iconStyles.labelFocused]}>
      {label}
    </Text>
  </View>
);

const AppNavigator = () => {
  const cartCount = usePetStore((s) => s.cartCount);
  const count = cartCount();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
            elevation: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            height: 72,
            paddingBottom: 10,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji={<Entypo name={"home"} size={24}/>} label="Home" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="AddPet"
          component={AddPetScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  backgroundColor: Colors.primary,
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                  shadowColor: Colors.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  elevation: 8,
                }}>
                <Text style={{ fontSize: 26 }}>+</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji={<Entypo name={"shopping-cart"} size={24}/>} label="Cart" focused={focused} badge={count} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;


const iconStyles = StyleSheet.create({
  wrapper: { alignItems: 'center', justifyContent: 'center', paddingTop: 4 },
  emoji: { fontSize: 22, opacity: 0.5 },
  focused: { opacity: 1 },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textLight,
    marginTop: 2,
  },
  labelFocused: { color: Colors.primary },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
});