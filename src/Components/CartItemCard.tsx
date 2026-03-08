import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartItem } from '../Types';
import { Colors, Spacing, BorderRadius, FontSize } from '../Utils/theme';

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  const placeholder = `https://placedog.net/200/200?id=${item.id}`;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image ?? placeholder }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.breed}>{item.breed}</Text>
          </View>
          <TouchableOpacity
            onPress={() => onRemove(item.id)}
            style={styles.removeBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.removeTxt}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>{(item.price * item.quantity).toFixed(2)}</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => onDecrease(item.id)}>
              <Text style={styles.qtyTxt}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => onIncrease(item.id)}>
              <Text style={styles.qtyTxt}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: 90,
    height: 90,
    backgroundColor: Colors.border,
  },
  content: {
    flex: 1,
    padding: Spacing.sm,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  breed: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  removeBtn: {
    padding: 4,
  },
  removeTxt: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
    fontWeight: '700',
  },
  bottomRow: {
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
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.round,
    paddingHorizontal: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyTxt: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
    lineHeight: 22,
  },
  qty: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    minWidth: 28,
    textAlign: 'center',
  },
});

export default CartItemCard;
