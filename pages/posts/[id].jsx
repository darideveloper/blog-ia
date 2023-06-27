import PropTypes from 'prop-types'

import Head from 'next/head'
import Image from 'next/image'

import Date from '@/components/date'
import RootLayout from '@/layouts/root-layout'
import CategoriesButtons from '@/components/categories-buttons'

import { getAllPostIds, getPostData } from '@/lib/posts'

// Render current post
export default function Post({ title, date, description, image, categories, contentHtml }) {

  // Format categories
  const categoriesFormatted = categories.map((category) => {
    return {
      name: category,
      counter: 0,
    }
  })

  return (
    <RootLayout
      extraTitle={title}
      extraKeywords={categories}
    >
      <Head>
        <meta name="description" content={description} />
      </Head>
      <article>

        <header>
          <h1>{title}</h1>

          <div className="date">
            <Date dateString={date} />
          </div>

          <div className="categories">
            <CategoriesButtons 
              categories={categoriesFormatted}
              showCounter={false}
            />

          </div>

          <div className="description">
            <p>{description}</p>
          </div>
        </header>
        <Image
          src={image}
          alt={`${title} imagen`}
          width={1600}
          height={900}
        />
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </RootLayout>
  )
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
  image: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  contentHtml: PropTypes.string.isRequired,
}