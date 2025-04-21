import 'package:flutter/material.dart';

class FilterPage extends StatelessWidget {
  const FilterPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Filter'),
      ),
      body: Column(
        children: [
          Padding(
              padding: const EdgeInsets.all(16.0),
              child: SizedBox(
                child: TextField(
                  decoration: const InputDecoration(
                    labelText: 'name',
                    border: OutlineInputBorder(),
                  ),
                  onChanged: (value) {
                    // TODO: Implement search
                  },
                ),
              )),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: DropdownButtonFormField<String>(
              items: ['name', 'price', 'rating'].map((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
              onChanged: (value) {
                // TODO: Implement search
              },
            ),
          ),
        ],
      ),
    );
  }
}
