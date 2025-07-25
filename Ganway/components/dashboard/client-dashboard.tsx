"use client"

import { FashionFeed } from "./fashion-feed"
import { AIRecommendations } from "./ai-recommendations"
import { QuickActions } from "./quick-actions"
import { UserActivity } from "./user-activity"

export function ClientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Solo el feed principal, sin sidebar widgets */}
        <div className="w-full">
          <FashionFeed />
        </div>
        {/* AI Recommendations Section */}
        <AIRecommendations />
      </div>
    </div>
  )
}
