import { FlatList, StyleSheet, View } from 'react-native';

import ModuleListRow from 'components/moduleListRow/ModuleListRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function ModuleList({ itemList }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={itemList}
        renderItem={({ item }) => (
          <ModuleListRow
            image_url={item.image_url}
            moduleCode={item.moduleCode}
            title={item.title}
          />
        )}
      />
    </View>
  );
}
