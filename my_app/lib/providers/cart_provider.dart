import 'package:flutter/foundation.dart';
import '../models/cart_item.dart';

class CartProvider with ChangeNotifier {
  final List<CartItem> _items = [];

  List<CartItem> get items => [..._items];

  List<CartItem> get selectedItems =>
      _items.where((item) => item.isSelected).toList();

  double get totalAmount {
    return _items.fold(0, (sum, item) => sum + item.totalPrice);
  }

  double get selectedItemsTotal {
    return _items
        .where((item) => item.isSelected)
        .fold(0, (sum, item) => sum + item.totalPrice);
  }

  void addItem(CartItem item) {
    final existingIndex = _items.indexWhere((i) => i.name == item.name);

    if (existingIndex >= 0) {
      _items[existingIndex].quantity++;
    } else {
      _items.add(item);
    }
    notifyListeners();
  }

  void removeItem(String productName) {
    _items.removeWhere((item) => item.name == productName);
    notifyListeners();
  }

  void clear() {
    _items.clear();
    notifyListeners();
  }

  void toggleItemSelection(String productName) {
    final index = _items.indexWhere((item) => item.name == productName);
    if (index != -1) {
      _items[index].isSelected = !_items[index].isSelected;
      notifyListeners();
    }
  }

  void selectAllItems() {
    for (var item in _items) {
      item.isSelected = true;
    }
    notifyListeners();
  }

  void deselectAllItems() {
    for (var item in _items) {
      item.isSelected = false;
    }
    notifyListeners();
  }
}
