import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/core/const/image_app.dart';
import 'package:flutter_mindmed_project/features/more/presentation/view/contact_us.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/theme/colors.dart';
import 'language.dart';
import '../../../authentication/presentation/view/authentication.dart';

class More extends StatelessWidget {
  const More({super.key});

  static const id = 'More';

  static final List<Map<String, dynamic>> _moreItems = [
    {
      'title': 'Languages',
      'image': ImageApp.language,
      'onTap': Language.id,
    },
    {
      'title': 'Country',
      'image': ImageApp.country,
      'onTap': Language.id,
    },
    {
      'title': 'Contact Us',
      'image': ImageApp.contactUs,
      'onTap': ContactUs.id,
    },
    {
      'title': 'Emargancy Call',
      'image': ImageApp.emargactCall,
      'onTap': SplashScreen.id,
    },
  ];

  Widget _itemCard(
      String title, String image, String routeName, BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.pushNamed(context, routeName);
      },
      child: Card(
        elevation: 4,
        color: secoundryColor,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.all(Radius.circular(12.5)),
              child: Image.asset(image, fit: BoxFit.cover),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 4).w,
              child: Text(
                title,
                style: const TextStyle(
                  fontSize: 16,
                  color: mainBlueColor,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _dynamicExpansionTile(
      IconData icon, String title, List<Map<String, String>> children) {
    return Theme(
      data: ThemeData().copyWith(dividerColor: Colors.transparent),
      child: ExpansionTile(
        collapsedIconColor: grayColor,
        iconColor: grayColor,
        title: Row(
          children: [
            Icon(icon, color: grayColor),
            SizedBox(width: 10.w),
            Text(
              title,
              style: const TextStyle(color: grayColor, fontSize: 14),
            ),
          ],
        ),
        children: children
            .map(
              (child) => InkWell(
                onTap: () {
//nav
                  print('Navigate to ${child['route']}');
                },
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                  child: Container(
                    margin: const EdgeInsets.all(6).w,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(12.5),
                        border: Border.all(color: grayColor)),
                    padding:
                        const EdgeInsets.symmetric(horizontal: 12, vertical: 12)
                            .w,
                    child: Row(
                      children: [
                        Icon(Icons.circle, size: 8.sp, color: grayColor),
                        SizedBox(width: 10.w),
                        Text(
                          child['title']!,
                          style:
                              const TextStyle(color: grayColor, fontSize: 14),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            )
            .toList(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final expansionTiles = [
      {
        'icon': Icons.help_outline_outlined,
        'title': 'Help & Support',
        'children': [
          {'title': 'Help Center', 'route': '/help-center'},
          {'title': 'Terms & Policies', 'route': '/terms-policies'},
        ],
      },
      {
        'icon': Icons.settings,
        'title': 'Settings & Privacy',
        'children': [
          {'title': 'Account Settings', 'route': '/account-settings'},
          {'title': 'Privacy Policy', 'route': '/privacy-policy'},
        ],
      },
      {
        'icon': Icons.abc, //change
        'title': 'Social Media',
        'children': [
          {'title': 'Facebook', 'route': '/facebook'},
          {'title': 'Instagram', 'route': '/instagram'},
        ],
      },
    ];

    return Scaffold(
      backgroundColor: secoundryColor,
      body: CustomScrollView(
        slivers: [
          SliverPadding(
            padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 10.h),
            sliver: SliverGrid(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
                childAspectRatio: 1,
              ),
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final item = _moreItems[index];
                  return _itemCard(
                      item['title'], item['image'], item['onTap'], context);
                },
                childCount: _moreItems.length,
              ),
            ),
          ),
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final tile = expansionTiles[index];
                return _dynamicExpansionTile(
                    tile['icon'] as IconData,
                    tile['title'] as String,
                    tile['children'] as List<Map<String, String>>);
              },
              childCount: expansionTiles.length,
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.only(top: 10).w,
              child: Center(
                child: Text(
                  'Version 1.0.0',
                  style: TextStyle(
                      color: primaryColor,
                      fontSize: 12.sp,
                      fontWeight: FontWeight.bold),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
