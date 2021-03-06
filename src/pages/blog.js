import React, { Component } from "react";
import TextField from "material-ui/TextField";
import FlipMove from "react-flip-move";
import PortfolioDelegate from "../utils/PortfolioDelegate";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SEO from "../components/SEO";
import BlogArticle from "../components/BlogArticleItem";

class blogList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: this.props.data.allContentfulPost.edges,
      filteredBlogs: this.props.data.allContentfulPost.edges.sort((a, b) => {
        return new Date(b.node.date) - new Date(a.node.date);
      }),
      search: ""
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.filterBlogs = this.filterBlogs.bind(this);
  }
  filterBlogs() {
    let blogs = this.state.blogs;
    let query = this.state.search;

    blogs = blogs.filter(blog => {
      return blog.node.title.title.toLowerCase().includes(query);
    });
    this.setState({ filteredBlogs: blogs });
  }

  onFilterChange(e) {
    let search = e.target.value.toLowerCase();
    this.setState({ search }, () => this.filterBlogs());
  }
  render() {
    let { match, location } = this.props;
    let style = {
      blogFilter: {
        margin: "auto",
        color: {
          color: "#c24d01"
        },
        bgcolor: {
          borderColor: "#c24d01"
        }
      }
    };

    const blogs = this.state.filteredBlogs.map((item, index) => {
      let blog = item.node;
      return <BlogArticle key={index} blog={blog} />;
    });

    let blogPosts = [];

    for (let i = 0; i < blogs.length; i += 2) {
      blogPosts.push(
        <div className="row" key={i}>
          {blogs[i]}
          {blogs[i + 1]}
        </div>
      );
    }
    const timeout = { enter: 300, exit: 200 };
    return (
      <div className="blog-wrapper">
        <SEO
          title="Blog | Malik Browne"
          description="Check out the latest blog posts from front end developer, Malik Browne."
          image="/selfie/about_bg3.jpg"
          url="https://www.malikbrowne.com/blog"
        />
        <TextField
          hintText="Enter a blog post title"
          floatingLabelText="Filter blog by title"
          className="blog-filter"
          style={style.blogFilter}
          floatingLabelFocusStyle={style.blogFilter.color}
          underlineFocusStyle={style.blogFilter.bgcolor}
          onChange={this.onFilterChange}
          value={this.state.search}
        />
        <FlipMove
          duration={400}
          easing="ease"
          className="blog"
          enterAnimation="fade"
          leaveAnimation="fade"
        >
          {blogPosts}
        </FlipMove>
      </div>
    );
  }
}

export default blogList;

export const pageQuery = graphql`
  query blogQuery {
    allContentfulPost {
      edges {
        node {
          title {
            title
          }
          slug
          author {
            name
            twitter
            profilePhoto {
              file {
                url
              }
            }
          }
          description {
            description
          }
          body {
            body
          }
          featuredImage {
            file {
              url
            }
          }
          compressedFeaturedImage {
            file {
              url
            }
          }
          date
          comments
        }
      }
    }
  }
`;
