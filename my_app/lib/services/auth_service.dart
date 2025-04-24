import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  static const String baseUrl =
      'http://localhost/api/v1'; // Updated to Django's default port
  static const String tokenKey = 'auth_token';
  static const String csrfTokenKey = 'csrf_token';

  Future<String?> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/login'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.encode({
          'email': email,
          'password': password,
        }),
      );
      print({
        'email': email,
        'password': password,
      });

      if (response.statusCode == 200) {
        final data = json.decode(response.body);

        String? token;
        if (data['auth_token'] != null) {
          token = data['auth_token'] as String;
        }

        final prefs = await SharedPreferences.getInstance();
        await prefs.setString(tokenKey, token ?? '');
        return token;
      } else {
        final errorData = json.decode(response.body);
        throw Exception(errorData['error'] ?? 'Login failed');
      }
    } catch (e) {
      throw Exception('Login error: $e');
    }
  }

  Future<void> register(String email, String password, String name) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/register'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.encode({
          'email': email,
          'password': password,
          'username': name,
        }),
      );

      if (response.statusCode == 201) {
        return json.decode(response.body);
      } else {
        final errorData = json.decode(response.body);
        throw Exception(errorData['error'] ?? 'Register failed');
      }
    } catch (e) {
      throw Exception('Register error: $e');
    }
  }

  Future<void> logout() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final csrfToken = prefs.getString(csrfTokenKey);

      if (csrfToken != null) {
        await http.post(
          Uri.parse('$baseUrl/logout/'),
          headers: {
            'X-CSRFToken': csrfToken,
          },
        );
      }

      // Clear all stored data
      await prefs.remove(tokenKey);
      await prefs.remove(csrfTokenKey);
      await prefs.remove('user_data');
    } catch (e) {
      // Even if the API call fails, we still want to clear local data
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(tokenKey);
      await prefs.remove(csrfTokenKey);
      await prefs.remove('user_data');
    }
  }

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(tokenKey);
  }

  Future<Map<String, dynamic>?> getUserData() async {
    final prefs = await SharedPreferences.getInstance();
    final userData = prefs.getString('user_data');
    if (userData != null) {
      return json.decode(userData);
    }
    return null;
  }

  Future<Map<String, dynamic>?> getUserInfo() async {
    // Hardcoded user information
    return {
      'name': 'John Doe',
      'email': 'john.doe@example.com',
    };
  }

  Future<void> changePassword(
      String currentPassword, String newPassword) async {
    try {
      final token = await getToken();
      if (token == null) {
        throw Exception('Not authenticated');
      }

      final response = await http.post(
        Uri.parse('$baseUrl/change-password'),
        headers: {
          'Authorization': 'Token $token',
          'Content-Type': 'application/json',
        },
        body: json.encode({
          'current_password': currentPassword,
          'new_password': newPassword,
        }),
      );

      if (response.statusCode != 200) {
        final errorData = json.decode(response.body);
        throw Exception(errorData['error'] ?? 'Failed to change password');
      }
    } catch (e) {
      throw Exception('Error changing password: $e');
    }
  }
}
