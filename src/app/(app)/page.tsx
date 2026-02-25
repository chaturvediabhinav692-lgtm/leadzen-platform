import { redirect } from 'next/navigation';

export default function Home() {
  // Hardcoded redirect removed to prevent admin-dashboard loops
  // Instead, let's redirect to products or a generic landing
  redirect('/euonex/products');
}
