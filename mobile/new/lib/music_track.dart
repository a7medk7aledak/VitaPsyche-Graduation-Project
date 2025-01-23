import 'package:flutter/material.dart';

class MusicTrack {
  final String title;
  final String subtitle;
  final IconData icon;
  final String image;
  final String audioPath;

  MusicTrack({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.image,
    required this.audioPath,
  });
}
