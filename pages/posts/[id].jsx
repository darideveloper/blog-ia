import PropTypes from 'prop-types'

import Head from 'next/head'
import Date from '@/components/date'
import Layout from '@/components/layout'

import { getAllPostIds, getPostData } from '../../lib/posts'

// Render current post
export default function Post({title, date, description, contentHtml}) {

  return <Layout>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    <article>
        <h1>{title}</h1>
        <div>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  </Layout>
}

// Generate paths for posts
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

// get data of the current post
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      ...postData,
    },
  }
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  contentHtml: PropTypes.string.isRequired,
}