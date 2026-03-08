import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { usePetStore } from '../Store/usePetStore';
import { useFetchDogImage } from '../hooks/useApi';
import PetCard from '../Components/PetCard';
import { Pet } from '../Types';
import { Colors, Spacing, BorderRadius, FontSize } from '../Utils/theme';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const pets = usePetStore((s) => s.pets);
  const cart = usePetStore((s) => s.cart);
  const addToCart = usePetStore((s) => s.addToCart);
  const randomDogImage = usePetStore((s) => s.randomDogImage);
  const isFetchingDogImage = usePetStore((s) => s.isFetchingDogImage);
  const { fetchDogImage, error: dogError } = useFetchDogImage();

  useEffect(() => {
    fetchDogImage();
  }, []);

  useEffect(() => {
    if (dogError) {
      Toast.show({ type: 'error', text1: 'Image Error', text2: dogError });
    }
  }, [dogError]);

  const handleAddToCart = useCallback(
    (pet: Pet) => {
      addToCart(pet);
      Toast.show({
        type: 'success',
        text1: 'Added to Cart 🐾',
        text2: `${pet.name} was added to your cart`,
        visibilityTime: 2000,
      });
    },
    [addToCart],
  );

  const cartIds = new Set(cart.map((c) => c.id));

  const renderHeader = () => (
    <View>

      <View style={styles.section}>
        <View style={styles.dogCard}>
          {isFetchingDogImage ? (
            <View style={styles.dogPlaceholder}>
              <ActivityIndicator color={Colors.primary} size="large" />
              <Text style={styles.loadingTxt}>Loading</Text>
            </View>
          ) : randomDogImage ? (
            <Image
              source={{ uri: randomDogImage }}
              style={styles.dogImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.dogPlaceholder}>
              <Text style={styles.placeholderTxt}>Tap Refresh to load 🐕</Text>
            </View>
          )}
        </View>
        <Text style={{textAlign:"center", marginTop:20}}>Pull down to refresh</Text>
      </View>

      {/* Pets Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Available Pets</Text>
        <Text style={styles.countTxt}>{pets.length} pets</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.primary} />
        <View style={styles.hero}>
        <View style={styles.heroText}>
          <Text style={styles.heroTitle}>Find Your Perfect Pet</Text>
        </View>
      </View>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTxt}>No pets yet. Add one! 🐾</Text>
          </View>
        }
        renderItem={({ item }) => (
          <PetCard
            pet={item}
            onAddToCart={handleAddToCart}
            inCart={cartIds.has(item.id)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingDogImage}
            onRefresh={fetchDogImage}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md, paddingBottom: Spacing.xl },

  // Hero
  hero: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  heroText: {},
  heroTitle: {
    fontSize: FontSize.xl,
    fontWeight: '900',
    color: '#fff',
    lineHeight: 38,
  },
  heroSub: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.8)',
    marginTop: Spacing.xs,
  },

  // Dog section
  section: { marginBottom: Spacing.lg },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  countTxt: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  refreshBtn: {
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.round,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  refreshTxt: {
    color: '#fff',
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  dogCard: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  dogImage: {
    width: '100%',
    height: 170,
  },
  dogPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.border,
  },
  loadingTxt: {
    marginTop: Spacing.sm,
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  placeholderTxt: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },

  // Grid
  row: { justifyContent: 'space-between' },
  empty: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  emptyTxt: {
    color: Colors.textSecondary,
    fontSize: FontSize.lg,
  },
});

export default HomeScreen;
