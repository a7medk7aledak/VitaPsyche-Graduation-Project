import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:provider/provider.dart';
import 'features/ai_service/service/chat_bot/data/chat_service.dart';
import 'features/ai_service/service/chat_bot/presentation/chat_provider.dart';
import 'features/products/presentation/cubit/cart_cubit.dart';
import 'my_app.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ChatProvider()),
        BlocProvider(create: (context) => CartCubit()),
        Provider<ChatService>(create: (_) => ChatService()),
      ],
      child: const MyApp(),
    ),
  );
}
