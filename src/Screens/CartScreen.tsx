import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { usePetStore } from '../Store/usePetStore';
import CartItemCard from '../Components/CartItemCard';
import Button from '../Components/Button';
import { Colors, Spacing, BorderRadius, FontSize } from '../Utils/theme';
import Toast from 'react-native-toast-message';

const CartScreen = () => {
  const cart = usePetStore((s) => s.cart);
  const removeFromCart = usePetStore((s) => s.removeFromCart);
  const increaseQty = usePetStore((s) => s.increaseQty);
  const decreaseQty = usePetStore((s) => s.decreaseQty);
  const clearCart = usePetStore((s) => s.clearCart);
  const cartTotal = usePetStore((s) => s.cartTotal);
  const cartCount = usePetStore((s) => s.cartCount);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    Alert.alert(
      'Confirm Order',
      `Total: ${cartTotal().toFixed(2)}\nProceed to checkout?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Order Now',
          onPress: () => {
            clearCart();
            Toast.show({
              type: 'success',
              text1: 'Order Placed! 🎉',
              text2: 'Your pets are on the way!',
              visibilityTime: 3000,
            });
          },
        },
      ],
    );
  };

  const handleClearCart = () => {
    Alert.alert('Clear Cart', 'Remove all items?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => {
          clearCart();
          Toast.show({ type: 'info', text1: 'Cart Cleared' });
        },
      },
    ]);
  };

  if (cart.length === 0) {
    return (
      <View style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Your Cart</Text>
            <Text style={styles.count}>{cartCount()} items</Text>
          </View>
        }
        renderItem={({ item }) => (
          <CartItemCard
            item={item}
            onRemove={removeFromCart}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
          />
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            {/* Summary */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{cartTotal().toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={[styles.summaryValue, { color: Colors.success }]}>
                  FREE
                </Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{cartTotal().toFixed(2)}</Text>
              </View>
            </View>

            <Button
              title="Proceed to Checkout"
              onPress={handleCheckout}
              size="lg"
              style={styles.checkoutBtn}
            />
            <Button
              title="Clear Cart"
              onPress={handleClearCart}
              variant="outline"
              size="md"
              style={styles.clearBtn}
            />
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  count: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
  },

  footer: { marginTop: Spacing.lg },

  // Summary card
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  summaryLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: Spacing.xs,
    paddingTop: Spacing.sm,
  },
  totalLabel: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  totalValue: {
    fontSize: FontSize.xl,
    fontWeight: '900',
    color: Colors.primary,
  },

  checkoutBtn: { marginBottom: Spacing.sm },
  clearBtn: {},

  // Empty
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emptyIcon: { fontSize: 72, marginBottom: Spacing.md },
  emptyTitle: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  emptySub: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default CartScreen;
