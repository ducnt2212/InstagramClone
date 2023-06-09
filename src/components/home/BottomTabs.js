import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Divider} from '@rneui/themed';

function BottomTabs({icons}) {
  const [activeTab, setActiveTab] = useState('Home');

  function Icon({icon}) {
    return (
      <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
        <Image
          style={[
            styles.icon,
            icon.name === 'Profile' ? styles.profilePic() : null,
            activeTab === 'Profile' && icon.name === activeTab
              ? styles.profilePic(activeTab)
              : null,
          ]}
          source={{uri: activeTab === icon.name ? icon.active : icon.inactive}}
        />
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
}

export default BottomTabs;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#000',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingTop: 10,
  },

  icon: {
    width: 30,
    height: 30,
  },

  profilePic: (activeTab = '') => ({
    borderRadius: 15,
    borderWidth: activeTab === 'Profile' ? 2 : 0,
    borderColor: '#fff',
  }),
});

export const bottomTabIcons = [
  {
    name: 'Home',
    active: 'https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png',
    inactive:
      'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png',
  },
  {
    name: 'Search',
    active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
    inactive: 'https://img.icons8.com/ios/500/ffffff/search--v1.png',
  },
  {
    name: 'Reels',
    active: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png',
    inactive: 'https://img.icons8.com/ios/500/ffffff/instagram-reel.png',
  },
  {
    name: 'Shop',
    active:
      'https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png',
    inactive:
      'https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png',
  },
  {
    name: 'Profile',
    active:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxg8FaiJuHqcJXaKnC5TjnVTDK-5a21rRlOA&usqp=CAU',
    inactive:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxg8FaiJuHqcJXaKnC5TjnVTDK-5a21rRlOA&usqp=CAU',
  },
];
