import {
  SearchBase,
  SearchBox,
  SearchComponent,
} from '@appbaseio/react-native-searchbox';
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const renderResultItem = ({ item }) => {
  return (
    <View style={styles.itemStyle}>
      <Image
        style={styles.image}
        source={{
          uri: item.image,
        }}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.textStyle}>{item.original_title}</Text>
        <Text style={styles.textStyle}>by {item.authors}</Text>
        <View style={styles.star}>
          {Array(item.average_rating_rounded)
            .fill('x')
            .map((i, index) => (
              <AntDesign
                key={`${item._id}_${index}`}
                name="star"
                size={24}
                color="gold"
              />
            ))}
          <Text style={styles.rating}>({item.average_rating} avg)</Text>
        </View>
        <Text>Pub {item.original_publication_year}</Text>
      </View>
    </View>
  );
};

const renderItemSeparator = () => {
  return (
    // Flat List Item Separator
    <View style={styles.itemSeparator} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loader: {
    marginTop: 50,
  },
  itemSeparator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  image: {
    width: 100,
    marginRight: 10,
  },
  itemStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    height: 170,
  },
  star: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  textStyle: {
    flexWrap: 'wrap',
    paddingBottom: 5,
  },
  resultStats: {
    padding: 10,
  },
  rating: {
    marginLeft: 10,
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBase
        index="good-books-ds"
        credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
        url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
        appbaseConfig={{
          recordAnalytics: true,
          enableQueryRules: true,
          userId: 'jon3@appbase.io',
          customEvents: {
            platform: 'ios',
            device: 'iphoneX',
          },
        }}
      >
        <SearchBox
          id="search-component"
          dataField={[
            {
              field: 'original_title',
              weight: 1,
            },
            {
              field: 'original_title.search',
              weight: 3,
            },
          ]}
          renderNoSuggestion={() => <Text>No suggestions found</Text>}
          // autosuggest={false}
          enableRecentSearches
          // showAutoFill={false}
          // enablePopularSuggestions
          goBackIcon={(props) => <Ionicons {...props} />}
          autoFillIcon={(props) => <Feather name="arrow-up-left" {...props} />}
          recentSearchIcon={(props) => (
            <MaterialIcons name="history" {...props} />
          )}
          searchBarProps={{
            // platform: 'android'
            searchIcon: (props) => <MaterialIcons name="search" {...props} />,
            clearIcon: (props) => <MaterialIcons name="clear" {...props} />,
          }}
        />
        <SearchComponent
          id="result-component"
          dataField="original_title"
          size={10}
          react={{
            and: ['search-component', 'author-filter'],
          }}
          preserveResults
        >
          {({ results, loading, size, from, setValue, setFrom }) => {
            return (
              <View>
                {loading && !results.data.length ? (
                  <ActivityIndicator
                    style={styles.loader}
                    size="large"
                    color="#000"
                  />
                ) : (
                  <View>
                    {!results.data.length ? (
                      <Text style={styles.resultStats}>No results found</Text>
                    ) : (
                      <View>
                        <Text style={styles.resultStats}>
                          {results.numberOfResults} results found in{' '}
                          {results.time}ms
                        </Text>
                        <FlatList
                          data={results.data}
                          keyboardShouldPersistTaps="handled"
                          keyExtractor={(item) => item._id}
                          ItemSeparatorComponent={renderItemSeparator}
                          renderItem={renderResultItem}
                          estimatedItemSize={100}
                          onEndReached={() => {
                            const offset = (from || 0) + size;
                            if (results.numberOfResults > offset) {
                              setFrom((from || 0) + size);
                            }
                          }}
                          onEndReachedThreshold={0.5}
                          ListFooterComponent={
                            loading ? (
                              <ActivityIndicator size="large" color="#000" />
                            ) : null
                          }
                        />
                      </View>
                    )}
                  </View>
                )}
              </View>
            );
          }}
        </SearchComponent>
      </SearchBase>
    </SafeAreaView>
  );
}
