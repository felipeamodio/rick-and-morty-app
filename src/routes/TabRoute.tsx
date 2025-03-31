import { Icon } from "@/components/Icon";
import { CharacteresScreen } from "@/pages/CharacteresScreen";
import { EpisodesScreen } from "@/pages/EpisodesScreen";
import { FavoritesScreen } from "@/pages/FavoritesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export function TabRoute() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          display: "flex", 
          backgroundColor: "#ffffff",
          height: 90,
          borderTopEndRadius: 28,
          borderTopStartRadius: 28,
          shadowColor: "#000",
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.6,
          shadowRadius: 8,
        },
        tabBarItemStyle: {
          paddingTop: 15
        }
      }}
    >
      <Tab.Screen
        name="Personagens"
        component={CharacteresScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon 
              name="character"
              size={35}
              color={focused ? "main" : "gray1"}
            />
          ),
          tabBarLabel: ""
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon 
              name="heart"
              size={35}
              color={focused ? "main" : "gray1"}
            />
          ),
          tabBarLabel: ""
        }}
      />
      <Tab.Screen
        name="Episódios"
        component={EpisodesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon 
              name="robot"
              size={35}
              color={focused ? "main" : "gray1"}
            />
          ),
          tabBarLabel: ""
        }}
      />
    </Tab.Navigator>
  );
}