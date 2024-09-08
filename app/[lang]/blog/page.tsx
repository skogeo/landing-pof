import Link from 'next/link';

export const getPost = async (lang) => {
  const source = await fetch(`http://127.0.0.1:1337/api/posts?locale=${lang}`, {
    cache: 'no-store',
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
  return source.data;
};

export default async function ExamplePage({ params }) {
  const posts = await getPost(params.lang);
  return (
    <div>
      <h1 className="">Blogs</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <Link href={`/${params.lang}/blog/${post.id}`}>
            {post.attributes.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
