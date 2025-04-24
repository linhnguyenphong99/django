import 'package:flutter/material.dart';
import '../models/product.dart';

class FilterProvider with ChangeNotifier {
  String _searchQuery = '';
  String _selectedCategory = 'All';
  String _selectedTag = 'All';
  String _sortBy = 'name';
  bool _sortAscending = true;
  double _minPrice = 0;
  double _maxPrice = double.infinity;

  String get searchQuery => _searchQuery;
  String get selectedCategory => _selectedCategory;
  String get selectedTag => _selectedTag;
  String get sortBy => _sortBy;
  bool get sortAscending => _sortAscending;
  double get minPrice => _minPrice;
  double get maxPrice => _maxPrice;

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void setCategory(String category) {
    _selectedCategory = category;
    notifyListeners();
  }

  void setTag(String tag) {
    _selectedTag = tag;
    notifyListeners();
  }

  void setSortBy(String field, {bool ascending = true}) {
    _sortBy = field;
    _sortAscending = ascending;
    notifyListeners();
  }

  void setPriceRange(double min, double max) {
    _minPrice = min;
    _maxPrice = max;
    notifyListeners();
  }

  List<Product> applyFilters(List<Product> products) {
    return products.where((product) {
      // Apply search filter
      if (_searchQuery.isNotEmpty) {
        if (!product.name.toLowerCase().contains(_searchQuery.toLowerCase()) &&
            !product.description
                .toLowerCase()
                .contains(_searchQuery.toLowerCase())) {
          return false;
        }
      }

      // Apply tag filter
      if (_selectedTag != 'All' && !product.tags.contains(_selectedTag)) {
        return false;
      }

      // Apply price range filter
      final price = double.tryParse(product.price) ?? 0.0;
      if (price < _minPrice || price > _maxPrice) {
        return false;
      }

      return true;
    }).toList()
      ..sort((a, b) {
        int result;
        switch (_sortBy) {
          case 'name':
            result = a.name.compareTo(b.name);
            break;
          case 'price':
            final priceA = double.tryParse(a.price) ?? 0.0;
            final priceB = double.tryParse(b.price) ?? 0.0;
            result = priceA.compareTo(priceB);
            break;
          default:
            result = 0;
        }
        return _sortAscending ? result : -result;
      });
  }

  void resetFilters() {
    _searchQuery = '';
    _selectedCategory = 'All';
    _selectedTag = 'All';
    _sortBy = 'name';
    _sortAscending = true;
    _minPrice = 0;
    _maxPrice = double.infinity;
    notifyListeners();
  }
}
