import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/filter_provider.dart';

class FilterPage extends StatefulWidget {
  const FilterPage({super.key});

  @override
  State<FilterPage> createState() => _FilterPageState();
}

class _FilterPageState extends State<FilterPage> {
  final _searchController = TextEditingController();
  late RangeValues _priceRange;
  String _selectedTag = 'All';
  String _sortBy = 'name';
  bool _sortAscending = true;

  @override
  void initState() {
    super.initState();
    final filterProvider = Provider.of<FilterProvider>(context, listen: false);
    _searchController.text = filterProvider.searchQuery;
    _priceRange = RangeValues(
      filterProvider.minPrice,
      filterProvider.maxPrice == double.infinity
          ? 10000
          : filterProvider.maxPrice,
    );
    _selectedTag = filterProvider.selectedTag;
    _sortBy = filterProvider.sortBy;
    _sortAscending = filterProvider.sortAscending;
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final filterProvider = Provider.of<FilterProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Filter & Sort'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              filterProvider.resetFilters();
              Navigator.pop(context);
            },
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          TextField(
            controller: _searchController,
            decoration: const InputDecoration(
              labelText: 'Search',
              prefixIcon: Icon(Icons.search),
              border: OutlineInputBorder(),
            ),
            onChanged: (value) {
              filterProvider.setSearchQuery(value);
            },
          ),
          const SizedBox(height: 16),
          const Text(
            'Price Range',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          RangeSlider(
            values: _priceRange,
            min: 0,
            max: 10000,
            divisions: 100,
            labels: RangeLabels(
              '\$${_priceRange.start.toStringAsFixed(0)}',
              '\$${_priceRange.end.toStringAsFixed(0)}',
            ),
            onChanged: (values) {
              setState(() {
                _priceRange = values;
              });
              filterProvider.setPriceRange(values.start, values.end);
            },
          ),
          const SizedBox(height: 16),
          const Text(
            'Sort By',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          DropdownButtonFormField<String>(
            value: _sortBy,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
            ),
            items: const [
              DropdownMenuItem(
                value: 'name',
                child: Text('Name'),
              ),
              DropdownMenuItem(
                value: 'price',
                child: Text('Price'),
              ),
            ],
            onChanged: (value) {
              if (value != null) {
                setState(() {
                  _sortBy = value;
                });
                filterProvider.setSortBy(value, ascending: _sortAscending);
              }
            },
          ),
          const SizedBox(height: 8),
          SwitchListTile(
            title: const Text('Ascending Order'),
            value: _sortAscending,
            onChanged: (value) {
              setState(() {
                _sortAscending = value;
              });
              filterProvider.setSortBy(_sortBy, ascending: value);
            },
          ),
        ],
      ),
    );
  }
}
