import 'package:flutter_bloc/flutter_bloc.dart';
import '../view/cart_item_data.dart';

class CartState {
  final List<CartItemData> cartItems;
  final double totalValue;

  CartState({
    required this.cartItems,
    required this.totalValue,
  });

  CartState.initial() : 
    cartItems = [],
    totalValue = 0.0;

  CartState copyWith({
    List<CartItemData>? cartItems,
    double? totalValue,
  }) {
    return CartState(
      cartItems: cartItems ?? this.cartItems,
      totalValue: totalValue ?? this.totalValue,
    );
  }
}

class CartCubit extends Cubit<CartState> {
  CartCubit() : super(CartState.initial());

  void addToCart(CartItemData item) {
    final existingItemIndex = state.cartItems
        .indexWhere((cartItem) => cartItem.title == item.title);

    if (existingItemIndex != -1) {
      // If item exists, increment its count
      final updatedItems = List<CartItemData>.from(state.cartItems);
      updatedItems[existingItemIndex].count += 1;
      _updateState(updatedItems);
    } else {
      // If item doesn't exist, add it
      final updatedItems = List<CartItemData>.from(state.cartItems)..add(item);
      _updateState(updatedItems);
    }
  }

  void removeFromCart(CartItemData item) {
    final updatedItems = List<CartItemData>.from(state.cartItems)..remove(item);
    _updateState(updatedItems);
  }

  void updateItemCount(CartItemData item, int newCount) {
    if (newCount < 1) return;
    
    final updatedItems = List<CartItemData>.from(state.cartItems);
    final index = updatedItems.indexWhere((cartItem) => cartItem.title == item.title);
    
    if (index != -1) {
      updatedItems[index].count = newCount;
      _updateState(updatedItems);
    }
  }

  void toggleFavorite(CartItemData item) {
    final updatedItems = List<CartItemData>.from(state.cartItems);
    final index = updatedItems.indexWhere((cartItem) => cartItem.title == item.title);
    
    if (index != -1) {
      updatedItems[index].isFavorite = !updatedItems[index].isFavorite;
      emit(state.copyWith(cartItems: updatedItems));
    }
  }

  void _updateState(List<CartItemData> items) {
    final total = items.fold(
      0.0,
      (sum, item) => sum + (item.value * item.count),
    );
    
    emit(state.copyWith(
      cartItems: items,
      totalValue: total,
    ));
  }
}