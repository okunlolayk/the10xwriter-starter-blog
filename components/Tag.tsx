import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="wiki-tag text-pen hover:text-signal mr-4 font-mono text-[12px] uppercase transition-colors"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
