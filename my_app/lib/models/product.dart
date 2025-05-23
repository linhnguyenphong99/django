class Product {
  final int id;
  final String name;
  final String slug;
  final String description;
  final String price;
  final String imageUrl;
  final List<String> tags;

  Product({
    required this.id,
    required this.name,
    required this.slug,
    required this.description,
    required this.price,
    required this.imageUrl,
    this.tags = const [],
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'],
      slug: json['slug'],
      description: json['description'],
      price: json['price'],
      imageUrl: json['get_image'],
      tags: [],
    );
  }
}
