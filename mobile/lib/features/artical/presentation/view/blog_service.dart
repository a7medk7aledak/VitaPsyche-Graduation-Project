import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/features/artical/data/model_blog.dart';
import 'package:flutter_mindmed_project/features/artical/data/read_json_file.dart';
import 'package:flutter_mindmed_project/core/theme/colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/routes/app_routes.dart';

class BlogScreen extends StatefulWidget {
  const BlogScreen({super.key});

  @override
  _BlogScreenState createState() => _BlogScreenState();
}

class _BlogScreenState extends State<BlogScreen> {
  TextEditingController _searchController = TextEditingController();
  List<ModelBlog> _blogs = [];
  List<ModelBlog> _filteredBlogs = [];

  @override
  void initState() {
    super.initState();
    _fetchBlogs();
    _searchController.addListener(_filterBlogs);
  }

  @override
  void dispose() {
    _searchController.removeListener(_filterBlogs);
    _searchController.dispose();
    super.dispose();
  }

  // Fetch blog data from JSON
  Future<void> _fetchBlogs() async {
    List<dynamic> jsonData =
        await ReadJsonFile.readJsonData(path: 'assets/json/articles.json');
    setState(() {
      _blogs = jsonData.map((e) => ModelBlog.fromJson(e)).toList();
      _filteredBlogs = _blogs; // Initially, show all blogs
    });
  }

  // Filter blogs based on search query
  void _filterBlogs() {
    String query = _searchController.text.toLowerCase();
    setState(() {
      _filteredBlogs = _blogs
          .where((blog) => blog.title.toLowerCase().contains(query)
              //  ||
              // blog.description.toLowerCase().contains(query)
              )
          .toList();
    });
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
        controller: _searchController,
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
        Hero(
          tag: blog.images, // Use a unique tag (e.g., image URL)
          child: ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
            child: Image.network(
              blog.images,
              fit: BoxFit.cover,
              width: double.infinity,
              height: 180.h,
            ),
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
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ElevatedButton(
                    onPressed: () => Navigator.pushNamed(
                        _, AppRoutes.detailsBlog,
                        arguments: blog),
                    style: ElevatedButton.styleFrom(
                      elevation: 4,
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
      backgroundColor: secoundryColor,
      appBar: AppBar(
        titleSpacing: 0,
        foregroundColor: primaryColor,
        backgroundColor: secoundryColor,
        elevation: 0,
        title: Text(
          'Articles',
          style: TextStyle(
            color: primaryColor,
            fontSize: 26.sp,
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
      ),
      body: _blogs.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : CustomScrollView(
              slivers: [
                SliverToBoxAdapter(
                  child: Padding(
                    padding: EdgeInsets.all(16.w),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _search(),
                        SizedBox(height: 20.h),
                      ],
                    ),
                  ),
                ),
                SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) => _blogItem(
                        context, _filteredBlogs[index]), // Show filtered blogs
                    childCount: _filteredBlogs.length,
                  ),
                ),
              ],
            ),
    );
  }
}
