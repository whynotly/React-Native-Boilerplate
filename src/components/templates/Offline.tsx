import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { recheckOnlineStatus } from '../../../api/handlers/offlineHandler';
import theme from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[4],
    backgroundColor: theme.colors.base.white,
  },
  title: {
    marginBottom: theme.spacing[6],
    marginHorizontal: 40,
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '600',
    color: theme.colors.gray[900],
  },
  description: {
    marginBottom: theme.spacing[6],
    fontSize: 17,
    textAlign: 'center',
    color: theme.colors.gray[700],
    marginHorizontal: theme.spacing[10],
  },
  icon: {
    marginBottom: theme.spacing[4],
    marginTop: -theme.spacing[8],
  },
  listContainer: {
    marginHorizontal: theme.spacing[8],
    marginTop: 8,
    borderRadius: 10,
    padding: theme.spacing[4],
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    width: 300,
  },
  listIcon: {
    marginRight: theme.spacing[3],
  },
  listText: {
    fontSize: 16,
    color: theme.colors.gray[700],
    flexShrink: 1,
  },
  recheckButton: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
const Offline = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Icon
        name="cloud-off-outline"
        size={60}
        color={theme.colors.error[500]}
        style={styles.icon}
      />
      <Text style={styles.title}>Не сте поврзани на интернет</Text>
      <Text style={styles.description}>
        Неможете да ја користете Park+ без интернет проверте дали:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Icon
            name="wifi-off"
            size={28}
            color={theme.colors.primary[500]}
            style={styles.listIcon}
          />
          <Text style={styles.listText}>
            Проверете дали сте поврзани на интернет
          </Text>
        </View>
        <View style={styles.listItem}>
          <Icon
            name="help-circle"
            size={28}
            color={theme.colors.primary[500]}
            style={styles.listIcon}
          />
          <Text style={styles.listText}>
            Платете за паркинг кај наблискиот вработен од паркинг.
          </Text>
        </View>
        <View style={styles.listItem}>
          <Icon
            name="access-point-check"
            size={28}
            color={theme.colors.primary[500]}
            style={styles.listIcon}
          />
          <Text style={styles.listText}>
            Проверете дали системите на Парк+ се активни
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.recheckButton}
          onPress={() => recheckOnlineStatus()}
        >
          <Text style={styles.buttonText}>Провери повторно</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Offline;
