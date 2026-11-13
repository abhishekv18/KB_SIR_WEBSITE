import { site } from '../content/site'

/** React 19 hoists <title>/<meta>/<link> into <head>. */
export default function Seo({ title, description, path = '', image = '/og-image.jpg', jsonLd, noindex }) {
  const full = title ? `${title} | ${site.name}` : `${site.name} | Business Coach & Consultant`
  const url = `${site.url}${path}`
  return (
    <>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${site.url}${image}`} />
      {noindex && <meta name="robots" content="noindex" />}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </>
  )
}
