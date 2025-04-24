class CartItem {
  final String name;
  final double price;
  final String imageUrl;
  int quantity;
  bool isSelected;

  CartItem({
    required this.name,
    required this.price,
    required this.imageUrl,
    this.quantity = 1,
    this.isSelected = true,
  });

  double get totalPrice => price * quantity;
}
