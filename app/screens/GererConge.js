import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import { useTranslation } from 'react-i18next';


const { t } = useTranslation(); 
const menuItems = [
  {
    title: t("Leave_Request"),
    icon: {
      name: "account-plus",
      backgroundColor: colors.medium,
    },
    screen: "DemandeConge",
  },
  {
    title: t("Modify_Leave"),
    icon: {
      name: "account-wrench",
      backgroundColor: colors.medium,
    },
    screen: "ModifierConge",
  },
  {
    title: t("Cancel_Leave"),
    icon: {
      name: "account-remove",
      backgroundColor: colors.red,
    },
    screen: "SupprimerConge",
  },
];

function GererConge(props) {
  const navigation = useNavigation();

  const handleMenuItemPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/a3.png")}
    >
      <Screen>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <ListItem
                onPress={() => handleMenuItemPress(item.screen)}
                title={item.title}
                IconComponent={
                  <Icon
                    name={item.icon.name}
                    backgroundColor={item.icon.backgroundColor}
                  />
                }
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.container}
        />
        <Image
          style={styles.Image}
          source={require("../assets/bonTravail1.png")}
        />
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
  },
  container: {
    paddingVertical: 30,
  },
  Image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 150,
  },
});

export default GererConge;
