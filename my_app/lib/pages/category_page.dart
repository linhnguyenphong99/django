import 'package:flutter/material.dart';

class CategoryPage extends StatelessWidget {
  const CategoryPage({super.key});

  @override
  Widget build(BuildContext context) {
    final categories = [
      {'name': 'Laptops', 'icon': Icons.laptop},
      {'name': 'Desktop PCs', 'icon': Icons.desktop_windows},
      {'name': 'Gaming PCs', 'icon': Icons.sports_esports},
      {'name': 'Workstations', 'icon': Icons.work},
      {'name': 'Accessories', 'icon': Icons.keyboard},
      {'name': 'Components', 'icon': Icons.memory},
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Categories'),
      ),
      body: ListView.builder(
        itemCount: categories.length,
        itemBuilder: (context, index) {
          final category = categories[index];
          return ListTile(
            leading: Icon(
              category['icon'] as IconData,
              size: 32,
              color: Theme.of(context).primaryColor,
            ),
            title: Text(
              category['name'] as String,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              // TODO: Navigate to category detail
            },
          );
        },
      ),
    );
  }
}
