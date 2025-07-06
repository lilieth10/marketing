import { ContentDetail } from "@/components/dashboard/content-detail"

export default function ContentDetailPage({ params }) {
  return <ContentDetail contentId={params.id} />
}
