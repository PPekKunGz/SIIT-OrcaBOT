import Link from 'next/link'
import TriangleAlertIcon from '../../_components/assets/svg/TriangleAlertIcon'

export default async function Maintenance() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 mb-8 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <TriangleAlertIcon className="mx-auto h-12 w-12 text-primary" />
        <div className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">MAINTENANCE</div>
        <p className="mt-4 text-muted-foreground">
          Oops, it looks like the page you were looking for doesn't exist. Don't worry, you can go back to the homepage
          and try again.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}