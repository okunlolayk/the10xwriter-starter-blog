import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

// If the caller passes no className at all (the common case for a content
// image dropped into a blog post body), default to a responsive box so a
// large source file can never force horizontal overflow or blow out the
// container's padding — width/height props still set the correct aspect
// ratio, they just no longer dictate the literal rendered pixel size.
// If the caller supplies their own className (e.g. a small fixed-size
// avatar), respect it as-is rather than merging in conflicting sizing.
const Image = ({ src, className, ...rest }: ImageProps) => (
  <NextImage src={`${basePath || ''}${src}`} className={className ?? 'h-auto w-full'} {...rest} />
)

export default Image
