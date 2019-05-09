import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

import BottomNavigation, {
  FullTab
} from "react-native-material-bottom-navigation";

export default class BotonNavigation extends Component {
  tabs = [
    {
      key: "home",
      icon: "compass-outline",
      iconActive: "compass",
      typeIcon: "material-community",
      label: "Inicio",
      barColor: "#fff",
      pressColor: "#00a680"
    },
    {
      key: "top-5",
      icon: "star-outline",
      iconActive: "star",
      typeIcon: "material-community",
      label: "Top 5",
      barColor: "#fff",
      pressColor: "#00a680"
    },
    {
      key: "search",
      icon: "magnify",
      iconActive: "magnify",
      typeIcon: "material-community",
      label: "Buscar",
      barColor: "#fff",
      pressColor: "#00a680"
    },
    {
      key: "my-account",
      icon: "account-outline",
      iconActive: "account",
      typeIcon: "material-community",
      label: "Mi Cuenta",
      barColor: "#fff",
      pressColor: "#00a680"
    }
  ];

  renderIcon = (icon, typeIcon, colorIcon) => ({ isActive }) => (
    <Icon size={24} color={colorIcon} type={typeIcon} name={icon} />
  );

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(
        isActive ? tab.iconActive : tab.icon,
        tab.typeIcon,
        isActive ? "#00a680" : "#646464"
      )}
      labelStyle={
        isActive ? styles.bottonMenuTextActive : styles.buttonMenuText
      }
    />
  );

  render() {
    return (
      <BottomNavigation
        onTabPress={newTab => this.setState({ activeTab: newTab.key })}
        renderTab={this.renderTab}
        tabs={this.tabs}
      />
    );
  }
}

const styles = StyleSheet.create({
  buttonMenuText: {
    color: "#646464",
    fontSize: 10,
    fontWeight: "100"
  },
  bottonMenuTextActive: {
    color: "#00a680",
    fontSize: 10,
    fontWeight: "100"
  }
});
