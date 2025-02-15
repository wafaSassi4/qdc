import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import axios from "axios";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { t } = useTranslation();
const menuItems = [
  {
    title: t("Edit_Name"),
    icon: {
      name: "account-edit",
      backgroundColor: colors.primary,
    },
    screen: "EditNameScreen",
  },
  {
    title: t("Edit_Password"),
    icon: {
      name: "account-key",
      backgroundColor: colors.secondary,
    },
    screen: "EditPassword",
  },
  {
    title: t("Modifier_Language"),
    icon: {
      name: "account-tie-outline",
      backgroundColor: colors.caramel,
    },
    screen: "ModifierLanguage",
  },
];

function Settings(props) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchFullname = async () => {
      try {
        const storedFullname = await AsyncStorage.getItem("fullname");
        if (storedFullname) {
          setFullname(storedFullname);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFullname();

    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmail();
  }, []);
  const navigation = useNavigation();

  const handleMenuItemPress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      t("Confirm_Logout"),
      t("Logout_Message"),
      [
        {
          text: t("logoutConfirmationCancel"),
          onPress: () => console.log("Déconnexion annulée"),
          style: "cancel",
        },
        {
          text: t("Yes"),
          onPress: async () => {
            try {
              const res = await axios.post(
                "https://gcrbjwsr-3000.euw.devtunnels.ms/user/logout"
              );
              if (res.status === 200) {
                await AsyncStorage.removeItem("userId");
                await AsyncStorage.removeItem("userToken");
                await AsyncStorage.removeItem("fullname");

                // Réinitialisez l'état de la navigation pour nettoyer l'historique de la pile
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              }
            } catch (error) {
              console.error("Erreur lors de la déconnexion", error);
              alert(t("Logout_Failed"));
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/a3.png")}
    >
      <Screen style={styles.screen}>
        <View style={styles.container}>
          <ListItem
            title={fullname}
            subtitle={email}
            image={require("../assets/pdp.jpg")}
          />
        </View>
        <View style={styles.container}>
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
          />
        </View>
        <ListItem
          title={t("Logout")}
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={handleLogout}
        />
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screen: {
    backgroundColor: colors.claire,
  },
  container: {
    marginVertical: 20,
  },
});

export default Settings;
