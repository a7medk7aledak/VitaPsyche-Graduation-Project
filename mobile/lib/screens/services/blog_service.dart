import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/models/model_blog.dart';
import 'package:flutter_mindmed_project/models/read_json_file.dart';
import 'package:flutter_mindmed_project/screens/services/details_blog.dart';
import 'package:flutter_mindmed_project/const/colors.dart';
import 'package:flutter_mindmed_project/const/const_image.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../widgets/custem_button_back.dart';

class BlogService extends StatelessWidget {
  const BlogService({super.key});
  static String id = 'BLog';

  Future<List<ModelBlog>> fetchBlog() async {
    List<dynamic> jsonData =
        await ReadJsonFile.readJsonData(path: 'assets/json/articles.json');
    return jsonData.map((e) => ModelBlog.fromJson(e)).toList();
  }

  _textFieldBorder() {
    return OutlineInputBorder(
      gapPadding: 0,
      borderRadius: BorderRadius.circular(22),
      borderSide: const BorderSide(width: 0, color: textFiledColor),
    );
  }

  //!   take value when search here!!
  Widget _search() {
    return TextField(
        decoration: InputDecoration(
      suffixIcon: const Icon(Icons.search_sharp),
      filled: true,
      fillColor: Colors.grey.shade300,
      labelText: 'Search',
      labelStyle: TextStyle(
          color: Colors.grey.shade500,
          fontSize: 24,
          fontWeight: FontWeight.bold),
      border: _textFieldBorder(),
      enabledBorder: _textFieldBorder(),
      focusedBorder: _textFieldBorder(),
    ));
  }

  Widget _blogItem(BuildContext _, ModelBlog blog) {
    return Card(
      elevation: 4,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.all(
          Radius.circular(22),
        ),
        side: BorderSide(
          color: primaryColor,
          width: 2,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(4.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(22), topRight: Radius.circular(22)),
              child: Image.network(
                blog.images,
                fit: BoxFit.cover,
                width: double.infinity,
              ),
            ),
            Text(
              blog.title,
              softWrap: true,
              style: const TextStyle(color: Colors.black, fontSize: 16),
            ),
            const SizedBox(
              height: 5,
            ),
            Text(
              blog.description,
              softWrap: true,
              style: const TextStyle(color: textSecoundColor, fontSize: 15),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                const Icon(Icons.timelapse_outlined),
                //*DataTime no in json
                const Text(
                  '6 sep 2020',
                  style: TextStyle(color: textSecoundColor, fontSize: 15),
                ),
                ElevatedButton(
                    onPressed: () => Navigator.of(_)
                        .pushNamed(DetailsBlog.id, arguments: blog),
                    style:
                        ElevatedButton.styleFrom(backgroundColor: primaryColor),
                    child: const Row(
                      children: [
                        Icon(Icons.my_library_books_outlined),
                        Text(
                          'read more',
                          style: TextStyle(color: secoundryColor, fontSize: 15),
                        )
                      ],
                    ))
              ],
            )
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    //!here

    return Scaffold(
      backgroundColor: primaryColor,
      appBar: AppBar(
        leading: custemButtonBack(context),
        titleSpacing: 0,
        backgroundColor: Colors.transparent,
        title: Row(
          children: [
            Image.asset(
              logoApp,
              height: 60.h,
              width: 50.w,
              fit: BoxFit.cover,
            ),
            Padding(
              padding: const EdgeInsets.only(left: 4).w,
              child: Text(
                'Articals',
                style: TextStyle(
                  color: secoundryColor,
                  fontSize: 26.sp,
                ),
              ),
            )
          ],
        ),
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
                child: Text('Error Loading...'),
              );
            } else if (snapshot.hasData && snapshot.data != null) {
              List<ModelBlog> blogs = snapshot.data!;
              return CustomScrollView(
                slivers: [
                  SliverToBoxAdapter(
                    child: ClipRRect(
                      borderRadius:
                          BorderRadius.only(topRight: Radius.circular(150.r)),
                      child: Container(
                        padding: const EdgeInsets.all(12).w,
                        color: secoundryColor,
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Padding(
                              padding: EdgeInsets.only(
                                  right: 35.w, top: 30.h, bottom: 10.h),
                              child: _search(),
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Most read',
                                  style: TextStyle(
                                      color: textMainColor,
                                      fontSize: 24.sp,
                                      fontWeight: FontWeight.bold),
                                ),
                                Text(
                                  'other articals',
                                  style: TextStyle(
                                      color: textSecoundColor,
                                      fontSize: 24.sp,
                                      fontWeight: FontWeight.w700),
                                )
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  SliverToBoxAdapter(
                    child: Expanded(
                      child: Container(
                        color: secoundryColor,
                        child: ListView.separated(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemBuilder: (context, index) =>
                                _blogItem(context, blogs[index]),
                            separatorBuilder: (context, index) => SizedBox(
                                  height: 5.h,
                                ),
                            itemCount: blogs.length),
                      ),
                    ),
                  ),
                ],
              );
            } else {
              return const Center(
                child: Text('No Blogs found'),
              );
            }
          }),
    );
  }
}
