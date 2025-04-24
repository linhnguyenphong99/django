import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/cart_provider.dart';
import '../models/cart_item.dart';
import '../models/product.dart';
import '../services/api_service.dart';
import '../providers/wishlist_provider.dart';

class DetailPage extends StatefulWidget {
  final String slug;
  const DetailPage({super.key, required this.slug});

  @override
  State<DetailPage> createState() => _DetailPageState();
}

class _DetailPageState extends State<DetailPage> {
  final ApiService _apiService = ApiService();
  Product? _product;
  bool _isLoading = true;
  String? _error;
  int _currentImageIndex = 0;

  @override
  void initState() {
    super.initState();
    _loadProductDetails();
  }

  Future<void> _loadProductDetails() async {
    try {
      final product = await _apiService.getProductBySlug(widget.slug);
      setState(() {
        _isLoading = false;
        _product = product;
        print(_product);
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_error != null) {
      return Scaffold(
        appBar: AppBar(),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Error: $_error'),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: _loadProductDetails,
                child: const Text('Retry'),
              ),
            ],
          ),
        ),
      );
    }

    if (_product == null) {
      return const Scaffold(
        body: Center(
          child: Text('Product not found'),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(_product?.name ?? 'Product Detail'),
        actions: [
          IconButton(
            icon: Icon(
              Provider.of<WishlistProvider>(context).isInWishlist(_product!.id)
                  ? Icons.favorite
                  : Icons.favorite_border,
              color: Provider.of<WishlistProvider>(context)
                      .isInWishlist(_product!.id)
                  ? Colors.red
                  : null,
            ),
            onPressed: () {
              final wishlist =
                  Provider.of<WishlistProvider>(context, listen: false);
              if (wishlist.isInWishlist(_product!.id)) {
                wishlist.removeItem(_product!.id);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('${_product!.name} removed from wishlist'),
                    duration: const Duration(seconds: 2),
                    action: SnackBarAction(
                      label: 'Undo',
                      onPressed: () {
                        wishlist.addItem(_product!);
                      },
                    ),
                  ),
                );
              } else {
                wishlist.addItem(_product!);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('${_product!.name} added to wishlist'),
                    duration: const Duration(seconds: 2),
                    action: SnackBarAction(
                      label: 'View Wishlist',
                      onPressed: () {
                        Navigator.pushNamed(context, '/wishlist');
                      },
                    ),
                  ),
                );
              }
            },
          ),
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () {
              // TODO: Share product
            },
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    height: 300,
                    color: const Color.fromARGB(255, 130, 63, 63),
                    child: Center(
                      child: _product?.name != null
                          ? Image.network(
                              _product!.imageUrl,
                              fit: BoxFit.cover,
                              width: double.infinity,
                              height: double.infinity,
                              errorBuilder: (context, error, stackTrace) {
                                return Icon(
                                  Icons.computer,
                                  size: 120,
                                  color: Colors.grey[400],
                                );
                              },
                            )
                          : Icon(
                              Icons.computer,
                              size: 120,
                              color: Colors.grey[400],
                            ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Gallery',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'No gallery images available',
                          style: TextStyle(
                            color: Colors.grey,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          _product?.name ?? 'Product Name',
                          style: const TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          '\$${_product?.price ?? '0.00'}',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Theme.of(context).primaryColor,
                          ),
                        ),
                        const SizedBox(height: 16),
                        const Text(
                          'Description',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          _product?.description ?? 'No description available',
                          style: const TextStyle(
                            height: 1.5,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.2),
                  spreadRadius: 1,
                  blurRadius: 5,
                  offset: const Offset(0, -3),
                ),
              ],
            ),
            child: Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () {
                      final cart =
                          Provider.of<CartProvider>(context, listen: false);
                      cart.addItem(
                        CartItem(
                          name: _product?.name ?? 'Product',
                          price:
                              double.tryParse(_product?.price ?? '0.0') ?? 0.0,
                          imageUrl: _product?.imageUrl ?? '',
                        ),
                      );
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Added to cart!'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                      Navigator.pushNamed(context, '/cart');
                    },
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: const Text('Add to Cart'),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      // TODO: Buy now
                    },
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: const Text('Buy Now'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
