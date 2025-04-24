import 'package:flutter/foundation.dart';
import '../models/product.dart';

class WishlistProvider with ChangeNotifier {
  final List<Product> _items = [];

  List<Product> get items => [..._items];

  void addItem(Product product) {
    if (!_items.any((item) => item.id == product.id)) {
      _items.add(product);
      notifyListeners();
    }
  }

  void removeItem(int productId) {
    _items.removeWhere((item) => item.id == productId);
    notifyListeners();
  }

  void clear() {
    _items.clear();
    notifyListeners();
  }

  bool isInWishlist(int productId) {
    return _items.any((item) => item.id == productId);
  }
}
