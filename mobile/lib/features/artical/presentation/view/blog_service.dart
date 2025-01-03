import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/features/artical/data/model_blog.dart';
import 'package:flutter_mindmed_project/features/artical/data/read_json_file.dart';
import 'package:flutter_mindmed_project/core/theme/colors.dart';
import 'package:flutter_mindmed_project/core/const/image_app.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/routes/app_routes.dart';
import '../widget/custem_button_back.dart';

class BlogScreen extends StatelessWidget {
  const BlogScreen({super.key});

  Future<List<ModelBlog>> fetchBlog() async {
    List<dynamic> jsonData =
        await ReadJsonFile.readJsonData(path: 'assets/json/articles.json');
    return jsonData.map((e) => ModelBlog.fromJson(e)).toList();
  }

  _textFieldBorder() {
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(22),
      borderSide: BorderSide.none,
    );
  }

  Widget _search() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(30),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 5,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: TextField(
        decoration: InputDecoration(
          suffixIcon: Icon(Icons.search, color: Colors.grey.shade600),
          filled: true,
          fillColor: Colors.white,
          hintText: 'Search articles',
          hintStyle: TextStyle(color: Colors.grey.shade600, fontSize: 16),
          border: _textFieldBorder(),
          enabledBorder: _textFieldBorder(),
          focusedBorder: _textFieldBorder(),
        ),
      ),
    );
  }

  Widget _blogItem(BuildContext _, ModelBlog blog) {
    return Card(
      elevation: 5,
      margin: EdgeInsets.symmetric(horizontal: 10.w, vertical: 8.h),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
            child: Image.network(
              blog.images,
              fit: BoxFit.cover,
              width: double.infinity,
              height: 180.h,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(12.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  blog.title,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18.sp,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 5.h),
                Text(
                  blog.description,
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(color: textSecoundColor, fontSize: 15.sp),
                ),
                SizedBox(height: 10.h),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.timelapse_outlined, size: 18),
                        SizedBox(width: 5),
                        Text(
                          '6 Sep 2020',
                          style:
                              TextStyle(color: textSecoundColor, fontSize: 14),
                        ),
                      ],
                    ),
                    ElevatedButton(
                      onPressed: () => Navigator.pushNamed(
                          _, AppRoutes.detailsBlog,
                          arguments: blog),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: primaryColor,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.my_library_books_outlined, size: 18),
                          SizedBox(width: 5),
                          Text(
                            'Read More',
                            style:
                                TextStyle(color: secoundryColor, fontSize: 14),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade200,
      appBar: AppBar(
        leading: custemButtonBack(context),
        titleSpacing: 0,
        backgroundColor: primaryColor,
        elevation: 5,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              logoApp,
              height: 40.h,
              width: 40.w,
              fit: BoxFit.cover,
            ),
            SizedBox(width: 8.w),
            Text(
              'Articles',
              style: TextStyle(
                color: secoundryColor,
                fontSize: 26.sp,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        centerTitle: true,
      ),
      body: FutureBuilder<List<ModelBlog>>(
        future: fetchBlog(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError) {
            return const Center(
              child: Text('Error loading articles'),
            );
          } else if (snapshot.hasData && snapshot.data != null) {
            List<ModelBlog> blogs = snapshot.data!;
            return CustomScrollView(
              slivers: [
                SliverToBoxAdapter(
                  child: Padding(
                    padding: EdgeInsets.all(16.w),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _search(),
                        SizedBox(height: 20.h),
                        Text(
                          'Most Read',
                          style: TextStyle(
                            color: textMainColor,
                            fontSize: 24.sp,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 10.h),
                      ],
                    ),
                  ),
                ),
                SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) => _blogItem(context, blogs[index]),
                    childCount: blogs.length,
                  ),
                ),
              ],
            );
          } else {
            return const Center(
              child: Text('No Blogs found'),
            );
          }
        },
      ),
    );
  }
}
