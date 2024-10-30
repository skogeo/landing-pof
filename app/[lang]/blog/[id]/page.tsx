import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

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
  img: (props: unknown) => {
    return <img {...props} className="rounded-lg" />;
  },
};

export const dynamic = 'force-static';

const getPosts = async () => {
  const source = await fetch(`http://127.0.0.1:1337/api/posts?locale=all`).then(
    (res) => res.json()
  );
  return source.data;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: post.id.toString(),
    lang: post.attributes.locale,
  }));
}

const getPost = async (id: string, lang: string) => {
  // http://localhost:1337/api/posts/1?populate=localizations
  // to get all localizations connected to the
  const source = await fetch(`http://127.0.0.1:1337/api/posts/${id}`).then(
    (res) => res.json()
  );
  if (!source.data || source.data.attributes.locale !== lang) notFound();
  return source.data.attributes.content;
};

export default async function ExamplePage({
  params,
}: {
  params: { id: string; lang: string };
}) {
  const source = await getPost(params.id, params.lang);
  return (
    <article className="prose lg:prose-xl">
      <MDXRemote source={source} components={components} />
    </article>
  );
}
