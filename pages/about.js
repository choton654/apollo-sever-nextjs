import Link from 'next/link';

export default function About() {
  return (
    <div>
      This is a static page goto{' '}
      <Link href='/'>
        <a>dynamic page.</a>
      </Link>{' '}
    </div>
  );
}
