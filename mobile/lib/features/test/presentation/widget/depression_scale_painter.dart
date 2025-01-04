import 'dart:math';
import 'package:flutter/material.dart';

class DepressionScalePainter extends CustomPainter {
  final int score;

  DepressionScalePainter(this.score);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..style = PaintingStyle.fill;

    final segments = [
      {'label': 'Normal', 'color': Colors.green[300]!},
      {'label': 'Mild', 'color': Colors.green[100]!},
      {'label': 'Moderate', 'color': Colors.yellow},
      {'label': 'Severe', 'color': Colors.orange},
      {'label': 'Extremely\nSevere', 'color': Colors.red},
    ];

    final rect = Rect.fromLTWH(0, 0, size.width, size.height * 2);
    const startAngle = pi;
    final sweepAngle = pi / segments.length;

    for (var i = 0; i < segments.length; i++) {
      paint.color = segments[i]['color'] as Color;
      canvas.drawArc(
        rect,
        startAngle + (sweepAngle * i),
        sweepAngle,
        true,
        paint,
      );

      final segmentCenterAngle = startAngle + (sweepAngle * i) + (sweepAngle / 2);
      final textRadius = size.width * 0.35;
      final textCenter = Offset(
        size.width / 2 + cos(segmentCenterAngle) * textRadius,
        size.height + sin(segmentCenterAngle) * textRadius,
      );

      final textSpan = TextSpan(
        text: segments[i]['label'] as String,
        style: TextStyle(
          color: Colors.black,
          fontSize: size.width * 0.04,
          fontWeight: FontWeight.bold,
        ),
      );

      final textPainter = TextPainter(
        text: textSpan,
        textAlign: TextAlign.center,
        textDirection: TextDirection.ltr,
      );
      textPainter.layout();

      final textOffset = Offset(
        textCenter.dx - (textPainter.width / 2),
        textCenter.dy - (textPainter.height / 2),
      );

      textPainter.paint(canvas, textOffset);
    }

   

    

   
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
