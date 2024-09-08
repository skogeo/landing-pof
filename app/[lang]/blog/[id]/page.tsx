import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {
  // TODO: research problem with Image localhost
  // img: (props: any) => {
  //   console.log(props);
  //   return (
  //     <Image
  //       {...props}
  //       width={500}
  //       height={500}
  //       className="rounded-lg"
  //       layout="responsive"
  //       loading="lazy"
  //     />
  //   );
  // },
  img: (props) => {
    return <img {...props} className="rounded-lg" />;
  },
};

const getPosts = async () => {
  const source = await fetch(`http://127.0.0.1:1337/api/posts?locale=all`, {
    cache: 'no-store',
  }).then((res) => res.json());
  return source.data;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: post.id.toString(),
    lang: post.attributes.locale,
  }));
}

const getPost = async (id, lang = 'en') => {
  console.log(lang);
  // http://localhost:1337/api/posts/1?populate=localizations
  // to get all localizations connected to the page
  const source = await fetch(
    `http://127.0.0.1:1337/api/posts/${id}?locale=${lang}`,
    {
      cache: 'no-store',
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
  return source.data.attributes.content;
};

export default async function ExamplePage({ params }) {
  console.log(params);
  const source = await getPost(params.id, params.lang);
  return (
    <article className="prose lg:prose-xl">
      <MDXRemote source={source} components={components} />
    </article>
  );
}
