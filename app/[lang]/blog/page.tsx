import Link from 'next/link';

export const generateStaticParams = async () => {
  const localesResponse = await fetch('http://127.0.0.1:1337/api/i18n/locales');
  const locales = await localesResponse.json();
  return locales.map((locale) => ({
    lang: locale.code === 'en' ? '' : locale.code,
  }));
};

const getPosts = async (lang) => {
  const source = await fetch(`http://127.0.0.1:1337/api/posts?locale=${lang}`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
  return source.data;
};

export default async function BlogsPage({ params }) {
  const posts = await getPosts(params.lang);
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
