import { Image, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  description: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  photo: {
    height: 50,
    width: 50,
  },
});

export default function ModuleListRow({ title, moduleCode, image_url }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image_url }} style={styles.photo} />
      <View>
        <Text style={styles.title}>{moduleCode}</Text>
        <Text style={styles.description}>{title}</Text>
      </View>
    </View>
  );
}
