import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Pet } from '../Types';
import { Colors, Spacing, BorderRadius, FontSize } from '../Utils/theme';
import Button from "./Button";

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.md * 3) / 2;

interface PetCardProps {
  pet: Pet;
  onAddToCart: (pet: Pet) => void;
  onPress?: (pet: Pet) => void;
  inCart?: boolean;
}

const PetCard: React.FC<PetCardProps> = ({
  pet,
  onAddToCart,
  onPress,
  inCart = false,
}) => {
  const placeholder = `https://placedog.net/400/300?id=${pet.id}`;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.92}
      onPress={() => onPress?.(pet)}>
      <Image
        source={{ uri: pet.image ?? placeholder }}
        style={styles.image}
        resizeMode="cover"
      />
      {inCart && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>In Cart</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {pet.name}
        </Text>
        <Text style={styles.breed} numberOfLines={1}>
          {pet.breed}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{pet.price}</Text>
          <Button
            title="Add"
            onPress={() => onAddToCart(pet)}
            size="sm"
            style={styles.addBtn}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: CARD_WIDTH * 0.8,
    backgroundColor: Colors.border,
  },
  cartBadge: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.round,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  info: { padding: Spacing.sm },
  name: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  breed: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  price: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.primary,
  },
  addBtn: {
    width: 62,
    height: 32,
    borderRadius: BorderRadius.round,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default PetCard;
