import { FlatList, StyleSheet, View } from 'react-native';
import ModuleListRow from '@components/moduleListRow/ModuleListRow';
import { Module } from '@typings/modules';

interface Props {
  modules: Module[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ModuleList = ({ modules }: Props) => {
  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#DBDCDF',
        height: 1,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={renderSeparator}
        data={modules}
        renderItem={({ item }) => (
          <ModuleListRow moduleCode={item.moduleCode} title={item.title} />
        )}
      />
    </View>
  );
};

export default ModuleList;
